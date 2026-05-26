import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import swaggerSpecs from './config/swagger.js';
import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';
import transactionRoutes from './routes/transactionRoutes.js';
import { initDB } from './config/db.js';

dotenv.config();

const app = express();

// Initialize Database
initDB();

// Middleware
app.use(cors());
app.use(express.json());

// Swagger UI Route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/transactions', transactionRoutes);


// Basic health check route
app.get('/', (req, res) => {
  res.json({ message: 'Campus Cents API is running!' });
});

export default app;