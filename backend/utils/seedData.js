// utils/seedData.js
const pool = require('../config/db');

async function seedDatabase() {
  try {
    console.log('🌱 Starting 100-Record Database Seeding...');

    // 1. Drop existing tables to refresh schema clean
    await pool.query('SET FOREIGN_KEY_CHECKS = 0');
    await pool.query('DROP TABLE IF EXISTS recovery_logs');
    await pool.query('DROP TABLE IF EXISTS failed_payments');
    await pool.query('DROP TABLE IF EXISTS customers');
    await pool.query('SET FOREIGN_KEY_CHECKS = 1');

    // 2. Recreate Tables with explicit AUTO_INCREMENT
    await pool.query(`
      CREATE TABLE customers (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await pool.query(`
      CREATE TABLE failed_payments (
        id INT AUTO_INCREMENT PRIMARY KEY,
        customer_id INT NOT NULL,
        amount DECIMAL(10, 2) NOT NULL,
        failure_reason VARCHAR(255) NOT NULL,
        error_code VARCHAR(100),
        recovery_score INT DEFAULT 50,
        recommended_action ENUM('SMART_RETRY', 'SEND_REMINDER', 'UPDATE_PAYMENT_METHOD', 'NO_ACTION') DEFAULT 'SMART_RETRY',
        status ENUM('PENDING', 'PROCESSING', 'RECOVERED', 'FAILED') DEFAULT 'PENDING',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE
      );
    `);

    await pool.query(`
      CREATE TABLE recovery_logs (
        id INT AUTO_INCREMENT PRIMARY KEY,
        payment_id INT NOT NULL,
        action_executed VARCHAR(100) NOT NULL,
        status ENUM('SUCCESS', 'FAILED') DEFAULT 'SUCCESS',
        details TEXT,
        executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (payment_id) REFERENCES failed_payments(id) ON DELETE CASCADE
      );
    `);

    // 3. Insert Base Customers
    await pool.query(`
      INSERT INTO customers (name, email) VALUES
      ('Aarav Sharma', 'aarav.sharma@example.com'),
      ('Priya Patel', 'priya.patel@example.com'),
      ('Rohan Verma', 'rohan.verma@example.com'),
      ('Ananya Iyer', 'ananya.iyer@example.com'),
      ('Vikram Singh', 'vikram.singh@example.com'),
      ('Neha Gupta', 'neha.gupta@example.com'),
      ('Karan Mehta', 'karan.mehta@example.com'),
      ('Siddharth Joshi', 'siddharth.joshi@example.com'),
      ('Pooja Reddy', 'pooja.reddy@example.com'),
      ('Aditya Nair', 'aditya.nair@example.com');
    `);

    // 4. Generate 100 Random Payment Failures
    const reasons = [
      { reason: 'Bank Gateway Timeout (HDFC)', code: 'GATEWAY_TIMEOUT', action: 'SMART_RETRY', score: 92 },
      { reason: 'Insufficient Account Balance', code: 'INSUFFICIENT_FUNDS', action: 'SEND_REMINDER', score: 82 },
      { reason: 'Expired Credit Card', code: 'CARD_EXPIRED', action: 'UPDATE_PAYMENT_METHOD', score: 76 },
      { reason: 'Network Disruption (ICICI)', code: 'NETWORK_ERROR', action: 'SMART_RETRY', score: 88 },
      { reason: 'Suspected Fraudulent Card', code: 'FRAUD_BLOCK', action: 'NO_ACTION', score: 15 },
      { reason: 'Bank Gateway Timeout (Axis)', code: 'GATEWAY_TIMEOUT', action: 'SMART_RETRY', score: 91 },
      { reason: '3DS Authentication Failed', code: 'AUTH_FAILED', action: 'UPDATE_PAYMENT_METHOD', score: 65 }
    ];

    const statuses = ['PENDING', 'PENDING', 'PENDING', 'RECOVERED', 'FAILED'];

    for (let i = 1; i <= 100; i++) {
      const customerId = (i % 10) + 1;
      const randomReason = reasons[Math.floor(Math.random() * reasons.length)];
      const randomAmount = Math.floor(Math.round(Math.random() * 30000 + 500) / 10) * 10;
      const status = statuses[Math.floor(Math.random() * statuses.length)];

      await pool.query(`
        INSERT INTO failed_payments 
        (customer_id, amount, failure_reason, error_code, recovery_score, recommended_action, status) 
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `, [
        customerId,
        randomAmount,
        randomReason.reason,
        randomReason.code,
        randomReason.score,
        randomReason.action,
        status
      ]);
    }

    console.log('✅ Successfully seeded 100 payment failure records into MySQL!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error Seeding Database:', error);
    process.exit(1);
  }
}

seedDatabase();