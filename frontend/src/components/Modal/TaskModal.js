import React, { useState } from "react";
import {
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter,
  MDBBtn,
} from "mdbreact";

const NewTaskModal = ({ isOpen, toggleModal, performApiCall }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [listId, setListId] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Perform your API call here using the input values
    performApiCall(title, description, dueDate, listId);
    // Reset the input values
    setTitle("");
    setDescription("");
    setDueDate("");
    setListId("");
    // Close the modal
    toggleModal();
  };

  return (
    <MDBModal isOpen={isOpen} toggle={toggleModal} centered>
      <MDBModalHeader toggle={toggleModal}>Create Item</MDBModalHeader>
      <MDBModalBody>
        <form onSubmit={handleFormSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              className="form-control"
              id="description"
              rows="3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="dueDate">Due Date</label>
            <input
              type="date"
              className="form-control"
              id="dueDate"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="listId">List ID</label>
            <input
              type="text"
              className="form-control"
              id="listId"
              value={listId}
              onChange={(e) => setListId(e.target.value)}
            />
          </div>
          <MDBBtn color="primary" type="submit">
            Perform API Call
          </MDBBtn>
        </form>
      </MDBModalBody>
      <MDBModalFooter>
        <MDBBtn color="secondary" onClick={toggleModal}>
          Close
        </MDBBtn>
      </MDBModalFooter>
    </MDBModal>
  );
};

export default NewTaskModal;
