const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'revenueai',
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test Database Connection
pool.getConnection()
  .then((conn) => {
    console.log('✅ MySQL Database Connected Successfully');
    conn.release();
  })
  .catch((err) => {
    console.error('⚠️ Database Connection Warning:', err.message);
    console.log('ℹ️ Ensure MySQL is running on port 3306 and database "revenueai" exists.');
  });

module.exports = pool;