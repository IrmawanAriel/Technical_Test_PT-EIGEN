import { QueryResult } from "pg";
import db from "../config/Database"
import { iMember, iNewMember } from '../models/member';

export const InsertMemberdata = async (data: iNewMember): Promise<{ message: string; data?: iMember }> => {
    const query = `
        INSERT INTO member (code, name)
        VALUES ($1, $2)
        RETURNING *;
    `;
    const values = [data.code, data.name];

    try {
        const result: QueryResult<iMember> = await db.query(query, values);
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
    }  catch (err: unknown) {
        if (err instanceof Error) {
            if (err.message.match(/duplicate key value/)) {
         
                return { message: "Insert failed, duplicate member code" };
            }
            return { message: `Member ${data.name} `+ err.message };
        }
        return { message: `insert member ${data.name} Failed` };
    }
};

export const GetAllUser = async (): Promise<iMember[]> => {
    const query = `
        SELECT u.code, u.name, COUNT(bb.book_code) AS borrowed_books
        FROM member u
        LEFT JOIN borrowed_books bb ON u.code = bb.user_code AND bb.return_date IS NULL
        GROUP BY u.code, u.name;
    `;

    try {
        const result = await db.query(query);
        return result.rows;
    } catch (err) {
        console.error('Error executing query:', err);
        throw new Error('Database query failed');
    }
}


