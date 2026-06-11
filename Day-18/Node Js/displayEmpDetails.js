const {addEmployees,getAllEmployee,getEmpDetailsBasedOnEmail,deleteEmpBasedOnEmail}=require("./EmployeeOperation");

addEmployees({name:"sai",email:"sai@gmail.com", phone:987456123});
addEmployees({name:"ravi",email:"ravi@gmail.com", phone:987456123});
addEmployees({name:"raju",email:"raju@gmail.com", phone:987452523});


getAllEmployee()

addEmployees({name:"ravi Kumar",email:"raju@gmail.com", phone:987452523});

getAllEmployee()

getEmpDetailsBasedOnEmail('raju@gmail.com')
deleteEmpBasedOnEmail("raju@gmail.com")


console.log("After delete raju@gmail.com");
getAllEmployee();
