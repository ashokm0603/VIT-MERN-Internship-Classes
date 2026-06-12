const http = require("http");
const users=require("./users")
const port =5000;


const server = http.createServer((req, res) => {
  res.end(JSON.stringify({
    data: "Sample data returning when server starts",
    allUsers:users
  }));
});

server.listen(port,()=>{
    console.log("Server is running on port", port);
})