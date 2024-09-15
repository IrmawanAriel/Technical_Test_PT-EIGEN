import {Router} from "express";
import MemberRoute from "./member";
import BooksRouter from "./books"
import borrowRouter from "./borrowRouter";

const mainRouter = Router();

// mainrouter.use('/order', OrderBook)
mainRouter.use('/books', BooksRouter)
mainRouter.use('/member', MemberRoute)
mainRouter.use('/borrow', borrowRouter)


export default mainRouter;