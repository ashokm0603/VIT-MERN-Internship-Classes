import React, { useState } from "react";
import axios from "axios";

const ExampleUseEffect = () => {


    const [users, setUsers]=useState([])
  const fetchUsers = async () => {
    const response = await axios.get("https://api.github.com/users");
    console.log(response.data);
    setUsers(response.data)
  };
 
  React.useEffect(() => {
    fetchUsers();
  }, []);

  //   React.useMemo(() => {
  //     console.log("This is Use Memo");
  //   }, []);

  return <div className="row">
            {users.map((user)=>(
                <div className="col m-3 bg-info-subtle p-4">
                    <div className="card d-flex flex-column justify-content-evenly align-items-center">
                        <img src={user.avatar_url} height={200} width={200} className="card-top-image" alt="" />
                        <h4 className="cart-title">{user.login}</h4>
                        <p className="card-text">User Type :{user.type}</p>
                    </div>
                </div>
            ))}
  </div>;
};

export default ExampleUseEffect;
