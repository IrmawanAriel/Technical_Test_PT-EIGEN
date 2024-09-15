import {Router} from "express"
import { CreateBooks, GetAllBooks } from "../handlers/BooksHandlers";

const BooksRouter = Router();

BooksRouter.get('/', GetAllBooks)
BooksRouter.post('/create', CreateBooks)

export default BooksRouter