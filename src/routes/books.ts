
/**
 * @swagger
 * components:
 *   schemas:
 *     Books:
 *       type: object
 *       required:
 *         - code
 *         - title
 *         - author
 *         - stock
 *       properties:
 *         code:
 *           type: string
 *           description: The unique code of the book
 *         title:
 *           type: string
 *           description: The title of the book
 *         author:
 *           type: string
 *           description: The author of the book
 *         stock:
 *           type: integer
 *           description: Number of books available in stock
 */

/**
 * @swagger
 * tags:
 *   name: Books
 *   description: The books managing API
 * 
 * /books:
 *   get:
 *     summary: Retrieves a list of all books
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: A list of books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Books'
 *       404:
 *         description: No books found
 */

/**
 * @swagger
 * /books/create:
 *   post:
 *     summary: Creates a new book or multiple books
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/Books'
 *     responses:
 *       201:
 *         description: Books created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Books created successfully
 *       400:
 *         description: Invalid request data
 *       500:
 *         description: Server error
 */


import {Router} from "express"
import { CreateBooks, GetAllBooks } from "../handlers/BooksHandlers";

const BooksRouter = Router();

BooksRouter.get('/', GetAllBooks)
BooksRouter.post('/create', CreateBooks)

export default BooksRouter