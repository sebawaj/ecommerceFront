/* import "./CartInformation.css"; */
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import PageNavbar from "../../PageNavbar/PageNavbar";
import Footer from "../../Footer/Footer";
import Form from "react-bootstrap/Form";
import CartInformationItem from "./CartInformationItem";
import { addAddressToCart } from "../../../slices/cartSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function CartInformation() {
  const user = useSelector((state) => state.persistedReducer.user);
  const admin = useSelector((state) => state.persistedReducer.admin);
  const cart = useSelector((state) => state.persistedReducer.cart.items);
  const totalPrice = useSelector((state) => state.persistedReducer.cart.totalPrice);
  const [pais, setPais] = useState("");
  const [provincia, setProvincia] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [codigoPostal, setCodigoPostal] = useState("");
  const [direccion, setDireccion] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formData = {
    pais,
    provincia,
    ciudad,
    codigoPostal,
    direccion,
  };
  return (
    <>
      <PageNavbar />
      <main>
        <div className="container">
          <div className="row">
            <div className="col-12 d-lg-none mt-4 text-center text-sm-start">
              <h1 className="fs-2">Manos Creativas - Tienda de Artesanias</h1>
              <div>
                <h2 className="fs-4">Informacón de contacto</h2>
                <div className="my-4 mb-4">
                  {user ? (
                    <small className="d-block fs-6 text-body">
                      {user.firstname} {user.lastname} ({user.email})
                    </small>
                  ) : (
                    <small className="d-block fs-6 text-body">
                      {admin.firstname} {admin.lastname} ({admin.email})
                    </small>
                  )}
                </div>
              </div>
            </div>

            <div className="col-12 col-lg-7 py-5 order-1">
              <div className="d-none d-lg-block">
                <h1 className="fs-2">Manos Creativas - Tienda de Artesanias</h1>
                <div>
                  <h2 className="fs-4">Información de contacto</h2>
                  <div className="my-4 mb-4">
                    {user ? (
                      <small className="d-block fs-6 text-body">
                        {user.firstname} {user.lastname} ({user.email})
                      </small>
                    ) : (
                      <small className="d-block fs-6 text-body">
                        {admin.firstname} {admin.lastname} ({admin.email})
                      </small>
                    )}
                  </div>
                </div>
              </div>
              <h2 className="fs-4 text-center text-sm-start">Dirección de envío</h2>
              <Form
                className="row"
                onSubmit={(event) => {
                  event.preventDefault();
                  dispatch(addAddressToCart(formData));
                  navigate("/cart/shipping");
                }}
              >
                <Form.Group className="mb-3 col-12 col-sm-6" controlId="formBasicEmail">
                  <Form.Label>Pais</Form.Label>
                  <Form.Control
                    type="text"
                    value={pais}
                    name="pais"
                    required
                    onChange={(event) => setPais(event.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3 col-12 col-sm-6" controlId="formBasicEmail">
                  <Form.Label>Provincia</Form.Label>
                  <Form.Control
                    type="text"
                    value={provincia}
                    name="provincia"
                    required
                    onChange={(event) => setProvincia(event.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3 col-12 col-sm-6" controlId="formBasicEmail">
                  <Form.Label>Ciudad</Form.Label>
                  <Form.Control
                    type="text"
                    value={ciudad}
                    name="ciudad"
                    required
                    onChange={(event) => setCiudad(event.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3 col-12 col-sm-6" controlId="formBasicEmail">
                  <Form.Label>Codigo postal</Form.Label>
                  <Form.Control
                    type="number"
                    value={codigoPostal}
                    name="codigoPostal"
                    required
                    onChange={(event) => setCodigoPostal(event.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Dirección</Form.Label>
                  <Form.Control
                    type="text"
                    value={direccion}
                    name="direccion"
                    required
                    onChange={(event) => setDireccion(event.target.value)}
                  />
                </Form.Group>
                <div className="col-12 col-sm-6 d-inline text-center text-sm-start order-2">
                  <Link to="/cart" className="btn ps-0 py-3 px-5 fw-semibold">
                    ← Volver al carrito
                  </Link>
                </div>
                <div className="col-12 col-sm-6 d-inline text-center text-sm-end order-sm-2">
                  <button
                    className="btn py-3 px-5 fw-semibold text-white btn-dark"
                    id="continue-btn"
                  >
                    Continuar al envío
                  </button>
                </div>
              </Form>

              <hr className="my-5" />
              <small className="text-secondary">
                All rights reserved Artistic - Art & Craft Store
              </small>
            </div>
            <div className="col-12 col-lg-5 px-5 p-5 bg-secondary-subtle border-start order-lg-1">
              <h3 className="fs-5 fw-semibold text-center">Cart</h3>
              {cart.map((item) => (
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
      </main>
      <Footer />
    </>
  );
}

export default CartInformation;
