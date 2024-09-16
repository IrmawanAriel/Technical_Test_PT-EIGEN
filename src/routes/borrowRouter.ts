/**
 * @swagger
 * components:
 *   schemas:
 *     Borrow:
 *       type: object
 *       required:
 *         - user_code
 *         - book_code
 *       properties:
 *         user_code:
 *           type: string
 *           description: The unique code of the user borrowing the book
 *         book_code:
 *           type: string
 *           description: The unique code of the book being borrowed
 *         borrow_date:
 *           type: string
 *           format: date
 *           description: The date when the book was borrowed
 *         return_date:
 *           type: string
 *           format: date
 *           description: The date when the book was returned
 */

/**
 * @swagger
 * tags:
 *   name: Borrow
 *   description: The borrowing and returning of books
 * 
 * /borrow:
 *   get:
 *     summary: Retrieve a list of all borrowed books
 *     tags: [Borrow]
 *     responses:
 *       200:
 *         description: A list of borrowed books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Borrow'
 *       404:
 *         description: No borrowed books found
 */

/**
 * @swagger
 * /borrow/create:
 *   post:
 *     summary: Borrow a book
 *     tags: [Borrow]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Borrow'
 *     responses:
 *       201:
 *         description: Book borrowed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Book borrowed successfully
 *       400:
 *         description: Invalid request data
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /borrow/{user_code}:
 *   get:
 *     summary: Get borrowing details by user code
 *     tags: [Borrow]
 *     parameters:
 *       - in: path
 *         name: user_code
 *         schema:
 *           type: string
 *         required: true
 *         description: The unique code of the user
 *     responses:
 *       200:
 *         description: Borrowing details of the user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Borrow'
 *       404:
 *         description: Borrowing records not found for the user
 */

/**
 * @swagger
 * /borrow/return:
 *   post:
 *     summary: Return a borrowed book
 *     tags: [Borrow]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_code:
 *                 type: string
 *                 description: The code of the user returning the book
 *               book_code:
 *                 type: string
 *                 description: The code of the book being returned
 *     responses:
 *       200:
 *         description: Book returned successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Book returned successfully
 *       404:
 *         description: Borrow record not found
 *       500:
 *         description: Server error
 */


import { Router } from "express";
import { createNewLoan, getLoan, returnLoan } from "../handlers/BorrowHandlers";

const borrowRouter = Router();

borrowRouter.get('/', getLoan)
borrowRouter.get('/:user_code', getLoan)

borrowRouter.post('/create', createNewLoan)
borrowRouter.post('/return', returnLoan)

export default borrowRouter