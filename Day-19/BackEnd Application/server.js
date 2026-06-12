const express = require("express");
const port = 4000;
const app=express();
const cors=require("cors")
let  StudentDetails=[]
app.use(express.json()) // middleware 

app.use(cors())

//Get Api 
app.get('/get-details',(req, res)=>{
    res.status(200).json({AllStudentDetails:StudentDetails})
})


//post api to store StudentDetails
app.post("/add-student",(req,res)=>{
    const newStudent={
        name:req.body.name ,
        email:req.body.email ,
        phone:req.body.phone ,
        rolNo:req.body.rolNo
    }
    StudentDetails.push(newStudent);
    res.status(200).json({message:"new Record added successfully",newStudent})
})

//Api to delete Student details
app.delete("/delete-student/:id",(req, res)=>{
        const filteredStudents=StudentDetails.filter((student)=>student.rolNo!=req.params.id)
        StudentDetails=filteredStudents;
        res.status(200).json({message:"Deleted Successfully"})
})

app.listen(port, () => {
  console.log("Server Running On Port :", port);
});
