import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

import css from "./StartModal.module.css";

function StartModal({ showModal, setShowModal, products }) {
  const [btnReset, setBtnReset] = useState("Resetear Base de Datos");
  const handleClose = () => setShowModal(false);

  const resetDatabase = async () => {
    setBtnReset(
      <span
        className="spinner-border spinner-border text-white"
        role="status"
        aria-hidden="true"
      ></span>,
    );
    try {
      await axios({
        method: "put",
        url: `${process.env.REACT_APP_API_BASE_URL}/reset`,
      });
      setBtnReset(<i className="bi bi-check2 text-white fs-3"></i>);
    } catch (error) {
      setBtnReset("Resetear Base de Datos");
      console.log(error);
    }
  };

  return (
    <Modal show={showModal} onHide={handleClose} id={css["modal"]}>
      <Modal.Header closeButton>
        <Modal.Title>Bienvenido a Manos Creativas! 👋</Modal.Title>
      </Modal.Header>
      <Modal.Body className="px-4">
        <p>
          Este e-commerce es el proyecto final de 3 estudiantes del Coding Bootcamp de Hack Academy!
        </p>
        <p>
          Recomendamos fuertemente <b>un reseteo de la base de datos</b> para que tu experiencia sea
          mejor.
        </p>
        <p>
          Te dejamos unas <b>credenciales de prueba</b> para que puedas probar las funcionalidades
          más facilmente:
        </p>
        <div className="row mt-3">
          <div className="col-6">
            <h5>Credenciales Admin</h5>
            <p className="mb-0">
              <b>Email:</b> admin@1234.com
            </p>
            <p className="mb-0">
              <b>Contraseña:</b> 1234
            </p>
            <Link to={"/admin"} onClick={handleClose} className={css.link}>
              <p>
                Ir a Admin Login <i className="bi bi-arrow-right"></i>
              </p>
            </Link>
          </div>
          <div className="col-6">
            <h5>Credenciales User</h5>
            <p className="mb-0">
              <b>Email:</b> user@1234.com
            </p>
            <p className="mb-0">
              <b>Contraseña:</b> 1234
            </p>
            <Link to={"/login"} onClick={handleClose} className={css.link}>
              <p>
                Ir a User Login <i className="bi bi-arrow-right"></i>
              </p>
            </Link>
          </div>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="danger" onClick={(handleClose, () => resetDatabase())} className="me-auto">
          {btnReset}
        </Button>
        <Link to={"/about-us"}>
          <Button className={css.btn} onClick={handleClose}>
            Sobre Este Proyecto
          </Button>
        </Link>
      </Modal.Footer>
    </Modal>
  );
}

export default StartModal;
