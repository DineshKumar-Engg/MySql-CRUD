const CreateEmployee = require('express').Router()
const db = require('../DataBase/MySql.js')
const multer= require('multer');

const storage = multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,"./photo")
    },
    filename:(req,file,callback)=>{
        return callback(null,`image-${Date.now()}.${file.originalname}`)
    }
})

const imageFile = (req,file,callback)=>{
    if(file.mimetype.startsWith("image")){
        callback(null,true)
    }
    else{
        callback(null,Error("only images is allowed"))
    }
}

const upload=multer({ 
    storage:storage,
    fileFilter:imageFile
})

CreateEmployee.post('/',upload.single('photo'), async (req, res) => {
    try {
      const ids = Math.floor(Math.random() * 9000000) + 10000000;
      const { id } = ids
      const { name } = req.body
      const { email } = req.body
      const {sex} = req.body
      const { phoneNumber } = req.body
      const { address } = req.body
      const { joinedDate } = req.body
      const { department } = req.body
      const { position } = req.body
      const { salary } = req.body
      const { filename } = req.file
  
    db.query("INSERT INTO employee SET ?",
        {
          id: id, name: name, email: email,sex:sex, phoneNumber: phoneNumber, address: address, joinedDate: joinedDate, department: department,
          position: position, salary: salary, photo: filename
        })
        return res.status(200).json({message:"Successfully Created"})
    } catch (error) {
        return res.status(400).json(error)
    }
  })

module.exports = CreateEmployee

