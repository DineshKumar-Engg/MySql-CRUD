const EmployeeList = require('express').Router()
const db = require('../DataBase/MySql.js')


EmployeeList.get('/',async (req, res) => {
    try {
      let sql = "SELECT * FROM employee";
      db.query(sql,(error, result)=>{
        if (error) {
          console.log("An error caught occured in result");
        }else{
         return res.status(201).send({data:result})
        }
      });
    } catch (error) {
      return res.status(422).json({ message: "AN error caught occured in API/display Employees" });
    }
  })

  module.exports = EmployeeList