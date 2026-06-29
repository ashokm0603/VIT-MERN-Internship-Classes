import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";

const Users = () => {
  const [users, setUsers] = useState([]);

  const [queryData, setQueryData] = useState({
    gender: "",
    city: "",
  });

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/api/get-users", {
        headers: { authorization: `Bearer ${token}` },
      });

      console.log(response);
      setUsers(response.data.allUsers);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchUsers();
  }, []);

  const handleFilter = async () => {
    try {
      const token = localStorage.getItem("token");
    const response= await axios.get(
        `http://localhost:5000/api/users?qgender=${queryData.gender}&&qcity=${queryData.city}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        },
      );

      console.log(response);

      setUsers(response.data.filteredUsers)
      
      
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div className="row my-2 px-5 d-flex items-center justify-content-center">
        <div className="col py-3">
          <h2>Filter Users </h2>
        </div>
        <div className="col">
          <Form.Group>
            <Form.Label>gender</Form.Label>
            <Form.Control
              onChange={(e) => {
                setQueryData({ ...queryData, gender: e.target.value });
              }}
              placeholder="Enter Gender to filter users"
            />
          </Form.Group>
        </div>
        <div className="col">
          <Form.Group>
            <Form.Label>City</Form.Label>
            <Form.Control
              onChange={(e) => {
                setQueryData({ ...queryData, city: e.target.value });
              }}
              placeholder="Enter City to filter users"
            />
          </Form.Group>
        </div>

        <div className="col  py-4">
          <button className="btn btn-primary" onClick={handleFilter}>
            Apply Filters
          </button>
        </div>
      </div>
      <Row className="m-4 p-3 g-4" md={3}>
        {users.map((person) => (
          <Col>
            <div className="card bg-secondary-subtle">
              <div className="card-body">
                <h3>
                  Name :{person.FName} {person.LName}
                </h3>
                <h4>Email :{person.Username}</h4>
                <h4>Gender :{person.gender}</h4>
                <h4>City :{person.city}</h4>
                <h4>State :{person.state}</h4>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Users;
