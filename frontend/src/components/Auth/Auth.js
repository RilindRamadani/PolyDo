import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";

import React, { useState } from "react";

const SignUpAndLogin = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const handleSignUp = (e) => {
    e.preventDefault();
    // Perform sign-up logic here, e.g., sending data to the server
    // You can access the form data using the component's state values
    console.log("Sign up:", username, email, password, firstName, lastName);
    setLoggedIn(true);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // Perform login logic here, e.g., sending data to the server
    // You can access the form data using the component's state values
    console.log("Login:", username, password);
    setLoggedIn(true);
  };

  if (loggedIn) {
    return (
      <div>
        <h2>Welcome, {username}!</h2>
        {/* Add your logged-in component here */}
      </div>
    );
  }

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSignUp}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <label>
          First Name:
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </label>
        <br />
        <label>
          Last Name:
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Sign Up</button>
      </form>

      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default SignUpAndLogin;
