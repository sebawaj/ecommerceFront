import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import css from "./NavbarAdmin.module.css";
import { useSelector } from "react-redux";

function NavbarAdmin() {
  let user = useSelector((state) => state.persistedReducer.user);
  return (
    <>
      <Navbar
        bg="white"
        expand="lg"
        variant="light"
        className="flex-column border-bottom shadow"
        sticky="top"
      >
        <Container id={css["mainBar"]}>
          <Navbar.Brand as={Link} to={"/"} className="col-2 d-flex justify-content-center">
            <img
              src={process.env.REACT_APP_API_BASE_IMG_URL + `/logo.png`}
              alt="logo Manos Creativas"
              className={`${css.navLogo}`}
            />
          </Navbar.Brand>
          <h2 className="fs-5 ms-4 fw-light">Panel de Administración</h2>
        </Container>
      </Navbar>
    </>
  );
}

export default NavbarAdmin;
