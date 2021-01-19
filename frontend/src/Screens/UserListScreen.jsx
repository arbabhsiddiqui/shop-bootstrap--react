import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";

import { listUsers, DeleteUser } from "../actions/userAction";

const UserListScreen = ({ history }) => {
  const dispatch = useDispatch();

  const userList = useSelector((state) => state.userList);
  const { error, users, loading } = userList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const deleteUser = useSelector((state) => state.deleteUser);
  const { success: successDelete } = deleteUser;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, userInfo, successDelete]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you Sure")) {
      dispatch(DeleteUser(id));
    }
  };

  return (
    <>
      <h1>Users List</h1>
      {successDelete && (
        <Message variant="success">User Deleted Successfully</Message>
      )}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>Admin</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.isAdmin === true ? "ADMIN" : "USER"}</td>
                <td>
                  <LinkContainer to={`user/${user._id}/edit`}>
                    <Button variant="light">Edit</Button>
                  </LinkContainer>
                  <Button
                    variant="danger"
                    onClick={() => {
                      deleteHandler(user._id);
                    }}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default UserListScreen;
