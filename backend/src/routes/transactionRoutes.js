import express from 'express';
import { 
  getTransactions, 
  getTransaction, 
  createTransaction, 
  importTransactions, 
  updateTransaction, 
  deleteTransaction 
} from '../controllers/transactionController.js';

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Transaction:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         userId:
 *           type: integer
 *         date:
 *           type: string
 *           format: date-time
 *         description:
 *           type: string
 *         amount:
 *           type: number
 *         direction:
 *           type: string
 *           enum: [debit, credit]
 *         type:
 *           type: string
 *         category:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * tags:
 *   name: Transactions
 *   description: Transaction tracking API
 */

/**
 * @swagger
 * /api/transactions:
 *   get:
 *     summary: Get all transactions for the user
 *     tags: [Transactions]
 *     parameters:
 *       - in: query
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: direction
 *         schema:
 *           type: string
 *           enum: [debit, credit]
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of transactions
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 count:
 *                   type: integer
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Transaction'
 */
router.get('/', getTransactions);

/**
 * @swagger
 * /api/transactions/{id}:
 *   get:
 *     summary: Get a specific transaction by ID
 *     tags: [Transactions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *       - in: query
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Transaction details
 */
router.get('/:id', getTransaction);

/**
 * @swagger
 * /api/transactions:
 *   post:
 *     summary: Create a single transaction
 *     tags: [Transactions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - date
 *               - description
 *               - amount
 *               - direction
 *             properties:
 *               userId:
 *                 type: integer
 *               date:
 *                 type: string
 *                 format: date-time
 *               description:
 *                 type: string
 *               amount:
 *                 type: number
 *               direction:
 *                 type: string
 *                 enum: [debit, credit]
 *               type:
 *                 type: string
 *               category:
 *                 type: string
 *     responses:
 *       201:
 *         description: Transaction created successfully
 */
router.post('/', createTransaction);

/**
 * @swagger
 * /api/transactions/import:
 *   post:
 *     summary: Import multiple transactions
 *     tags: [Transactions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - transactions
 *             properties:
 *               userId:
 *                 type: integer
 *               transactions:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - date
 *                     - description
 *                     - amount
 *                     - direction
 *                   properties:
 *                     date:
 *                       type: string
 *                       format: date
 *                     description:
 *                       type: string
 *                     amount:
 *                       type: number
 *                     direction:
 *                       type: string
 *                       enum: [debit, credit]
 *                     type:
 *                       type: string
 *                     category:
 *                       type: string
 *     responses:
 *       201:
 *         description: Transactions imported successfully
 */
router.post('/import', importTransactions);

/**
 * @swagger
 * /api/transactions/{id}:
 *   patch:
 *     summary: Update an existing transaction
 *     tags: [Transactions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *             properties:
 *               userId:
 *                 type: integer
 *               date:
 *                 type: string
 *               description:
 *                 type: string
 *               amount:
 *                 type: number
 *               direction:
 *                 type: string
 *               category:
 *                 type: string
 *     responses:
 *       200:
 *         description: Transaction updated successfully
 */
router.patch('/:id', updateTransaction);

/**
 * @swagger
 * /api/transactions/{id}:
 *   delete:
 *     summary: Delete a transaction
 *     tags: [Transactions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *       - in: query
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Transaction deleted successfully
 */
router.delete('/:id', deleteTransaction);

export default router;