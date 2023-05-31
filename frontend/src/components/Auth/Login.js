import React, { useState, useEffect } from "react";

import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCheckbox,
  MDBNavbarLink,
  MDBRow,
  MDBCol,
} from "mdb-react-ui-kit";
import { LOGIN } from "../../Apollo/Queries/User.Queries";
import AuthContext from "../../context/auth-context";
import { useLazyQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";

const LoginComponent = ({ onSwitchComponent }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loginQuery, { loading, error, data }] = useLazyQuery(LOGIN);
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleSwitch = () => {
    onSwitchComponent();
  };

  const handleLogIn = () => {
    loginQuery({ variables: { email, password } })
      .then((response) => {
        const { data } = response;
        if (data && data.login) {
          const { token, userId } = data.login;
          authContext.login(token, userId); // Set token and userId in the authContext
          navigate("/home");
          console.log("WHY SPO NAVIGATE HOME");
        } else {
          setErrorMessage("Email or password incorrect");
        }
      })
      .catch((error) => {
        console.error("Login error:", error);
        setErrorMessage("An error occurred during login.");
      });
  };

  useEffect(() => {
    if (error) {
      setErrorMessage("Email or password incorrect");
    } else {
      setErrorMessage("");
    }
  }, [error]);

  return (
    <MDBContainer fluid>
      <MDBRow className="d-flex justify-content-center align-items-center h-100">
        <MDBCol col="12">
          <MDBCard
            className="bg-white my-5 mx-auto"
            style={{ borderRadius: "1rem", maxWidth: "500px" }}
          >
            <MDBCardBody className="p-5 w-100 d-flex flex-column">
              <h2 className="fw-bold mb-2 text-center">Sign in</h2>
              <p className="text-white-50 mb-3">
                Please enter your login and password!
              </p>

              <MDBInput
                wrapperClass="mb-4 w-100"
                label="Email address"
                id="formControlLgEmail"
                type="email"
                size="lg"
                value={email}
                onChange={handleEmailChange}
              />
              <MDBInput
                wrapperClass="mb-4 w-100"
                label="Password"
                id="formControlLgPassword"
                type="password"
                size="lg"
                value={password}
                onChange={handlePasswordChange}
              />
              {errorMessage && (
                <div style={{ color: "red" }}>{errorMessage}</div>
              )}
              <MDBBtn size="lg" onClick={handleLogIn}>
                Login
              </MDBBtn>

              <MDBBtn onClick={handleSwitch} size="lg">
                Register
              </MDBBtn>
              <hr className="my-4" />
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default LoginComponent;
