const EditEmployee = require('express').Router()
const db = require('../DataBase/MySql.js')
const multer= require('multer');

EditEmployee.get('/:id',async(req,res)=>{
    try{

        const id = req.params.id
        // console.log(id);
        const query= "SELECT * FROM employee WHERE id = ? "
        db.query(query,[id],(err,data)=>{
            if(err) return res.status(400).json({message:"Not found"})
            return res.status(200).json(data)
        })
    }catch(err){
        res.status(400).json({message:"Check query"})
    }
})

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


EditEmployee.put('/:id',upload.single('photo'),async(req,res)=>{
     try{
        const id = req.params.id
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


const q = "UPDATE employee SET ? WHERE id = ? "

    db.query(q,[{
        name: name, email: email,sex:sex, phoneNumber: phoneNumber, address: address, joinedDate: joinedDate, department: department,
        position: position, salary: salary, photo: filename
      },id])

        return res.status(200).send({message:"Successfully Updated"})
    }catch(err){
        return res.status(400).json({message:'Kindly Check',err})
        
    }
})
module.exports = EditEmployee