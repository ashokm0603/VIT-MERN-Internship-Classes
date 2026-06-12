const os=require("os") ;
console.log( "Platform :",os.platform());
console.log( "Architecture: ",os.arch());
console.log( "CPU Cores: ",os.cpus().length);
console.log("Total Memory", os.totalmem());
console.log("Free Memory", os.freemem());
console.log("Home Directory", os.homedir());
console.log("Host Name", os.hostname());
console.log("OS Type ", os.type());