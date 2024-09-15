import {Router} from "express";
import MemberRoute from "./member";
import BooksRouter from "./books"

const mainRouter = Router();

// mainrouter.use('/order', OrderBook)
mainRouter.use('/books', BooksRouter)
mainRouter.use('/member', MemberRoute)

export default mainRouter;