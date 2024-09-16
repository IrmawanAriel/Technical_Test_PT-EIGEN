import { QueryResult, Query } from 'pg';
import db from "../config/Database";
import { iMember } from "../models/member";

export const CreateLoan = async (member_code: string, book_code: string): Promise<{ message: string, data?: any, error?: string }> => {
    try {
        await db.query('BEGIN');

        var query1 = `
            SELECT COUNT(bb.book_code) 
            FROM member u
            LEFT JOIN borrowed_books bb 
                ON u.code = bb.user_code 
                AND bb.return_date IS NULL
            WHERE u.code = $1
        `;
        var values1 = [member_code];
        var result1 = await db.query(query1, values1);

        if (parseInt(result1.rows[0].count) >= 2) {
            await db.query('ROLLBACK');
            return {
                message: "Members cannot borrow more than 2 books",
                error: `Books borrowed are ${result1.rows[0].count}`
            };
        }

        var query2 = `
            SELECT CASE 
                WHEN stock = 0 THEN 'NO' 
                ELSE 'YES' 
            END AS stock_status
            FROM books WHERE code = $1;
        `;
        var values2 = [book_code];
        var result2 = await db.query(query2, values2);

        if (result2.rows[0].stock_status === "NO") {
            await db.query('ROLLBACK');
            return {
                message: "The book is out of stock",
                error: ""
            };
        }

        var query3 = `SELECT is_penalized, penalty_end_date FROM member WHERE code = $1`;
        var values3 = [member_code];
        var result3 = await db.query(query3, values3);

        if (result3.rows[0].is_penalized === true) {
            await db.query('ROLLBACK');
            return {
                message: `Member is on penalty period until ${result3.rows[0].penalty_end_date}`,
                error: ""
            };
        }

        var query4 = `
            INSERT INTO borrowed_books (user_code, book_code)
            VALUES ($1, $2)
            RETURNING *;
        `;
        var values4 = [member_code, book_code];
        var result4 = await db.query(query4, values4);

        if (result4.rowCount === 0) {
            await db.query('ROLLBACK');
            return {
                message: "Failed to insert loan data",
                error: "rowcount " + result4.rowCount
            };
        }


        var query5 = `UPDATE books SET stock = stock - 1 WHERE code = $1`;
        var values5 = [book_code];
        var result5 = await db.query(query5, values5);
        if (result5.rowCount === 0) {
            await db.query('ROLLBACK');
            return {
                message: "Failed to get book",
                error: "No rows were affected"
            };
        }

        await db.query('COMMIT');
        return { message: 'Transaction committed successfully' };

    } catch (err) {
        await db.query('ROLLBACK');
        return {
            message: "Transaction failed",
            error: "No rows were affected"
        };
    }
};

export const getLoanData = async (user_code?: string): Promise<iMember[]> => {
    var Query = `SELECT user_code, book_code, return_date, borrow_date, status FROM borrowed_books `
    let values: string[] = [];

    if (user_code) {
        Query += "WHERE user_code = $1"
        values.push(user_code)
    }

    try {
        const result = await db.query(Query, values); // Jalankan query dengan parameter values
        return result.rows;
    } catch (err) {
        console.error("Error executing query", err);
        throw new Error("Failed to retrieve loan data");
    }
}

export const CreateReturn = async (member_code: string, book_code: string): Promise<any> => {

    try {
        db.query("BEGIN");

        var Query = `
        SELECT book_code FROM borrowed_books WHERE user_code = $1 and status = 'borrowed';
    `
        var values1 = [member_code];
        var result1 = await db.query(Query, values1);
        if (result1.rows.length === 0) {
            await db.query('ROLLBACK');
            return {
                message: "No books need to be returned"
            };
        }

        if (!result1.rows.some(row => row.book_code === book_code)) {
            await db.query('ROLLBACK');
            return {
                message: `You did not borrow this book, book code = ${book_code}`
            };
        }

        // cek selisih tanggal apakah sudah lewat dari 7 hari dan penerapan penalty
        var query1 = `
        SELECT borrow_date 
        FROM borrowed_books 
        WHERE book_code = $1 
        AND user_code = $2 
        AND status = 'borrowed';
        `;
        var values1 = [book_code, member_code];
        var result1 = await db.query(query1, values1);

        // Konversi borrow_date ke format Date
        const borrowDate = new Date(result1.rows[0].borrow_date);
        const now = new Date();
        const selisihTanggal = Math.ceil((now.getTime() - borrowDate.getTime()) / (1000 * 60 * 60 * 24));

        // Cek apakah sudah lebih dari 7 hari
        if (selisihTanggal > 7) {
            const penaltyEndDate = new Date();
            penaltyEndDate.setDate(penaltyEndDate.getDate() + 3); // penalty 3 hari

            const queryPenalty = `
            UPDATE member
            SET penalty_end_date = $1, is_penalized = true
            WHERE code = $2;
            `;
            const valuesPenalty = [penaltyEndDate, member_code];
            const resultPenalty = await db.query(queryPenalty, valuesPenalty);

            if (resultPenalty.rowCount === 0) {
                await db.query('ROLLBACK');
                return {
                    message: "Failed to set penalty date",
                    error: "No rows were affected"
                };
            }

        }


        // pengembalian stock buku tersebut 

        var Query3 = `UPDATE books
                SET stock = stock + 1
                WHERE code = $1`
        var values3 = [book_code]
        var result3 = await db.query(Query3, values3)
        if (result3.rowCount === 0) {
            await db.query('ROLLBACK');
            return {
                message: "Failed to return book",
                error: "No rows were affected"
            };
        }

        //update return date pada borrowed_books
        var Query2 = `UPDATE borrowed_books
                    SET return_date = $1 ,
                        status = 'returned'
                    WHERE user_code = $2
                    AND book_code = $3
                    AND status = 'borrowed'`
        var values2 = [new Date(), member_code, book_code]
        var result2 = await db.query(Query2, values2)
        if (result2.rowCount === 0) {
            await db.query('ROLLBACK');
            return {
                message: "Failed to update loan data",
                error: "No rows were affected"
            };
        }

        await db.query('COMMIT');
        return { message: 'The book is successfully returned' };

    } catch (err) {
        await db.query('ROLLBACK');
        return {
            message: "Transaction failed",
            error: "No rows were affected"
        };
    }

}