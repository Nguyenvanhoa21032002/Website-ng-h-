import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const connectionDB = () => {
  const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
  });

  connection.connect((err) => {
    if (err) {
      console.error("Error connecting to MySQL:", err);
      return;
    }
    console.log("Connected to MySQL database");
  });

  process.on("SIGINT", () => {
    connection.end((err) => {
      if (err) {
        console.error("Error closing MySQL connection:", err);
      } else {
        console.log("MySQL connection closed");
      }
      process.exit();
    });
  });

  return connection;
};

export default connectionDB;
