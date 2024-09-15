import { Request, Response } from "express";
import { iNewBook } from "../models/books";
import { GetAllBooksData, InsertBookData } from "../repositories/book";

export const CreateBooks = async (req: Request<{},{},iNewBook[]>, res: Response) => {
    try {
        const NewBooks = req.body
        var result = await Promise.all(NewBooks.map( async (book)=>{

            try {
                return await InsertBookData(book)
            } catch (err: unknown) {
                if (err instanceof Error) {
                    console.log(err.message);
                }
                return {
                    error: true,
                    message: "Failed to insert this data",
                    data: book
                };
            }

        }))

        return res.status(200).json({
            msg: 'Transactions running',
            data: result 
        });

    } catch (err: unknown) {
        if (err instanceof Error){
            console.log(err.message);
        }
        return res.status(500).json({
            msg: "error",
            err: "internal server error"
        });
    }
} 

export const GetAllBooks  = async (req: Request, res: Response) => {
    try {
        const result = await GetAllBooksData(); 
        if(result.length === 0 ){
            return res.status(200).json({
                msg: 'Get data success',
                data: "No Books data" 
            }); 
        }
        return res.status(200).json({
            msg: 'Get data success',
            data: result 
        });
        
    } catch (err: unknown) {
        if (err instanceof Error){
            console.log(err.message);
        }
        return res.status(500).json({
            msg: "error",
            err: "internal server error"
        });
    }
}