import React, { useState } from "react";
import {
  MDBNavbar,
  MDBContainer,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBCollapse,
  MDBNavbarNav,
  MDBIcon,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter,
  MDBBtn,
  MDBModalDialog,
  MDBModalContent,
  MDBModalTitle,
  MDBCol,
  MDBRow,
  MDBInput,
} from "mdb-react-ui-kit";
import {
  CREATE_TASK,
  ADD_SUBTASK,
} from "../../../Apollo/Mutations/Task.Mutations";
import AuthContext from "../../../context/auth-context";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { displayNotification } from "../../../Errors/notificationError";

const MainNavigation = () => {
  const [showNavNoTogglerThird, setShowNavNoTogglerThird] = useState(false);
  const navigate = useNavigate();
  const [
    createTaskMutation,
    { loading: createTaskLoading, error: createTaskError },
  ] = useMutation(CREATE_TASK);
  const [
    addSubtaskMutation,
    { loading: addSubtaskLoading, error: addSubtaskError },
  ] = useMutation(ADD_SUBTASK);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [listId, setListId] = useState("");
  const [parentId, setParentId] = useState("");

  const [newTaskModal, setNewTaskModal] = useState(false);
  const [newSubTaskModal, setNewSubTaskModal] = useState(false);

  const toggleShowNewTask = () => setNewTaskModal(!newTaskModal);
  const toggleShowNewSubTask = () => setNewSubTaskModal(!newSubTaskModal);

  const handleLogout = (authContext) => {
    authContext.logout();
    navigate("/auth");
  };
  const resetState = () => {
    setTitle("");
    setDescription("");
    setDueDate("");
    setListId("");
  };

  const handleNewTask = () => {
    const date = new Date(dueDate);

    handleCreateTask(date);

    resetState();
    toggleShowNewTask();
  };

  const handleNewSubTask = () => {
    const date = new Date(dueDate);

    //TODO: Validate for empty inputs
    handleCreateSubtask(date);

    resetState();
    setParentId("");
    toggleShowNewSubTask();
  };

  const handleCreateTask = (date) => {
    createTaskMutation({
      variables: {
        title: title,
        description: description,
        dueDate: date,
        listId: listId,
      },
    })
      .then((result) => {
        const updatedUser = result.data?.createdTask;
        //user returned like on user.mutation
        console.log(updatedUser);
        displayNotification("User updated successfully", false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleCreateSubtask = (date) => {
    addSubtaskMutation({
      variables: {
        parentId: parentId,
        title: title,
        description: description,
        dueDate: date,
      },
    })
      .then((result) => {
        const updateTask = result.data?.addSubTask;
        //user returned like on user.mutation
        console.log(updateTask);
        displayNotification("Subtask Added successfully", false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <AuthContext.Consumer>
        {(context) => {
          return (
            <>
              <MDBNavbar expand="lg" light bgColor="light">
                <MDBContainer fluid>
                  <MDBNavbarToggler
                    type="button"
                    data-target="#navbarTogglerDemo03"
                    aria-controls="navbarTogglerDemo03"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                    onClick={() =>
                      setShowNavNoTogglerThird(!showNavNoTogglerThird)
                    }
                  >
                    <MDBIcon icon="bars" fas />
                  </MDBNavbarToggler>

                  <MDBNavbarBrand onClick={() => handleLogout(context)}>
                    Logout
                  </MDBNavbarBrand>
                  <MDBCollapse navbar show={showNavNoTogglerThird}>
                    <MDBNavbarNav className="mr-auto mb-2 mb-lg-0">
                      <MDBNavbarItem>
                        <MDBNavbarLink active aria-current="page" href="/home">
                          Home
                        </MDBNavbarLink>
                      </MDBNavbarItem>

                      <MDBNavbarItem>
                        <MDBNavbarLink
                          active
                          aria-current="page"
                          onClick={toggleShowNewTask}
                        >
                          Task
                        </MDBNavbarLink>
                      </MDBNavbarItem>

                      <MDBNavbarItem>
                        <MDBNavbarLink
                          active
                          aria-current="page"
                          onClick={toggleShowNewSubTask}
                        >
                          Subtask
                        </MDBNavbarLink>
                      </MDBNavbarItem>
                      <MDBNavbarItem>
                        <MDBNavbarLink
                          active
                          aria-current="page"
                          href="/profile"
                        >
                          Profile
                        </MDBNavbarLink>
                      </MDBNavbarItem>
                    </MDBNavbarNav>
                  </MDBCollapse>
                </MDBContainer>
              </MDBNavbar>

              <MDBModal
                staticBackdrop
                tabIndex="-1"
                show={newTaskModal}
                setShow={setNewTaskModal}
              >
                <MDBModalDialog>
                  <MDBModalContent>
                    <MDBModalHeader>
                      <MDBModalTitle>Create new Task</MDBModalTitle>
                      <MDBBtn
                        className="btn-close"
                        color="none"
                        onClick={toggleShowNewTask}
                      ></MDBBtn>
                    </MDBModalHeader>
                    <MDBModalBody>
                      <form onSubmit={handleNewTask}>
                        <MDBRow>
                          <MDBCol md="6">
                            <label htmlFor="title">Title</label>
                          </MDBCol>
                          <MDBCol md="6">
                            <MDBInput
                              id="title"
                              type="text"
                              value={title}
                              onChange={(e) => setTitle(e.target.value)}
                            />
                          </MDBCol>
                        </MDBRow>
                        <MDBRow>
                          <MDBCol md="6">
                            <label htmlFor="description">Description</label>
                          </MDBCol>
                          <MDBCol md="6">
                            <MDBInput
                              id="description"
                              type="textarea"
                              rows={3}
                              value={description}
                              onChange={(e) => setDescription(e.target.value)}
                            />
                          </MDBCol>
                        </MDBRow>
                        <MDBRow>
                          <MDBCol md="6">
                            <label htmlFor="dueDate">Due Date</label>
                          </MDBCol>
                          <MDBCol md="6">
                            <MDBInput
                              id="dueDate"
                              type="date"
                              value={dueDate}
                              onChange={(e) => setDueDate(e.target.value)}
                            />
                          </MDBCol>
                        </MDBRow>
                        <MDBRow>
                          <MDBCol md="6">
                            <label htmlFor="listId">List ID</label>
                          </MDBCol>
                          <MDBCol md="6">
                            <MDBInput
                              id="listId"
                              type="text"
                              value={listId}
                              onChange={(e) => setListId(e.target.value)}
                            />
                          </MDBCol>
                        </MDBRow>
                      </form>
                    </MDBModalBody>
                    <MDBModalFooter>
                      <MDBBtn color="secondary" onClick={toggleShowNewTask}>
                        Close
                      </MDBBtn>
                      <MDBBtn onClick={handleNewTask}>Okay</MDBBtn>
                    </MDBModalFooter>
                  </MDBModalContent>
                </MDBModalDialog>
              </MDBModal>

              <MDBModal
                staticBackdrop
                tabIndex="-1"
                show={newSubTaskModal}
                setShow={setNewSubTaskModal}
              >
                <MDBModalDialog>
                  <MDBModalContent>
                    <MDBModalHeader>
                      <MDBModalTitle>Create new Task</MDBModalTitle>
                      <MDBBtn
                        className="btn-close"
                        color="none"
                        onClick={toggleShowNewSubTask}
                      ></MDBBtn>
                    </MDBModalHeader>
                    <MDBModalBody>
                      <form onSubmit={handleNewSubTask}>
                        <MDBRow>
                          <MDBCol md="6">
                            <label htmlFor="title">Title</label>
                          </MDBCol>
                          <MDBCol md="6">
                            <MDBInput
                              id="title"
                              type="text"
                              value={title}
                              onChange={(e) => setTitle(e.target.value)}
                            />
                          </MDBCol>
                        </MDBRow>
                        <MDBRow>
                          <MDBCol md="6">
                            <label htmlFor="description">Description</label>
                          </MDBCol>
                          <MDBCol md="6">
                            <MDBInput
                              id="description"
                              type="textarea"
                              rows={3}
                              value={description}
                              onChange={(e) => setDescription(e.target.value)}
                            />
                          </MDBCol>
                        </MDBRow>
                        <MDBRow>
                          <MDBCol md="6">
                            <label htmlFor="dueDate">Due Date</label>
                          </MDBCol>
                          <MDBCol md="6">
                            <MDBInput
                              id="dueDate"
                              type="date"
                              value={dueDate}
                              onChange={(e) => setDueDate(e.target.value)}
                            />
                          </MDBCol>
                        </MDBRow>
                        <MDBRow>
                          <MDBCol md="6">
                            <label htmlFor="listId">List ID</label>
                          </MDBCol>
                          <MDBCol md="6">
                            <MDBInput
                              id="listId"
                              type="text"
                              value={listId}
                              onChange={(e) => setListId(e.target.value)}
                            />
                          </MDBCol>
                        </MDBRow>
                        <MDBRow>
                          <MDBCol md="6">
                            <label htmlFor="listId">Parent ID</label>
                          </MDBCol>
                          <MDBCol md="6">
                            <MDBInput
                              id="listId"
                              type="text"
                              value={parentId}
                              onChange={(e) => setParentId(e.target.value)}
                            />
                          </MDBCol>
                        </MDBRow>
                      </form>
                    </MDBModalBody>
                    <MDBModalFooter>
                      <MDBBtn color="secondary" onClick={toggleShowNewSubTask}>
                        Close
                      </MDBBtn>
                      <MDBBtn onClick={handleNewSubTask}>Okay</MDBBtn>
                    </MDBModalFooter>
                  </MDBModalContent>
                </MDBModalDialog>
              </MDBModal>
            </>
          );
        }}
      </AuthContext.Consumer>
    </>
  );
};

export default MainNavigation;
