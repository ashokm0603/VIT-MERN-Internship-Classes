const fs = require("fs");


//create new file and insert data
// fs.writeFile('sample.txt',"This is sample file creating using Node Js",()=>{
//     console.log("File Created Successfully");
// })



// fs.appendFile('sample.txt',"\nThis is appended Data",()=>{
//     console.log("Data appended same File");
    
// })

// fs.readFile("sample.txt","utf-8",(err,data)=>{
//     console.log(data);
    
// })

//delete file
fs.unlink("sample.txt",()=>{
    console.log("file deleted");
})