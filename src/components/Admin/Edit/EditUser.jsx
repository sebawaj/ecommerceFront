import React, { useState, useEffect } from "react";
import { Col, Button, Row, Container, Card, Form, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";
import NavbarAdmin from "../NavbarAdmin/NavbarAdmin";
import Sidebar from "../../Sidebar/Sidebar";
import css from "./Edit.module.css";
import { useSelector } from "react-redux";
import Loading from "../../Loading/Loading";

export default function EditUser() {
  let admin = useSelector((state) => state.persistedReducer.admin);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios({
          method: "get",
          url: `${process.env.REACT_APP_API_BASE_URL}/users/${id}`,
        });
        setUser(response.data);
        setFirstName(response.data.firstname);
        setLastName(response.data.lastname);
        setEmail(response.data.email);
        setAddress(response.data.address);
        setPhone(response.data.phone);
      } catch (error) {
        console.log(error);
        setError(true);
      }
    };
    getUser();
  }, [id]);

  const handleEditUser = async (event) => {
    event.preventDefault();
    let formdata = new FormData(event.target);
    try {
      await axios({
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${admin.token}`,
        },
        method: "patch",
        url: `${process.env.REACT_APP_API_BASE_URL}/users/${user.id}`,
        data: formdata,
      });
      navigate("/admin/users");
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };
  if (user) {
    return (
      <>
        <NavbarAdmin />
        <Sidebar />
        <Row className="p-0">
          <Col xs={1}></Col>
          <Col xs={11} className="p-0">
            <Container fluid id={css["background"]}>
              <Row id="content" className=" d-flex justify-content-center align-items-center">
                <Col xs={11} sm={8} md={6} xl={4}>
                  <Card className="px-4">
                    {error && (
                      <Alert variant="danger" onClose={() => setError(false)} dismissible>
                        <p>No se pudo editar el usuario</p>
                      </Alert>
                    )}
                    <Card.Body>
                      <div className="mb-3">
                        <h2 className="mb-2 text-center ">Editar Usuario</h2>
                        <div className="mb-3">
                          <Form onSubmit={handleEditUser}>
                            <Form.Group className="mb-3" controlId="EditUser">
                              <Form.Label className="text-center">Nombre</Form.Label>
                              <Form.Control
                                type="text"
                                value={firstName}
                                required
                                name="firstname"
                                onChange={(event) => setFirstName(event.target.value)}
                                placeholder="Juan"
                              />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="LastName">
                              <Form.Label>Apellido</Form.Label>
                              <Form.Control
                                type="text"
                                value={lastName}
                                required
                                name="lastname"
                                onChange={(event) => setLastName(event.target.value)}
                                placeholder="Pérez"
                              />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="email">
                              <Form.Label className="text-center">Email</Form.Label>
                              <Form.Control
                                type="email"
                                value={email}
                                required
                                name="email"
                                onChange={(event) => setEmail(event.target.value)}
                                placeholder="juan@gmail.com"
                              />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="phone">
                              <Form.Label className="text-center">Celular</Form.Label>
                              <Form.Control
                                type="text"
                                value={phone}
                                required
                                name="phone"
                                onChange={(event) => setPhone(event.target.value)}
                                placeholder="09*******"
                              />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="address">
                              <Form.Label className="text-center">Dirección</Form.Label>
                              <Form.Control
                                type="text"
                                value={address}
                                required
                                name="address"
                                onChange={(event) => setAddress(event.target.value)}
                                placeholder="2023 Calle Cielo, Maldonado, Uruguay"
                              />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="buttonsubmit">
                              <div className="d-grid">
                                <Button type="submit" id={css["button"]}>
                                  Confirmar{" "}
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
  } else {
    return <Loading />;
  }
}
