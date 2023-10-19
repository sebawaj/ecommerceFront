import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import css from "./NavbarAdmin.module.css";
import { useSelector } from "react-redux";
import logo from "../../../logo nuevo.png";

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
            <img src={logo} alt="logo Atid Uniformes" className={`${css.navLogo} mt-8`} />
          </Navbar.Brand>
          <h2 className="fs-5 ms-4 fw-light">Panel de Administración</h2>
        </Container>
      </Navbar>
    </>
  );
}

export default NavbarAdmin;
