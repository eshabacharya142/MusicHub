import React from "react";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "../index.css";

const NavbarComponent = () => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.users);

  const handleNavbarClick = (path) => {
    navigate(path);
  };

  const renderLoggedInLinks = () => (
    <>
      <Nav.Link onClick={() => handleNavbarClick("/profile") } style={{ color: "white" }}>Profile</Nav.Link>
      <Nav.Link disabled={true} style={{ color: "white" }}>Logged in as {currentUser.username}</Nav.Link>
    </>
  );

  const renderLoggedOutLinks = () => (
    <>
      <Nav.Link onClick={() => handleNavbarClick("/login") } style={{ color: "white" }}>Login</Nav.Link>
      <Nav.Link onClick={() => handleNavbarClick("/register")} style={{ color: "white" }}> Register</Nav.Link>
    </>
  );

  return (
    <Navbar collapseOnSelect expand="md" variant="dark" className="navbar-custom">
      <Container>
        <Navbar.Brand
         className="wd-cursor-pointer brand"
          onClick={() => handleNavbarClick("/")}
        >
          Sputify
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={() => handleNavbarClick("/search")} style={{ color: "white" }}>Tracks</Nav.Link>
            <Nav.Link onClick={() => handleNavbarClick("/event")} style={{ color: "white" }}>Event</Nav.Link>

            {currentUser !== null && currentUser.role === "ADMIN" && (
              <Nav.Link onClick={() => handleNavbarClick("/admin")} style={{ color: "white" }}>
                Admin Dashboard
              </Nav.Link>
            )}
          </Nav>
          <Nav>
            {currentUser ? renderLoggedInLinks() : renderLoggedOutLinks()}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
