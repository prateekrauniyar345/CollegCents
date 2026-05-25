// routes/userRoutes.js
import express from 'express';
import { getUsers, createUser, updateUser, authUser, deleteUser } from '../controllers/userController.js';

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Auto-generated internal DB id
 *         provider:
 *           type: string
 *           description: Auth provider (e.g. microsoft)
 *         providerUserId:
 *           type: string
 *           description: The unique OID from Microsoft
 *         homeAccountId:
 *           type: string
 *           description: The MSAL home account ID
 *         tenantId:
 *           type: string
 *           description: The Microsoft Tenant ID
 *         email:
 *           type: string
 *           description: User's email
 *         name:
 *           type: string
 *           description: User's full name
 *         role:
 *           type: string
 *           description: Role in the app (e.g. user, admin)
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *         lastLoginAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management API
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Returns the list of all the users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: The list of the users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.get('/', getUsers);

/**
 * @swagger
 * /api/users/auth:
 *   post:
 *     summary: Authenticate and sync a Microsoft user
 *     description: Upserts a user in the database based on their Microsoft identity. Updates lastLoginAt if they already exist, creates a new record if they don't.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - providerUserId
 *               - email
 *             properties:
 *               providerUserId:
 *                 type: string
 *                 description: OID from Microsoft payload
 *               homeAccountId:
 *                 type: string
 *               tenantId:
 *                 type: string
 *               email:
 *                 type: string
 *               name:
 *                 type: string
 *             example:
 *               providerUserId: "c14163a9-2e0a-45ee-9a6c-71a32c476292"
 *               homeAccountId: "00000000-0000-0000-ed9c-582e8c8cd057.9188040d-6c67-4c5b-b112-36a304b66dad"
 *               tenantId: "23d82046-7e7d-4cf9-8efd-8012ec1d7a7c"
 *               email: "prateekrauniyar345@gmail.com"
 *               name: "Pratik Rauniyar"
 *     responses:
 *       200:
 *         description: User authenticated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
router.post('/auth', authUser);

/**
 * @swagger
 * /api/users/{id}:
 *   patch:
 *     summary: Update an existing user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The user id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               role:
 *                 type: string
 *     responses:
 *       200:
 *         description: The user was successfully updated
 *       404:
 *         description: User not found
 */
router.patch('/:id', updateUser);

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Delete an existing user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The user id
 *     responses:
 *       200:
 *         description: The user was successfully deleted
 *       404:
 *         description: User not found
 */
router.delete('/:id', deleteUser);

export default router;