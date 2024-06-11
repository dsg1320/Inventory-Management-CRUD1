const mysql = require('mysql2/promise')

const mySqlPool = mysql.createPool({
    host: "127.0.0.1",
    user:"root",
    password: "1320kpz2tvm",
    database: "inventory",
});

module.exports=mySqlPool;