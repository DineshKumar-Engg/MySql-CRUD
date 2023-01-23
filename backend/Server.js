const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv')
const app =express();
require('./DataBase/MySql.js')

app.use(cors())
app.use(express.urlencoded({extended: true}));
app.use(express.json());
dotenv.config()

const PORT = process.env.PORT;
app.listen(PORT,function(err){
    if(err){
        console.log("Local Server is PORT not connected");
    }else{
        console.log("server is connected at :",PORT);
    }   
})



//---------------------------------------------------//
const CreateEmployee = require('./Routes/CreateEmployee.js')
const EmployeeList = require('./Routes/EmployeeList.js');
const DeleteEmployee = require('./Routes/DeleteEmployee.js');
const EditEmployee = require('./Routes/EditEmployee.js');
//-----------------------------------------------------//

app.get('/',(req,res)=>{
    res.json("Hello Im from backend")
})
app.use('/photo',express.static("./photo"))
//----------------Getting Employee List---------------------------//
app.use('/list',EmployeeList)


//----------------create Employee List---------------------------//
app.use('/employee',CreateEmployee)

//----------------delete Employee List---------------------------//
app.use('/employee',DeleteEmployee)

app.use('/employee',EditEmployee)