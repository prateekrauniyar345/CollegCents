// routes/authRoutes.js

import express from 'express';
import { microsoftAuth } from '../controllers/authController.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication API
 */

/**
 * @swagger
 * /api/auth/microsoft:
 *   post:
 *     summary: Authenticate and sync Microsoft user
 *     description: Creates a new user if they do not exist, updates last_login_at if they already exist, and returns the current database user.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - account
 *             properties:
 *               account:
 *                 type: object
 *                 required:
 *                   - provider_user_id
 *                   - tenant_id
 *                 properties:
 *                   provider:
 *                     type: string
 *                     example: microsoft
 *                   provider_user_id:
 *                     type: string
 *                     example: c14163a9-2e0a-45ee-9a6c-71a32c476292
 *                   tenant_id:
 *                     type: string
 *                     example: 23d82046-7e7d-4cf9-8efd-8012ec1d7a7c
 *                   home_account_id:
 *                     type: string
 *                     example: 00000000-0000-0000-ed9c-582e8c8cd057.9188040d-6c67-4c5b-b112-36a304b66dad
 *                   email:
 *                     type: string
 *                     example: prateekrauniyar345@gmail.com
 *                   name:
 *                     type: string
 *                     example: Pratik Rauniyar
 *     responses:
 *       200:
 *         description: User authenticated successfully
 *       400:
 *         description: Missing or invalid Microsoft account data
 *       500:
 *         description: Internal server error
 */

router.post('/microsoft', microsoftAuth);

export default router;