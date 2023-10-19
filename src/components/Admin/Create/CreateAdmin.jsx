import React, { useState } from "react";
import { Col, Button, Row, Container, Card, Form, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAdmin } from "../../../slices/adminSlice";
import NavbarAdmin from "../NavbarAdmin/NavbarAdmin";
import Sidebar from "../../Sidebar/Sidebar";
import css from "../Edit/Edit.module.css";
import { useSelector } from "react-redux";

export default function CreateAdmin() {
  window.document.title = "Registro";
  let admin = useSelector((state) => state.persistedReducer.admin);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleCreateAdmin = async (event) => {
    event.preventDefault();
    try {
      await axios({
        headers: {
          Authorization: `Bearer ${admin.token}`,
        },
        method: "post",
        url: `${process.env.REACT_APP_API_BASE_URL}/admin`,
        data: { firstname: firstName, lastname: lastName, email, password },
      });
      navigate("/admin/admins");
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  return (
    <>
      <NavbarAdmin />
      <Sidebar />
      <Row className="p-0 m-0">
        <Col xs={2}></Col>
        <Col xs={10} className="p-0">
          <Container fluid id={css["background"]}>
            <Row id={css["content"]} className="d-flex justify-content-center align-items-center">
              <Col xs={11} sm={8} md={6} xl={4}>
                <Card className="px-4">
                  {error && (
                    <Alert variant="danger" onClose={() => setError(false)} dismissible>
                      <p>No se pudo crear el administrador</p>
                    </Alert>
                  )}
                  <Card.Body>
                    <div className="mb-2">
                      <h2 className="mb-2 text-center ">Crear Administrador</h2>
                      <div className="mb-2">
                        <Form onSubmit={handleCreateAdmin}>
                          <Form.Group className="mb-2" controlId="FirstName">
                            <Form.Label className="text-center">Nombre</Form.Label>
                            <Form.Control
                              type="text"
                              value={firstName}
                              name="firstname"
                              onChange={(event) => setFirstName(event.target.value)}
                              placeholder="Juan"
                            />
                          </Form.Group>
                          <Form.Group className="mb-2" controlId="LastName">
                            <Form.Label>Apellido</Form.Label>
                            <Form.Control
                              type="text"
                              value={lastName}
                              name="lastname"
                              onChange={(event) => setLastName(event.target.value)}
                              placeholder="Pérez"
                            />
                          </Form.Group>
                          <Form.Group className="mb-2" controlId="email">
                            <Form.Label className="text-center">Email</Form.Label>
                            <Form.Control
                              type="email"
                              value={email}
                              name="email"
                              onChange={(event) => setEmail(event.target.value)}
                              placeholder="juan@gmail.com"
                            />
                          </Form.Group>
                          <Form.Group className="mb-2" controlId="password">
                            <Form.Label className="text-center">Contraseña</Form.Label>
                            <Form.Control
                              type="password"
                              value={password}
                              name="password"
                              onChange={(event) => setPassword(event.target.value)}
                              placeholder="Ingrese contraseña"
                            />
                          </Form.Group>
                          <Form.Group className="mb-2" controlId="buttonsubmit">
                            <div className="d-grid">
                              <Button type="submit" className={css.adminButton}>
                                Crear
                              </Button>
                            </div>
                          </Form.Group>
                        </Form>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <Card.Body />
          </Container>
        </Col>
      </Row>
    </>
  );
}
