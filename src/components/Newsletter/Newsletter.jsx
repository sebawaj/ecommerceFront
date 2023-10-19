import css from "./Newsletter.module.css";
import { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Form, Button, InputGroup } from "react-bootstrap";

function Newsletter() {
  const user = useSelector((state) => state.persistedReducer.user);
  const [email, setEmail] = useState("");
  const [buttonIcon, setButtonIcon] = useState(
    <i className={`bi bi-arrow-right-circle-fill fs-4 ${css.iconsend}`}></i>,
  );
  const [buttonContentUser, setButtonContentUser] = useState(
    <span className="text-white">Suscribirse</span>,
  );
  const handleNewsSend = async (event) => {
    event.preventDefault();
    setButtonIcon(
      <span
        className="spinner-border spinner-border text-white fs-4"
        role="status"
        aria-hidden="true"
      ></span>,
    );
    try {
      await axios({
        method: "post",
        url: `${process.env.REACT_APP_API_BASE_URL}/newsletter`,
        data: { email: email },
      });
      setButtonIcon(<i className={`bi bi-send-check ${css.iconsend} fs-2`}></i>);
      setEmail("");
    } catch (error) {
      setButtonIcon(<i className="bi bi-x-circle-fill fs-4 text-danger"></i>);
    }
  };

  const handleNewsUser = async (event) => {
    setButtonContentUser(
      <span
        className="spinner-border spinner-border text-white fs-4"
        role="status"
        aria-hidden="true"
      ></span>,
    );
    try {
      await axios({
        method: "post",
        url: `${process.env.REACT_APP_API_BASE_URL}/newsletter`,
        data: { email: user.email },
      });
      setButtonContentUser(<i className={`bi bi-send-check ${css.iconsend} fs-2`}></i>);
    } catch (error) {
      setButtonContentUser(<i className="bi bi-x-circle-fill fs-4 text-danger"></i>);
    }
  };

  return (
    <div className={`${css.newsletter} text-center`}>
      <h3>Suscríbete a nuestro Newsletter!</h3>
      {user ? (
        <p>Recibiras noticias y descuentos especiales!</p>
      ) : (
        <p>Dejanos tu email para recibir noticias y descuentos especiales!</p>
      )}
      {user ? (
        <div className="row justify-content-center">
          <div className="col-4">
            <Button id={css["buttonLogged"]} size="lg" type="submit" onClick={handleNewsUser}>
              {buttonContentUser}
            </Button>
          </div>
        </div>
      ) : (
        <Form onSubmit={handleNewsSend} className="container">
          <div className="row justify-content-center">
            <div className="col-10 col-sm-8 col-md-5 col-lg-4">
              <InputGroup className="mb-3">
                <Form.Control
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  required
                />
                <Button id={css["button"]} size="sm" className="p-0" type="submit">
                  {buttonIcon}
                </Button>
              </InputGroup>
            </div>
          </div>
        </Form>
      )}
    </div>
  );
}

export default Newsletter;
