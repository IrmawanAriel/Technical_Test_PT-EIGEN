import { Response, Request } from "express"; 
import { iNewBorrow } from "../models/Borrow";
import { CreateLoan, getLoanData } from "../repositories/borrow";

export const createNewLoan = async (req: Request<{},{},iNewBorrow>, res: Response) => {
    try {
        const { book_code, user_code } = req.body;

        if (!book_code || !user_code) {
            return res.status(400).json({
                msg: 'Invalid input',
                error: 'book_code and user_code are required'
            });
        }

        const result = await CreateLoan(user_code, book_code);

        if (result.error) {
            return res.status(400).json({
                msg: 'Transaction failed',
                error: result.message,
                data: result.data || null
            });
        }

        return res.status(201).json({
            msg: 'Transaction completed successfully',
            data: result
        });

    } catch (err: unknown) {
        if (err instanceof Error) {
            console.error(err.message);
        }

        return res.status(500).json({
            msg: 'Internal server error',
            error: 'Something went wrong while processing the transaction'
        });
    }
};

export const getLoan = async (req: Request<{user_code?: string}>, res: Response) => {
    try {
        const user_code = req.params.user_code

        const result = await getLoanData(user_code);

        return res.status(200).json({
            msg: 'Data fetched successfully',
            data: result
        });
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.error(err.message);
        }

        return res.status(500).json({
            msg: 'Internal server error',
            error: 'Something went wrong while processing the transaction'
        });
    }
}