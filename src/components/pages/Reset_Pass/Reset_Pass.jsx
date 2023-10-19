import { React, useState } from "react";
import { Col, Button, Row, Container, Card, Form, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import PageNavbar from "../../PageNavbar/PageNavbar";
import css from "./Reset_Pass.module.css";

//import { GoogleOAuthProvider } from "@react-oauth/google";

export default function Reset() {
  const [email, setEmail] = useState("");
  const [buttonText, setButtonText] = useState(<span className="text-white fs-5">Enviar</span>);
  const [alert, setAlert] = useState(null);

  const handleSendEmail = async (event) => {
    event.preventDefault();
    setButtonText(
      <span
        className="spinner-border spinner-border text-white"
        role="status"
        aria-hidden="true"
      ></span>,
    );
    try {
      await axios({
        method: "post",
        url: `${process.env.REACT_APP_API_BASE_URL}/users/resetpassword`,
        data: {
          email,
        },
      });
      setButtonText(<i className="bi bi-send-check text-white fs-2"></i>);
    } catch (err) {
      console.log(err);
      setAlert({ type: "danger", msg: "Correo incorrecto" });
      setButtonText(<span className="text-white fs-4">Enviar</span>);
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
                  <form className="mb-3" onSubmit={handleSendEmail}>
                    <Form.Group className="mb-3">
                      <Form.Label className="text-center">Correo electrónico</Form.Label>
                      <Form.Control
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        className="form-control"
                      />
                    </Form.Group>
                    <p>Se te enviará un mail con instrucciones</p>
                    <div className="mt-3 d-grid">
                      <Button id={css["button"]} type="submit">
                        {buttonText}
                      </Button>
                    </div>
                  </form>
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
