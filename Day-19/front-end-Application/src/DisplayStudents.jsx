import axios from "axios";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

const DisplayStudents = () => {
  const [students, setStudents] = useState([]);

  const fetchStudents = async () => {
    try {
      const response = await axios.get("http://localhost:4000/get-details");
      console.log(response.data.AllStudentDetails);
      setStudents(response.data.AllStudentDetails);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchStudents();
  }, []);



  const handleDelete=async(id)=>{
      try {
        axios.delete(`http://localhost:4000/delete-student/${id}`)
        console.log(id);
        fetchStudents();
        toast.success("Record Deleted Successfully")
      } catch (error) {
        console.log(error);
        
      }
  }

  return (
    <div className="m-5">
      <h1 className="text-center bg-success p-3s">All Student Details</h1>
      <table className="table">
        <thead>
          <tr>
            <th className="bg-danger-subtle border border-danger text-center">Name</th>
            <th className="bg-danger-subtle border border-danger text-center">Email</th>
            <th className="bg-danger-subtle border border-danger text-center">Phone</th>
            <th className="bg-danger-subtle border border-danger text-center">RollNo</th>
            <th className="bg-danger-subtle border border-danger text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.length != 0 ? (
            students.map((std) => (
              <tr>
                <td className="border border-danger">{std.name}</td>
                <td className="border border-danger">{std.email}</td>
                <td className="border border-danger">{std.phone}</td>
                <td className="border border-danger">{std.rolNo}</td>
                <td className="border border-danger text-center">
                  <button className="btn btn-danger" onClick={()=>handleDelete(std.rolNo)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="border border-danger" colSpan={5} align="center">Student Details Not Found</td>
            </tr>
          )}
        </tbody>
      </table>
      <ToastContainer/>
    </div>
  );
};

export default DisplayStudents;
