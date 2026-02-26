import mysql from "mysql2";
import dotenv from "dotenv";

console.log(process.env.DB_USER);

dotenv.config();

const connectionDB = () => {
  const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.DB_USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
  });

  // const connection = mysql.createConnection({
  // host: 'localhost',
  // user: 'root',
  // password: '',
  // database: 'web_do_an.sql'
// });

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

//   const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '',
//   database: 'dong_ho'
// });

// connection.connect((err) => {
//   if (err) {
//     console.error('Lỗi kết nối DB:', err);
//   } else {
//     console.log('Kết nối MySQL thành công');
//   }
// });

  return connection;
};

export default connectionDB;
