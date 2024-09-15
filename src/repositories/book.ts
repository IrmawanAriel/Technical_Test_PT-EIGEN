import { QueryResult, Query } from 'pg';
import db from "../config/Database";
import { iNewBook } from "../models/books";

export const InsertBookData = async (book: iNewBook): Promise<{ message: string; data?: iNewBook }> => {
    const query = `
        INSERT INTO books (code, title, author, stock)
        VALUES ($1, $2, $3, $4)
        RETURNING code, title, author, stock;
    `;
    const values = [book.code, book.title, book.author, book.stock];

    try {
        const result: QueryResult<iNewBook> = await db.query(query, values);
        if (result.rowCount !== 0 ) {
            return {
                message: "Insert success",
                data: result.rows[0],
            };
        } else {
            return {
                message: "Insert failed, no rows affected",
            };
        }
    } catch (err: unknown) {
        if (err instanceof Error) {
            if (err.message.match(/duplicate key value/)) {
                return { message: "Insert failed, duplicate book code" };
            }
            return { message: `Book ${book.title} `+ err.message }; // Mengembalikan pesan error lainnya
        }
        return { message: "Internal server error" };
    }
};

export const GetAllBooksData = async (): Promise<iNewBook[]> =>{
    var Query = "SELECT code, title, author, stock from books WHERE stock != 0"

    try {
        const result = await db.query(Query);
        return result.rows;
    } catch (err) {
        console.error('Error executing query:', err);
        throw new Error('Database query failed');
    }
}