import { React, useState } from "react";
import { useParams } from "react-router-dom";
import { Col, Button, Row, Container, Card, Form, Alert, InputGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import PageNavbar from "../../PageNavbar/PageNavbar";
import css from "./Reset_Pass_2.module.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../../slices/usersSlice";

//import { GoogleOAuthProvider } from "@react-oauth/google";

export default function Reset_2() {
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [validated, setValidated] = useState(false);
  const [buttonText, setButtonText] = useState(<span className="text-white fs-5">Confimar</span>);
  const [alert, setAlert] = useState(null);
  const { token } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleReserPassword = async (event) => {
    event.preventDefault();
    if (password === "" || password !== password2) {
      setValidated(true);
    } else {
      setButtonText(
        <span
          className="spinner-border spinner-border text-white"
          role="status"
          aria-hidden="true"
        ></span>,
      );
      try {
        console.log(token);
        const response = await axios({
          method: "put",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          url: `${process.env.REACT_APP_API_BASE_URL}/users/resetpassword`,
          data: {
            password,
          },
        });
        dispatch(setUser({ token: response.data.token, ...response.data.user }));
        navigate("/");
      } catch (err) {
        console.log(err);
        setAlert({ type: "danger", msg: "Correo incorrecto" });
        setButtonText(<span className="text-white fs-4">Enviar</span>);
      }
    }
  };

  return (
    <>
      <PageNavbar />
      <Container
        fluid
        id={css["background"]}
        className="d-flex justify-content-center align-items-center"
      >
        <Row id="content">
          <Col>
            <Card className=" px-4">
              {alert && (
                <Alert variant={alert.type} onClose={() => setAlert(null)} dismissible>
                  <p>{alert.msg}</p>
                </Alert>
              )}
              <Card.Body>
                <div>
                  <h1 className="mb-3 text-center fs-3">Restablecer Contraseña</h1>
                  <Form
                    noValidate
                    validated={validated}
                    className="mb-3"
                    onSubmit={handleReserPassword}
                  >
                    <Form.Group className="mb-3">
                      <Form.Label className="text-center">Nueva Contraseña</Form.Label>
                      <InputGroup hasValidation className={css.inputpass}>
                        <Form.Control
                          type="password"
                          value={password}
                          onChange={(event) => setPassword(event.target.value)}
                          className={`form-control `}
                          required
                        />
                      </InputGroup>
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label className="text-center">Confirmar Contraseña</Form.Label>
                      <InputGroup hasValidation className={css.inputpass}>
                        <Form.Control
                          type="password"
                          value={password2}
                          onChange={(event) => setPassword2(event.target.value)}
                          className={`form-control `}
                          required
                        />
                        {password !== "" && (
                          <Form.Control.Feedback as={"small"} type="invalid">
                            Las contraseñas no coinciden
                          </Form.Control.Feedback>
                        )}
                      </InputGroup>
                    </Form.Group>

                    <div className="mt-3 d-grid">
                      <Button id={css["button"]} type="submit">
                        {buttonText}
                      </Button>
                    </div>
                  </Form>
                  <div className="mt-1">
                    <p className="mb-0 text-center">
                      <Link to="/login" className={css.link}>
                        Volver a intentar iniciar sesión
                      </Link>
                    </p>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
