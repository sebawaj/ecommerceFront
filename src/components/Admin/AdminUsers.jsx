import React from "react";
import css from "./Admin.module.css";
import Table from "react-bootstrap/Table";
import { useState, useEffect } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Sidebar from "../Sidebar/Sidebar";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import NavbarAdmin from "./NavbarAdmin/NavbarAdmin";
import { useSelector } from "react-redux";

const AdminUsers = () => {
  let admin = useSelector((state) => state.persistedReducer.admin);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await axios({
          method: "get",
          url: `${process.env.REACT_APP_API_BASE_URL}/users`,
        });
        setUsers(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUsers();
  }, []);

  const handleDeleteUser = async (user) => {
    try {
      await axios({
        method: "delete",
        headers: {
          Authorization: `Bearer ${admin.token}`,
        },
        url: `${process.env.REACT_APP_API_BASE_URL}/users/${user.id}`,
      });
      setUsers(users.filter((u) => u.id !== user.id));
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  return (
    <>
      <NavbarAdmin />
      <Container className="p-0" fluid id={css["backgroundAdminLogin"]}>
        <Sidebar />
        <Row className="m-0">
          <div className="col-2"></div>

          <div className={`${css.backgroundTop} col-10 px-4`}>
            <div className={css.header}>
              <h2 className={css.tituloContainer}>Panel de Usuarios</h2>
            </div>

            <div className={css.tableProducts}>
              <Table striped bordered hover className={`${css.table} mt-2`}>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Email</th>
                    <th>Dirección</th>
                    <th>Teléfono</th>
                    <th>Avatar</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => {
                    return (
                      <tr key={index}>
                        <td>{user.id}</td>
                        <td>{user.firstname}</td>
                        <td>{user.lastname}</td>
                        <td>{user.email}</td>
                        <td>{user.address}</td>
                        <td>{user.phone}</td>
                        <td>
                          {
                            <img
                              src={process.env.REACT_APP_API_BASE_IMG_URL + `/${user.avatar}`}
                              alt=""
                              className={css.userAvatar}
                            />
                          }
                        </td>
                        <td>
                          {" "}
                          <Link
                            to={`/admin/editUser/${user.id}`}
                            className="text-decoration-none text-light btn btn-warning"
                          >
                            Editar{" "}
                          </Link>
                          <Button
                            className="buttons"
                            variant="danger"
                            onClick={() => handleDeleteUser(user)}
                          >
                            Eliminar{" "}
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </div>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default AdminUsers;
