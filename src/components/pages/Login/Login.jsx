import { React, useState } from "react";
import { Col, Button, Row, Container, Card, Form, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../../slices/usersSlice";
import { removeAdmin } from "../../../slices/adminSlice";
import axios from "axios";
import PageNavbar from "../../PageNavbar/PageNavbar";
import css from "./Login.module.css";

export default function Login() {
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
        url: `${process.env.REACT_APP_API_BASE_URL}/users/tokens`,
        data: {
          email,
          password,
        },
      });
      dispatch(setUser({ token: response.data.token, ...response.data.user }));
      dispatch(removeAdmin());
      navigate("/");
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };
  const handleFill = async (event) => {
    setEmail("user@1234.com");
    setPassword("1234");
  };

  return (
    <>
      <PageNavbar />
      <Container
        fluid
        id={css["background"]}
        className="d-flex justify-content-center align-items-center"
      >
        <Row id={css["content"]}>
          <Col>
            <Card className=" px-4">
              {error && (
                <Alert variant="danger" onClose={() => setError(false)} dismissible>
                  <p>Email o contraseña incorrectos</p>
                </Alert>
              )}
              <Card.Body>
                <div>
                  <h2 className="mb-3 text-center ">Iniciar Sesión</h2>
                  <form className="mb-3" onSubmit={handleLogin}>
                    <Form.Group className="mb-3">
                      <Form.Label className="text-center">Correo electrónico</Form.Label>
                      <Form.Control
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        className="form-control"
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label className="text-center">Contraseña</Form.Label>
                      <Form.Control
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        className="form-control"
                      />
                    </Form.Group>

                    <div className="mt-3 d-grid">
                      <Button id={css["button"]} type="submit">
                        Login
                      </Button>
                    </div>
                  </form>
                  <div className="mt-3">
                    <p className="mb-0 text-center">
                      Todavía no tienes una cuenta?
                      <Link to="/signup" className={css.link}>
                        Regístrate
                      </Link>
                    </p>
                  </div>
                  <div className="mt-1">
                    <p className="mb-0 text-center">
                      <Link to="/resetpassword" className={css.link}>
                        Olvidaste tu contraseña?
                      </Link>
                    </p>
                  </div>
                  <div className="mt-3">
                    <p className="mb-0  text-center">
                      Necesitas acceso?
                      <Button onClick={handleFill} id={css["buttonFill"]} className="mx-2">
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
