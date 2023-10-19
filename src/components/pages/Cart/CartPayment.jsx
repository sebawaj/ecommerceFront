import css from "./CartPayment.module.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../../../slices/cartSlice";
import { Form, Row, Col, Toast } from "react-bootstrap";
import PageNavbar from "../../PageNavbar/PageNavbar";
import Footer from "../../Footer/Footer";
import CartInformationItem from "./CartInformationItem";
import axios from "axios";

function CartPayment() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [show, setShow] = useState(false);
  const user = useSelector((state) => state.persistedReducer.user);
  const admin = useSelector((state) => state.persistedReducer.admin);
  const userId = user ? user.id : "";
  const adminId = admin ? admin.id : "";
  const { items, totalPrice, address } = useSelector((state) => state.persistedReducer.cart);

  const handleCreateOrder = async (event) => {
    event.preventDefault();
    try {
      await axios({
        method: "post",
        url: `${process.env.REACT_APP_API_BASE_URL}/orders`,
        data: { items, totalPrice, address, userId, adminId },
      });
      dispatch(clearCart());
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  return (
    <>
      <Row>
        <Col xs={6}>
          <Toast
            onClose={() => setShow(false)}
            show={show}
            delay={3000}
            autohide
            className={`position-fixed bg-white ${css.rightBottomZero}`}
          >
            <Toast.Body>Felicitaciones tu orden ha sido creada con éxito.</Toast.Body>
            <div className={css.toast}></div>
          </Toast>
        </Col>
      </Row>
      <main>
        <PageNavbar />
        <div className="container p-0">
          <div className="row g-5">
            <div className="col-12 d-lg-none mt-4 text-center text-sm-start">
              <h1 className="fs-2">Manos Creativas - Tienda de Artesanias</h1>
              <div className="fs-6 my-5">
                <Link to="#" className="text-decoration-none text-dark">
                  Cart
                </Link>
                <small className="fw-bold fs-6"> {">"} </small>
                <small className="">Información</small>
                <small className="fw-bold fs-6"> {">"} </small>
                <small className="">Envío</small>
                <small className="fw-bold fs-6"> {">"} </small>
                <small className="fw-semibold">Pago</small>
              </div>
            </div>
            <div className="col-12 col-lg-7 py-5 order-1">
              <div className="d-none d-lg-block">
                <h1 className="fs-2">Manos Creativas - Tienda de Artesanias</h1>
                <div className="fs-6 my-5">
                  <Link to="#" className="text-decoration-none text-dark">
                    Cart
                  </Link>
                  <small className="fw-bold fs-6"> {">"} </small>
                  <small className="">Información</small>
                  <small className="fw-bold fs-6"> {">"} </small>
                  <small className="">Envío</small>
                  <small className="fw-bold fs-6"> {">"} </small>
                  <small className="fw-semibold">Pago</small>
                </div>
              </div>
              <div className="row">
                <div className="col-12 border rounded p-3 mb-5">
                  <div className="row">
                    <div className="col-12 col-sm-3 text-center text-sm-start d-block d-sm-flex align-items-sm-center">
                      <small className="fs-6 text-secondary">Contact</small>
                    </div>
                    <div className="col-12 col-sm-9 text-center text-sm-start d-block d-sm-flex align-items-sm-center">
                      {user ? (
                        <small className="fs-6 ps-3">{user.email}</small>
                      ) : (
                        <small className="fs-6 ps-3">{admin.email}</small>
                      )}
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-12 col-sm-3 text-center text-sm-start d-block d-sm-flex align-items-sm-center">
                      <small className="fs-6 text-secondary">Envío a</small>
                    </div>
                    <div className="col-12 col-sm-9 text-center text-sm-start d-block d-sm-flex align-items-sm-center">
                      <small className="fs-6 ps-3">
                        {address.direccion}, {address.codigoPostal} {address.ciudad} ,{" "}
                        {address.pais}
                      </small>
                    </div>
                    {/*                   <div className="col-2 text-end d-flex justify-content-between align-items-center">
                    <button className="btn">Editar</button>
                  </div> */}
                  </div>
                </div>

                <h3 className="fs-5 p-0 text-center text-sm-start">Pago</h3>

                <small className="fs-6 p-0 mb-3 mt-2 text-center text-sm-start">
                  Todas las transacciones son seguras y encriptadas
                </small>
                <div className="col-12 border rounded p-0 mb-5">
                  <div className="p-3 text-center text-sm-start">
                    <h4 className="fs-6 fw-bold">Tarjeta de crédito</h4>
                  </div>
                  <hr className="m-0" />
                  <div className="row">
                    <Form>
                      <div className="col-12 p-3 bg-secondary-subtle">
                        <div className="row">
                          <Form.Group className="mb-3 col-12 px-sm-0" controlId="formBasicEmail">
                            <Form.Control type="number" placeholder="Número de tarjeta" required />
                          </Form.Group>
                          <Form.Group className="mb-3 col-12 px-sm-0" controlId="formBasicEmail">
                            <Form.Control type="text" placeholder="Nombre del titular" required />
                          </Form.Group>
                          <Form.Group
                            className="mb-3 col-12 col-sm-6 ps-sm-0"
                            controlId="formBasicEmail"
                          >
                            <Form.Control
                              type="date"
                              placeholder="Fecha de expiracón (MM / YY)"
                              required
                            />
                          </Form.Group>
                          <Form.Group
                            className="mb-3 col-12 col-sm-6 pe-sm-0"
                            controlId="formBasicEmail"
                          >
                            <Form.Control type="text" placeholder="CVV" required />
                          </Form.Group>
                        </div>
                      </div>
                    </Form>
                  </div>
                </div>
                <div className="col-12 col-sm-6 d-inline text-center text-sm-start order-2">
                  <Link to="/cart/shipping" className="btn ps-0 py-3 px-5 fw-semibold">
                    ← Volver al envío
                  </Link>
                </div>
                <div className="col-12 col-sm-6 d-inline text-center text-sm-end order-sm-2">
                  <Link to="/cart/payment">
                    <button
                      className="btn py-3 px-5 fw-semibold text-white btn-dark"
                      id="continue-btn"
                      onClick={(event) => {
                        handleCreateOrder(event);
                        navigate("/");
                      }}
                    >
                      Realizar al pago
                    </button>
                  </Link>
                </div>
              </div>
              <hr className="my-5" />
              <small className="text-secondary">
                All rights reserved Artistic - Art & Craft Store
              </small>
            </div>
            <div className="col-12 col-lg-5 p-5 bg-secondary-subtle border-start order-lg-1">
              {items.map((item) => (
                <CartInformationItem key={item.id} item={item} />
              ))}
              <div className="d-flex justify-content-between">
                <small className="fs-6 my-3">Subtotal</small>
                <small className="fs-6 fw-semibold  my-3">${totalPrice}</small>
              </div>
              <div className="d-flex justify-content-between">
                <small className="fs-6 mb-3">Envío</small>
                <small className="fs-6 fw-semibold mb-3">$18.25</small>
              </div>
              <hr />
              <div className="d-flex justify-content-between">
                <small className="fs-6">Total</small>
                <small className="fw-semibold">
                  USD<span className="fs-5 ms-2">${totalPrice + 18.25}</span>
                </small>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    </>
  );
}

export default CartPayment;
