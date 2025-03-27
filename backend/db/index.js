import mysql from 'mysql2';

const dbConfig = {
    host: 'localhost',
    user: 'root',          // Replace with your MySQL username
    password: '12345', // Replace with your MySQL password
    database: 'mess_feedback_system'
  };
  
async function connectDB() {
    try {
      const connection = await mysql.createConnection(dbConfig);
      console.log('Connected to MySQL database');
      return connection;
    } catch (err) {
      console.error('Database connection failed:', err);
      throw err;
    }
}

export default connectDB;