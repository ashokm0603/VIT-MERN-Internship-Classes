import axios from "axios";
import React, { useEffect, useState } from "react";

const DisplayStudents = () => {
  const [students, setStudents] = useState([]);

  const fetchStudents = () => {
    try {
      const response = axios.get("http://localhost:4000/get-details");
      console.log(response);
      
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(()=>{
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchStudents()
  },[])

  return (
    <div className="m-5">
      <h1 className="text-center bg-success p-3s">All Student Details</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>RollNo</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            students.map((std)=>(
              <tr>
                <td>{std.name}</td>
                <td>{std.email}</td>
                <td>{std.phone}</td>
                <td>{std.rollNo}</td>
                <td>
                  <button className="btn btn-danger">Delete</button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
};

export default DisplayStudents;
