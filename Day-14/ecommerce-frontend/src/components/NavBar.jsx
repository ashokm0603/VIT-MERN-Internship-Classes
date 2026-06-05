import { Link } from "react-router-dom";
const NavBar = () => {
  return (
    <div >
      <nav style={NavStylings.navTag}>
        <ol style={NavStylings.olTag}>
          <li>
            {" "}
            <Link style={NavStylings.link} to="/home">Home</Link>{" "}
          </li>
          <li>
            {" "}
            <Link style={NavStylings.link}  to="/login">Login</Link>{" "}
          </li>
          <li>
            {" "}
            <Link style={NavStylings.link}  to="/register">Register</Link>{" "}
          </li>
          <li>
            {" "}
            <Link style={NavStylings.link}  to="/contact">Contact</Link>{" "}
          </li>
          <li>
            {" "}
            <Link style={NavStylings.link}  to="/about">About</Link>{" "}
          </li>
        </ol>
      </nav>
    </div>
  );
};


const NavStylings={
        navTag:{
            backgroundColor:'powderblue',
            height:"80px"
        } ,
        olTag:{
            height:"80px",
            width:"100vw",
            display:"flex",
            justifyContent:"space-evenly",
            alignItems:"center",
            listStyle:'none'
        },
        link:{
            textDecoration:"none",
            backgroundColor:'salmon',
            padding:"10px 20px",
            borderRadius:"10px"
        }
}









export default NavBar;
