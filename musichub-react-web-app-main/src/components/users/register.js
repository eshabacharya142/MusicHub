import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerThunk } from "./users-thunk";
import { useNavigate } from "react-router";
import './register-login.css';
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { Alert } from "react-bootstrap";
import { Link } from "react-router-dom";

const Register = () => {
  const { currentUser, errorRegister } = useSelector((state) => state.users);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("CONTENT-VIEWER");

  const [firstNameAlert, setFirstNameAlert] = useState(false);
  const [lastNameAlert, setLastNameAlert] = useState(false);
  const [emailAlert, setEmailAlert] = useState(false);
  const [passwordAlert, setPasswordAlert] = useState(false);
  const [usernameAlert, setUsernameAlert] = useState(false);
  const [errorRegisterAlert, setErrorRegisterAlert] = useState(false);

  const dispatch = useDispatch();
  const handleRegisterBtn = () => {
    setFirstNameAlert(false);
    setLastNameAlert(false);
    setEmailAlert(false);
    setUsernameAlert(false);
    setPasswordAlert(false);

    if (firstname === "") {
      setFirstNameAlert(true);
    } else if (lastname === "") {
      setLastNameAlert(true);
    }else if (email === "") {
      setEmailAlert(true);
    } else if (username === "") {
      setUsernameAlert(true);
    } else if (password === "") {
      setPasswordAlert(true);
    } else {
      dispatch(
        registerThunk({
          firstName: firstname,
          lastName: lastname,
          username: username,
          email: email,
          password: password,
          role: role,
        })
      );
    }
    if (errorRegister) {
      setErrorRegisterAlert(true);
    }
  };
  const navigate = useNavigate();
  if (currentUser) {
    navigate("/profile");
  }


  return (
    <>
      <div className="text-center">
        <h2>Register!</h2>
        <h6>Fields marked with * are mandatory.</h6>
      </div>
      <Alert
        variant="danger"
        onClose={() => setFirstNameAlert(false)}
        className={firstNameAlert ? "d-block" : "d-none"}
        dismissible
      >
        <span>Please enter a first name!</span>
      </Alert>
      <Alert
        variant="danger"
        onClose={() => setLastNameAlert(false)}
        className={lastNameAlert ? "d-block" : "d-none"}
        dismissible
      >
        <span>Please enter a last name!</span>
      </Alert>
      <Alert
        variant="danger"
        onClose={() => setEmailAlert(false)}
        className={emailAlert ? "d-block" : "d-none"}
        dismissible
      >
        <span>Please enter an email!</span>
      </Alert>
      <Alert
        variant="danger"
        onClose={() => setUsernameAlert(false)}
        className={usernameAlert ? "d-block" : "d-none"}
        dismissible
      >
        <span>Please enter a username!</span>
      </Alert>
      <Alert
        variant="danger"
        onClose={() => setPasswordAlert(false)}
        className={passwordAlert ? "d-block" : "d-none"}
        dismissible
      >
        <span>Please enter a password!</span>
      </Alert>
      <Alert
        variant="danger"
        onClose={() => setErrorRegisterAlert(false)}
        className={errorRegister ? "d-block" : "d-none"}
        dismissible
      >
        <Alert.Heading>Username must be unique and this username is already taken!</Alert.Heading>
        <span>Please enter another username.</span>
      </Alert>

      {currentUser && <h1>Welcome user: {currentUser.username}</h1>}

      <Form className="form-container">

          <Form.Group className="mb-3" controlId="registerFirstName">
            <Form.Label>First Name *</Form.Label>
            <Form.Control
              type="text"
              placeholder="Tim"
              value={firstname}
              onChange={(event) => setFirstname(event.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="registerLastName">
            <Form.Label>Last Name *</Form.Label>
            <Form.Control
              type="text"
              placeholder="Smith"
              value={lastname}
              onChange={(event) => setLastname(event.target.value)}
            />
          </Form.Group>


          <Form.Group className="mb-3" controlId="registerEmail">
          <Form.Label>Email *</Form.Label>
          <Form.Control
            placeholder="tim.smith@gmail.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          </Form.Group>
        

          <Form.Group className="mb-3" controlId="registerUsername">
          <Form.Label>Username *</Form.Label>
          <Form.Control
            placeholder="tim.smith"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
          <Form.Text className={"text-muted"}>
            Username cannot be changed later.
          </Form.Text>
          </Form.Group>

          

          <Form.Group className="mb-3" controlId="registerPassword">
          <Form.Label>Password *</Form.Label>
          <Form.Control
            placeholder="Tim123"
            value={password}
            type={"password"}
            onChange={(event) => setPassword(event.target.value)}
          />
          </Form.Group>

          <Row className="mb-3">
          <Form.Label>Role</Form.Label>
          <Form.Group as={Col} id="registerRoles">
          <Form.Check
            type={"radio"}
            name={"registerRolesRadio"}
            label={`Event-Manager`}
            value={"MUSIC-CREATOR"}
            id={`registerRoleCreator`}
            checked={role === "MUSIC-CREATOR"}
            onChange={(event) => setRole(event.target.value)}
          />
          </Form.Group>
          <Form.Group as={Col} id="registerRoles">
          <Form.Check
            type={"radio"}
            name={"registerRolesRadio"}
            label={`Content Viewer`}
            value={"CONTENT-VIEWER"}
            id={`registerContentViewer`}
            checked={role === "CONTENT-VIEWER"}
            onChange={(event) => setRole(event.target.value)}
          />
          </Form.Group>
          <Form.Group as={Col} id="registerRoles">
          <Form.Check
            type={"radio"}
            name={"registerRolesRadio"}
            label={`Admin`}
            value={"ADMIN"}
            id={`registerRoleAdmin`}
            checked={role === "ADMIN"}
            onChange={(event) => setRole(event.target.value)}
          />
          </Form.Group>
          </Row>
          <Form.Text>
          Already have an account? <Link to={"/login"}>Login</Link>.
          </Form.Text>

          <Button
          className={"w-100 mt-3"}
          variant="primary"
          onClick={() => handleRegisterBtn()}
          >
          Create an account
          </Button>
        </Form>
        </>
  );





};
export default Register;