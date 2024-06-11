import mysql from "mysql2/promise";

const mySqlPool = mysql.createPool({
  host: "127.0.0.1",
  user: "root",
  password: "1557",
  database: "inventory",
});

export default mySqlPool;
