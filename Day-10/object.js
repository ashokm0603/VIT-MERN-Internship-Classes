let employeeDetails={
    name:"ravi",
    role:"developer",
    salary:98745,
    skills:["Node Js","Express Js","Git actions and github","mongodb", "react "]
}


console.log(employeeDetails);
//CRUD operations

employeeDetails.name='Sai Teja';
employeeDetails.skills[0]="Node and Next Js"


employeeDetails.address="Hyderabad"

delete employeeDetails.salary;

console.log("Name :",employeeDetails.name);
console.log(employeeDetails);



console.log(Object.keys(employeeDetails));
console.table(Object.values(employeeDetails));

console.log(Object.entries(employeeDetails))


Object.seal(employeeDetails);//only we can update values but we can't delete or add new field to object
console.log(Object.isSealed(employeeDetails));
console.log('---after seal-------');
employeeDetails.company="TCS" ;
delete employeeDetails.name;
employeeDetails.name="Vivek Ayan"
console.log(employeeDetails);



