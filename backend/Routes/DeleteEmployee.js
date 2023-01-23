const DeleteEmployee = require('express').Router()
const db = require('../DataBase/MySql.js')

DeleteEmployee.delete('/:id',async(req,res)=>{
    const id = req.params.id
    const q = "delete from employee where id = ? "
    db.query(q,[id],(err,data)=>{
        if(err) return res.json(err)
        return res.status(200).send({message:"Employee Deleted successfully"})
    })
})

module.exports = DeleteEmployee