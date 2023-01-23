const mysql = require('mysql2');

const DataBase = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'Dinesh@#1036',
    database:'crud'
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