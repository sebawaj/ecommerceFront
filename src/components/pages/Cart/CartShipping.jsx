/* import "./CartShipping.css"; */
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import PageNavbar from "../../PageNavbar/PageNavbar";
import CartInformationItem from "./CartInformationItem";
import Footer from "../../Footer/Footer";

function CartShipping() {
  const { items, totalPrice, address } = useSelector((state) => state.persistedReducer.cart);
  const user = useSelector((state) => state.persistedReducer.user);
  const admin = useSelector((state) => state.persistedReducer.admin);
  return (
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
              <small className="fw-semibold">Envío</small>
              <small className="fw-bold fs-6"> {">"} </small>
              <small className="text-secondary">Pago</small>
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
                <small className="fw-semibold">Envío</small>
                <small className="fw-bold fs-6"> {">"} </small>
                <small className="text-secondary">Pago</small>
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
                      {address.direccion}, {address.codigoPostal} {address.ciudad} , {address.pais}
                    </small>
                  </div>
                </div>
              </div>
              <div className="col-12 col-sm-6 d-inline text-center text-sm-start order-2">
                <Link to="/cart/information" className="btn ps-0 py-3 px-5 fw-semibold">
                  ← Volver a Información
                </Link>
              </div>
              <div className="col-12 col-sm-6 d-inline text-center text-sm-end order-sm-2">
                <Link to="/cart/payment">
                  <button
                    className="btn py-3 px-5 fw-semibold text-white btn-dark"
                    id="continue-btn"
                  >
                    Continuar al pago
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
            <h3 className="fs-5 fw-semibold text-center">Cart</h3>
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
  );
}

export default CartShipping;
