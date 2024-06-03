#Deraj_project is meant to be a simple graphics services page
it incoperates the aspect of making an enquiry directly to the creators server through simple fetch
the client is able to identify what he/she needs after login the make a request
for the specifc design from the creator by writing a message in the que page

//follow steps to set up the server side

Set up MySQL and create a database and table.
Install necessary Node.js packages.
Connect to MySQL from your Node.js server.
Modify the server to insert data into the MySQL database.
Step 1: Set Up MySQL
First, make sure you have MySQL installed and running. Then, create a database and table:

// Set up Mysql
"""
CREATE TABLE clients (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
"""

"""
-- Create database
CREATE DATABASE orders_db;

-- Use the database
USE orders_db;

-- Create table
CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    client_name TEXT,
    email VARCHAR(255),
    service VARCHAR(255),
    amount DECIMAL(10, 2),
    message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
"""
//
Step 2: Install Necessary Node.js Packages
You will need the mysql2 package to connect to MySQL from Node.js, and dotenv to manage environment variables securely.

//bash
npm install express cors mysql2 dotenv


Step 3: Create a .env File
Create a .env file in the root of your project to store your database connection details:

//.env

DB_HOST=localhost
DB_USER=astron
DB_PASSWORD=Aa123456
DB_DATABASE=orders_db
