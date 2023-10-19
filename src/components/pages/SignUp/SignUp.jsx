import React, { useState } from "react";
import { Col, Button, Row, Container, Card, Form, Alert } from "react-bootstrap";
import PageNavbar from "../../PageNavbar/PageNavbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../../../slices/usersSlice";
import css from "./SignUp.module.css";

export default function SignUp() {
  window.document.title = "Registro";
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignUp = async (event) => {
    event.preventDefault();
    let formdata = new FormData(event.target);
    try {
      const response = await axios({
        headers: {
          "Content-Type": "multipart/form-data",
        },
        method: "post",
        url: `${process.env.REACT_APP_API_BASE_URL}/users`,
        data: formdata,
      });
      dispatch(setUser({ token: response.data.token, ...response.data.user }));
      navigate("/");
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  return (
    <>
      <PageNavbar />
      <Container fluid id={css["background"]}>
        <Row id="content" className="py-3 d-flex justify-content-center align-items-center">
          <Col xs={11} sm={8} md={6} xl={4}>
            <Card className="px-4">
              {error && (
                <Alert variant="danger" onClose={() => setError(false)} dismissible>
                  <p>No se pudo crear el usuario</p>
                </Alert>
              )}
              <Card.Body>
                <div className="mb-2">
                  <h2 className="mb-2 text-center ">Registro</h2>
                  <div className="mb-2">
                    <Form onSubmit={handleSignUp}>
                      <div className="d-flex">
                        <Form.Group className={`mb-2 pe-1 w-50 ${css.form}`} controlId="FirstName">
                          <Form.Label className="text-center">Nombre</Form.Label>
                          <Form.Control
                            type="text"
                            value={firstName}
                            name="firstname"
                            onChange={(event) => setFirstName(event.target.value)}
                            placeholder="Juan"
                          />
                        </Form.Group>
                        <Form.Group className={`mb-2 ps-1 w-50 ${css.form}`} controlId="LastName">
                          <Form.Label>Apellido</Form.Label>
                          <Form.Control
                            type="text"
                            value={lastName}
                            name="lastname"
                            onChange={(event) => setLastName(event.target.value)}
                            placeholder="Pérez"
                          />
                        </Form.Group>
                      </div>
                      <div className="d-flex">
                        <Form.Group className={`mb-2 pe-1 ${css.form}`} controlId="email">
                          <Form.Label className="text-center">Email</Form.Label>
                          <Form.Control
                            type="email"
                            value={email}
                            name="email"
                            onChange={(event) => setEmail(event.target.value)}
                            placeholder="juan@gmail.com"
                          />
                        </Form.Group>
                        <Form.Group className={`mb-2 ps-1 ${css.form}`} controlId="phone">
                          <Form.Label className="text-center">Celular</Form.Label>
                          <Form.Control
                            type="text"
                            value={phone}
                            name="phone"
                            onChange={(event) => setPhone(event.target.value)}
                            placeholder="09*******"
                          />
                        </Form.Group>
                      </div>
                      <Form.Group className={`mb-2 ${css.form}`} controlId="address">
                        <Form.Label className="text-center">Dirección</Form.Label>
                        <Form.Control
                          type="text"
                          value={address}
                          name="address"
                          onChange={(event) => setAddress(event.target.value)}
                          placeholder="2023 Calle Cielo, Maldonado, Uruguay"
                        />
                      </Form.Group>
                      <Form.Group className={`mb-2 ${css.form}`} controlId="password">
                        <Form.Label className="text-center">Contraseña</Form.Label>
                        <Form.Control
                          type="password"
                          value={password}
                          name="password"
                          onChange={(event) => setPassword(event.target.value)}
                          placeholder="Ingrese contraseña"
                        />
                      </Form.Group>
                      <Form.Group controlId="formFile" className={`mb-2 ${css.form}`}>
                        <Form.Label>Adjuntar Foto</Form.Label>
                        <Form.Control
                          type="file"
                          value={avatar}
                          name="avatar"
                          accept="image/*"
                          onChange={(event) => setAvatar(event.target.value)}
                        />
                      </Form.Group>
                      <Form.Group className={`mb-2`} controlId="buttonsubmit">
                        <div className="d-grid">
                          <Button type="submit" id={css["button"]}>
                            Create Account
                          </Button>
                        </div>
                      </Form.Group>

                      <div className="mt-2">
                        <p className="mb-0  text-center">
                          Already have an account?{" "}
                          <a href="/login" className="">
                            Sign In
                          </a>
                        </p>
                      </div>
                      {/*   </Form.Group>
                </Form.Group>
              </Form.Group> */}
                    </Form>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
          {/*   
        </div> */}
        </Row>
        <Card.Body />
        {/*  </div> */}
      </Container>
    </>
  );
}
