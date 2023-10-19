import React from "react";
import { Table, Button, Container, Row } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../Sidebar/Sidebar";

import { Link } from "react-router-dom";
import NavbarAdmin from "./NavbarAdmin/NavbarAdmin";
import css from "./Admin.module.css";
import { useSelector } from "react-redux";

const AdminAdmins = () => {
  const Logadmin = useSelector((state) => state.persistedReducer.admin);
  const [admins, setAdmins] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const getAdmins = async () => {
      try {
        const response = await axios({
          method: "get",
          url: `${process.env.REACT_APP_API_BASE_URL}/admin`,
          headers: {
            Authorization: `Bearer ${Logadmin.token}`,
          },
        });
        setAdmins(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getAdmins();
  }, []);

  const handleDeleteAdmin = async (admin) => {
    try {
      await axios({
        method: "delete",
        url: `${process.env.REACT_APP_API_BASE_URL}/admin/${admin.id}`,
        headers: {
          Authorization: `Bearer ${Logadmin.token}`,
        },
      });
      setAdmins(admins.filter((adm) => adm.id !== admin.id));
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
              <h2 className={css.tituloContainer}>Panel de Adminsitradores</h2>
              <Link
                to="/admin/createAdmin"
                className={`text-decoration-none text-light btn ms-4 mb-2 ${css.adminButton}`}
              >
                Agregar administrador
              </Link>
            </div>

            <div className={css.tableProducts}>
              <Table striped bordered hover className={`${css.table} mt-2`}>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Email</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {admins.map((admin, index) => {
                    return (
                      <tr key={index}>
                        <td>{admin.id}</td>
                        <td>{admin.firstname}</td>
                        <td>{admin.lastname}</td>
                        <td>{admin.email}</td>
                        <td>
                          <Button
                            className="buttons"
                            variant="danger"
                            onClick={() => handleDeleteAdmin(admin)}
                          >
                            Eliminar
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

export default AdminAdmins;
