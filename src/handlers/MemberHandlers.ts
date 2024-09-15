import {iNewMember} from '../models/member'
import { Request, Response } from 'express'
import { GetAllUser, InsertMemberdata } from '../repositories/Member';

export const CreateMember = async (req: Request<{},{},iNewMember[]>, res: Response) => {
    try {

        const NewMember = req.body
        const result = await Promise.all(NewMember.map(async (data) => {
            try {
                return await InsertMemberdata(data); 
            } catch (err: unknown) {
                if (err instanceof Error) {
                    console.log(err.message);
                }
                return {
                    error: true,
                    message: "Failed to insert this data",
                    data: data
                };
            }
        }));

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
        })
    }
}

export const GetAll = async (req: Request, res: Response) => { 
    try {
        const result = await GetAllUser(); 
        if(result.length === 0 ){
            return res.status(200).json({
                msg: 'Get data success',
                data: "No members data" 
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
};