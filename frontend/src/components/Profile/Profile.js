import React from "react";
import {
  MDBCard,
  MDBInput,
  MDBCardBody,
  MDBCardTitle,
  MDBBtn,
} from "mdb-react-ui-kit";
import { useState } from "react";

const UserProfile = ({}) => {
  //TODO: Get user profile from the req.userI

  const user = {
    name: "Rilind",
    lastName: "Ramadani",
    email: "rilind@gmail.com",
    username: "Rilind",
  };
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [age, setAge] = useState(user.age);

  const handleSave = () => {
    // Create an updatedUser object with the edited values
    const updatedUser = {
      ...user,
      name,
      email,
      age,
    };

    // Call the onSave callback with the updatedUser object
  };

  return (
    <MDBCard style={{ maxWidth: "300px" }}>
      <MDBCardBody>
        <MDBCardTitle>Edit Profile</MDBCardTitle>
        <MDBInput
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <MDBInput
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <MDBInput
          label="Username"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        {/* Add more editable fields as needed */}
        <MDBBtn onClick={handleSave}>Save Changes</MDBBtn>
      </MDBCardBody>
    </MDBCard>
  );
};

export default UserProfile;
