import { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
const AddStudent = () => {
  const [studentDetails, setStudentDetails] = useState({
    name: "",
    email: "",
    phone: "",
    rollNo: "",
  });

  const handleChange = (e) => {
    setStudentDetails({ ...studentDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    try {
      e.preventDefault();

      const response =await axios.post(
        "http://localhost:4000/add-student",
        studentDetails,
      );
      console.log(response);
      toast.success("New student added Successfully");
    } catch (error) {
      console.log(error);

      toast.error("failed to add student");
    }
  };
  return (
    <div className="p-5 m-5">
      <form action="" onSubmit={handleSubmit}>
        <fieldset>
            <h1 className="text-center bg-info">Add Student </h1>
          <div className="row m-2">
            <div className="col">
              <label htmlFor="">Name</label>
            </div>
            <div className="col">
              <input
                type="text"
                onChange={handleChange}
                placeholder="Enter Name"
                name="name"
                className="form-control"
              />
            </div>
          </div>
          <div className="row m-2">
            <div className="col">
              <label htmlFor="">Email</label>
            </div>
            <div className="col">
              <input
                type="email"
                onChange={handleChange}
                placeholder="Enter Email"
                name="email"
                className="form-control"
              />
            </div>
          </div>
          <div className="row m-2">
            <div className="col">
              <label htmlFor="">PhoneNo</label>
            </div>
            <div className="col">
              <input
                type="tel"
                onChange={handleChange}
                placeholder="Enter Phone No"
                name="phone"
                className="form-control"
              />
            </div>
          </div>
          <div className="row m-2">
            <div className="col">
              <label htmlFor="">RollNo</label>
            </div>
            <div className="col">
              <input
                type="text"
                onChange={handleChange}
                placeholder="Enter RollNo"
                name="rollNo"
                className="form-control"
              />
            </div>
          </div>
          <div className="row m-2">
            <button type="submit" className="btn btn-primary">
              Add Student
            </button>
            <button type="reset" className="btn btn-warning">
              Cancel
            </button>
          </div>
        </fieldset>
      </form>
      <ToastContainer/>
    </div>
  );
};

export default AddStudent;
