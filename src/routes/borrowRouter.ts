import { Router } from "express";
import { createNewLoan, getLoan, returnLoan } from "../handlers/BorrowHandlers";

const borrowRouter = Router();

borrowRouter.get('/', getLoan)
borrowRouter.get('/:user_code', getLoan)

borrowRouter.post('/create', createNewLoan)
borrowRouter.post('/return', returnLoan)

export default borrowRouter