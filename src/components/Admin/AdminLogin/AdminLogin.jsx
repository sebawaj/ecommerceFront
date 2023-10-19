import { React, useState } from "react";
import { Col, Button, Row, Container, Card, Form, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAdmin } from "../../../slices/adminSlice";
import { removeUser } from "../../../slices/usersSlice";
import axios from "axios";
import cssLogin from "./AdminLogin.module.css";
import PageNavbar from "../../PageNavbar/PageNavbar";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios({
        method: "post",
        url: `${process.env.REACT_APP_API_BASE_URL}/admin/tokens`,
        data: {
          email,
          password,
        },
      });
      dispatch(setAdmin({ token: response.data.token, ...response.data.admin }));
      dispatch(removeUser());
      navigate("/admin/dashboard");
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  const handleFill = async (event) => {
    setEmail("admin@1234.com");
    setPassword("1234");
  };

  return (
    <>
      <PageNavbar />
      <Container
        fluid
        id={cssLogin["backgroundAdminLogin"]}
        className="d-flex justify-content-center align-items-center"
      >
        <Row id={cssLogin["content"]}>
          <Col>
            <Card className="px-4">
              {error && (
                <Alert variant="danger" onClose={() => setError(false)} dismissible>
                  <p>No tiene permisos para acceder a Admin</p>
                </Alert>
              )}
              <Card.Body>
                <div>
                  <h2 className="mb-3 text-center">Iniciar Sesión</h2>
                  <form className="mb-3" onSubmit={handleLogin}>
                    <Form.Group className="mb-3">
                      <Form.Label className="text-center">Correo electrónico</Form.Label>
                      <Form.Control
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label className="text-center">Contraseña</Form.Label>
                      <Form.Control
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                      />
                    </Form.Group>

                    <div className="mt-3 d-grid">
                      <Button id={cssLogin["button"]} type="submit">
                        Login
                      </Button>
                    </div>
                  </form>
                  <div className="mt-3">
                    <p className="mb-0  text-center">
                      Necesita accesos para probar admin?
                      <Button onClick={handleFill} id={cssLogin["buttonFill"]} className="mx-2">
                        Click aquí
                      </Button>
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
