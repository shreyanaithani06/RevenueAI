CREATE DATABASE IF NOT EXISTS revenueai;
USE revenueai;

-- 1. Customers Table
CREATE TABLE IF NOT EXISTS customers (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Failed Payments Queue Table
CREATE TABLE IF NOT EXISTS failed_payments (
    id VARCHAR(50) PRIMARY KEY,
    customer_id VARCHAR(50) NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    currency VARCHAR(10) DEFAULT 'INR',
    failure_reason VARCHAR(255) NOT NULL,
    error_code VARCHAR(50),
    recovery_score INT DEFAULT 0,
    recommended_action ENUM('SMART_RETRY', 'SEND_REMINDER', 'UPDATE_PAYMENT_METHOD', 'NO_ACTION') DEFAULT 'NO_ACTION',
    status ENUM('PENDING', 'PROCESSING', 'RECOVERED', 'FAILED') DEFAULT 'PENDING',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE
);

-- 3. Recovery Logs Table
CREATE TABLE IF NOT EXISTS recovery_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    payment_id VARCHAR(50) NOT NULL,
    action_executed VARCHAR(50) NOT NULL,
    status ENUM('SUCCESS', 'FAILED') NOT NULL,
    details TEXT,
    executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (payment_id) REFERENCES failed_payments(id) ON DELETE CASCADE
);

-- Seed Initial Mock Data
INSERT INTO customers (id, name, email, phone) VALUES
('cust_01', 'Rahul Sharma', 'rahul@example.com', '+919876543210'),
('cust_02', 'Priya Patel', 'priya@example.com', '+919876543211'),
('cust_03', 'Ankit Mehta', 'ankit@example.com', '+919876543212'),
('cust_04', 'Vikram Singh', 'vikram@example.com', '+919876543213')
ON DUPLICATE KEY UPDATE id=id;

INSERT INTO failed_payments (id, customer_id, amount, failure_reason, error_code, recovery_score, recommended_action, status) VALUES
('pay_101', 'cust_01', 48000.00, 'Bank Server Timeout', 'GATEWAY_TIMEOUT', 91, 'SMART_RETRY', 'PENDING'),
('pay_102', 'cust_02', 21500.00, 'Insufficient Funds', 'INSUFFICIENT_FUNDS', 82, 'SEND_REMINDER', 'PENDING'),
('pay_103', 'cust_03', 15200.00, 'Card Expired', 'CARD_EXPIRED', 76, 'UPDATE_PAYMENT_METHOD', 'PENDING'),
('pay_104', 'cust_04', 8500.00, 'Stolen / Blacklisted Card', 'CARD_BLACK_LISTED', 18, 'NO_ACTION', 'PENDING')
ON DUPLICATE KEY UPDATE id=id;