// config/db.js
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
  uri: process.env.DB_CONNECTION_STRING,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Function to initialize the database tables
export const initDB = async () => {
  try {
    const connection = await pool.getConnection();
    
    // Create Users table
    await connection.query(`
        CREATE TABLE IF NOT EXISTS users (
            id BIGINT PRIMARY KEY AUTO_INCREMENT,
            provider VARCHAR(50) NOT NULL DEFAULT 'microsoft',
            provider_user_id VARCHAR(255) NOT NULL,
            tenant_id VARCHAR(255) NOT NULL,
            home_account_id VARCHAR(255),
            email VARCHAR(255),
            name VARCHAR(255),
            role VARCHAR(50) DEFAULT 'user',
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            last_login_at DATETIME,
            UNIQUE KEY unique_provider_user (provider, tenant_id, provider_user_id)
        );
    `);
    
    console.log('[DATABASE] : Database tables initialized.');
    connection.release();
  } catch (error) {
    console.error('[DATABASE] : Error initializing database:', error);
  }
};

export default pool;