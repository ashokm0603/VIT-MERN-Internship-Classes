import { useContext } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import { CartContext } from "../services/CartProvider";

function NavBar() {
  const { cartItems } = useContext(CartContext);
  return (
    <Navbar expand="lg" className="nav-container">
      <Container>
        <div className="brand-Container">
          <img
            src="https://www.shutterstock.com/image-vector/october-10-2020-jakarta-indonesia-600nw-1830539645.jpg"
            alt=""
          />
          <Navbar.Brand href="#home">Think Mart</Navbar.Brand>
        </div>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/home">Home</Nav.Link>
            <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link href="/register">Register</Nav.Link>
            <Nav.Link href="/products">View Products</Nav.Link>
            <NavDropdown title="Features" id="basic-nav-dropdown">
              <NavDropdown.Item href="/add-products">
                Add Products
              </NavDropdown.Item>
              <NavDropdown.Item href="/delete-products">
                Delete Products
              </NavDropdown.Item>
              <NavDropdown.Item href="edit-products">
                Update Products
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Users</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
        <button className="btn btn-primary">
          <Link id="cart" to="/cart">
            Cart
          </Link>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            class="bi bi-cart3"
            viewBox="0 0 16 16"
          >
            <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l.84 4.479 9.144-.459L13.89 4zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
          </svg>

          {cartItems.length}
        </button>
      </Container>
    </Navbar>
  );
}

export default NavBar;
