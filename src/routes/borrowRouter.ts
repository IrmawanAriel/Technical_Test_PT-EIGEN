import { Router } from "express";
import { createNewLoan, getLoan } from "../handlers/BorrowHandlers";

const borrowRouter = Router();

borrowRouter.get('/', getLoan)
borrowRouter.get('/:user_code', getLoan)

borrowRouter.post('/create', createNewLoan)
// borrowRouter.post('/return', )

export default borrowRouter