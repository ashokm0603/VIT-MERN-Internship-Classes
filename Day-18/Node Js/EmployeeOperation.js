//CRUD Operations
let empDetails = [];

const addEmployees = (emp) => {
  empDetails.push(emp);
};

const getAllEmployee = () => {
  console.log(empDetails);
};


const getEmpDetailsBasedOnEmail=(email)=>{
  const FoundEmp= empDetails.filter((emp)=>emp.email==email);
  console.log(FoundEmp);
}

const deleteEmpBasedOnEmail=(email)=>{
    const filteredEmployees= empDetails.filter((emp)=>emp.email!=email);
    empDetails=filteredEmployees;
}



module.exports = { addEmployees, getAllEmployee, getEmpDetailsBasedOnEmail,deleteEmpBasedOnEmail };
