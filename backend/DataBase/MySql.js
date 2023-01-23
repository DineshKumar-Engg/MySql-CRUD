const mysql = require('mysql2');
const dotenv = require('dotenv')
dotenv.config()

const DataBase = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
}
)

DataBase.connect(function(err){
    if(err){
        console.log("Error connection to db");
    }else{
        console.log("MySQL is connected");
    }
})

module.exports = DataBase