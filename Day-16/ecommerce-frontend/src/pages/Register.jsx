import { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import "../assets/styles/RegisterStylings.css";
import { toast, ToastContainer } from "react-toastify";
function Register() {
  const [validated, setValidated] = useState(false);

  const [details, setDetails] = useState({
    FName: "",
    LName: "",
    Username: "",
    Password: "",
    dob: "",
    gender: "",
    city: "",
    state: "",
    zip: "",
  });

  const handleChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === true) {
      event.stopPropagation();
      console.log(details);
      toast.success("Register Successfully");
    } else {
      toast.error("fill all required fields to Register ");
    }
    setValidated(true);
  };

  return (
    <div id="register-form-container">
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} md="4" controlId="validationCustom01">
            <Form.Label>First name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="First name"
              
              name="FName"
              onChange={handleChange}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationCustom02">
            <Form.Label>Last name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Last name"
         
              name="LName"
              onChange={handleChange}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationCustomUsername">
            <Form.Label>Username</Form.Label>
            <InputGroup hasValidation>
              <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Username"
                aria-describedby="inputGroupPrepend"
                required
                name="Username"
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">
                Please choose a username.
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
        </Row>

        <Row>
          <Form.Group as={Col}>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="Password"
              onChange={handleChange}
              placeholder="admin@123"
              required
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid Password.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label>Date Of Birth</Form.Label>
            <Form.Control
              type="date"
              name="dob"
              onChange={handleChange}
              required
            />
            <Form.Control.Feedback type="invalid">
              Choose valid DOB.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="col-5">
            <Form.Label>Gender</Form.Label>

            <div key={`inline-radio`} className="mb-3">
              <Form.Check
                inline
                type="radio"
                label="Male"
                id={`inline-radio-1`}
                name="gender"
                onChange={handleChange}
                required
              />

              <Form.Check
                inline
                type="radio"
                label="Female"
                id={`inline-radio-2`}
                name="gender"
                onChange={handleChange}
                required
              />

              <Form.Check
                inline
                type="radio"
                label="Others"
                id={`inline-radio-3`}
                name="gender"
                onChange={handleChange}
                required
              />
            </div>
            <Form.Control.Feedback type="invalid">
              Choose valid DOB.
            </Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="validationCustom03">
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              name="city"
              onChange={handleChange}
              placeholder="City"
              required
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid city.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="3" controlId="validationCustom04">
            <Form.Label>State</Form.Label>
            <Form.Control
              type="text"
              name="state"
              onChange={handleChange}
              placeholder="State"
              required
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid state.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="3" controlId="validationCustom05">
            <Form.Label>Zip</Form.Label>
            <Form.Control
              type="text"
              name="zip"
              onChange={handleChange}
              placeholder="Zip"
              required
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid zip.
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Form.Group className="mb-3">
          <Form.Check
            required
            label="Agree to terms and conditions"
            feedback="You must agree before submitting."
            feedbackType="invalid"
          />
        </Form.Group>
        <Button type="submit">Submit form</Button>
      </Form>

      <ToastContainer />
    </div>
  );
}

export default Register;
