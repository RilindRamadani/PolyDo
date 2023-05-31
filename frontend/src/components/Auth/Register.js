import React, { useState } from "react";
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBBtn,
} from "mdb-react-ui-kit";
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../../Apollo/Mutations/User.Mutations";
import { displayNotification } from "../../Errors/notificationError";
import { ToastContainer } from "react-toastify";

const RegisterComponent = ({ onSwitchComponent }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [errorMessages, setErrorMessages] = useState({});

  const handleSwitch = () => {
    onSwitchComponent();
  };

  //Apollo API calls
  const [createUser, { createUserLoading, createUserError, createUserData }] =
    useMutation(CREATE_USER);

  const handleCreateUser = (username, email, password, firstName, lastName) => {
    createUser({
      variables: { username, email, password, firstName, lastName },
    })
      .then((newUser) => {
        console.log(newUser.data?.createUser);
        displayNotification("User Created successfully.", false);
      })
      .catch((error) => {
        displayNotification(error.message, true);
      });
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const formValidation = () => {
    const errors = {};

    // Validate the input values
    if (
      !username ||
      !email ||
      !password ||
      !confirmPassword ||
      !firstName ||
      !lastName
    ) {
      errors.emptyValues = "All fields must be provided";
    }

    if (firstName.length < 4) {
      errors.firstNameError = "First name must be at least 4 characters";
    }

    if (lastName.length < 4) {
      errors.lastNameError = "Last name must be at least 4 characters";
    }

    if (username.length <= 6) {
      errors.userNameError = "Username must be longer than 6 characters.";
    }

    // Username uniqueness validation
    if (
      username.toLowerCase() === firstName.toLowerCase() ||
      username.toLowerCase() === lastName.toLowerCase()
    ) {
      errors.userNameError =
        "Username cannot be the same as the first name or last name.";
    }

    // const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
    // if (!password.match(passwordPattern)) {
    //   errors.passwordError =
    //     "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one digit.";
    // }

    if (password !== confirmPassword) {
      errors.passwordError = "Passwords do not match.";
    }

    setErrorMessages(errors);

    if (Object.entries(errors).length === 0) {
      return true;
    }

    return false;
  };

  const submitHandler = (e) => {
    e.preventDefault();

    // const formIsValid = formValidation();
    // if (formIsValid) {
    //   handleCreateUser(username, email, password, firstName, lastName);
    // }

    // handleCreateUser(username, email, password, firstName, lastName);
  };

  return (
    <MDBContainer
      fluid
      className="d-flex align-items-center justify-content-center bg-image"
      style={{
        backgroundImage:
          "url(https://images.blocksurvey.io/templates/right-to-left-registration-form-in-urdu-language.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <MDBCard className="m-3" style={{ maxWidth: "320px" }}>
        <MDBCardBody className="px-3">
          <h2 className="text-uppercase text-center mb-4">Create an account</h2>
          <form onSubmit={submitHandler}>
            {errorMessages.firstNameError && (
              <div className="text-danger">{errorMessages.firstNameError}</div>
            )}
            <MDBInput
              wrapperClass="mb-2"
              label="Your First Name"
              size="md"
              id="form2"
              type="text"
              value={firstName}
              onChange={handleFirstNameChange}
            />

            {errorMessages.lastNameError && (
              <div className="text-danger">{errorMessages.lastNameError}</div>
            )}
            <MDBInput
              wrapperClass="mb-2"
              label="Your Last Name"
              size="md"
              id="form2"
              type="text"
              value={lastName}
              onChange={handleLastNameChange}
            />

            {errorMessages.userNameError && (
              <div className="text-danger">{errorMessages.userNameError}</div>
            )}
            <MDBInput
              wrapperClass="mb-2"
              label="Your Username"
              size="md"
              id="form1"
              type="text"
              value={username}
              onChange={handleUsernameChange}
            />

            <MDBInput
              wrapperClass="mb-2"
              label="Your Email"
              size="md"
              id="form2"
              type="email"
              value={email}
              onChange={handleEmailChange}
            />

            {errorMessages.passwordError && (
              <div className="text-danger">{errorMessages.passwordError}</div>
            )}
            <MDBInput
              wrapperClass="mb-2"
              label="Password"
              size="md"
              id="form3"
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />

            <MDBInput
              wrapperClass="mb-2"
              label="Repeat your password"
              size="md"
              id="form4"
              type="password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />

            {errorMessages.emptyValues && (
              <div className="text-danger">{errorMessages.emptyValues}</div>
            )}
            <MDBBtn
              className="mb-3 w-100 gradient-custom-4"
              size="md"
              type="submit"
            >
              Register
            </MDBBtn>

            <MDBBtn
              className="mb-3 w-100 gradient-custom-4"
              size="md"
              onClick={handleSwitch}
            >
              Login
            </MDBBtn>
          </form>
        </MDBCardBody>
      </MDBCard>
      <ToastContainer />
    </MDBContainer>
  );
};

export default RegisterComponent;
