/**
 * @swagger
 * components:
 *   schemas:
 *     Member:
 *       type: object
 *       required:
 *         - code
 *         - name
 *       properties:
 *         code:
 *           type: string
 *           description: The unique code of the member
 *         name:
 *           type: string
 *           description: The name of the member
 */

/**
 * @swagger
 * tags:
 *   name: Member
 *   description: API for managing members
 * 
 * /member:
 *   get:
 *     summary: Retrieve a list of all members
 *     tags: [Member]
 *     responses:
 *       200:
 *         description: A list of members
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Member'
 *       404:
 *         description: No members found
 */

/**
 * @swagger
 * tags:
 *   name: Member
 *   description: API for managing members
 * 
 * /member:
 *   get:
 *     summary: Retrieve a list of all members
 *     tags: [Member]
 *     responses:
 *       200:
 *         description: A list of all members
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Member'
 *       404:
 *         description: No members found
 */

/**
 * @swagger
 * /member/create:
 *   post:
 *     summary: Create a new member
 *     tags: [Member]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Member'
 *     responses:
 *       201:
 *         description: Member created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Member'
 *       400:
 *         description: Invalid request data
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /member/{code}:
 *   get:
 *     summary: Get a member by code
 *     tags: [Member]
 *     parameters:
 *       - in: path
 *         name: code
 *         schema:
 *           type: string
 *         required: true
 *         description: The unique code of the member
 *     responses:
 *       200:
 *         description: Member details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Member'
 *       404:
 *         description: Member not found
 */



import { Router } from "express";
import { CreateMember, GetAll } from "../handlers/MemberHandlers";

const MemberRoute = Router()

MemberRoute.get('/', GetAll)
MemberRoute.post('/create', CreateMember)

export default MemberRoute;