import css from "./Cart.module.css";
import PageNavbar from "../../PageNavbar/PageNavbar";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import CartItem from "./CartItem";
import Footer from "../../Footer/Footer";

function Cart() {
  window.document.title = "Carrito";
  const cart = useSelector((state) => state.persistedReducer.cart.items);
  const totalPrice = useSelector((state) => state.persistedReducer.cart.totalPrice);
  return (
    <>
      <PageNavbar />
      <main>
        <div
          id={css["topBanner"]}
          className="container-fluid py-5 d-flex align-item-center justify-content-center flex-column"
        >
          <h1 className="fs-3 fw-bold text-light text-center">Your Shopping Cart</h1>
          <small className="fs-6 fw-semibold text-light text-center">Home</small>
        </div>
        <div className="container mt-5">
          <div className="row flex-column flex-sm-row text-center text-sm-start">
            <div className="d-sm-none">
              <small className="fs-5 fw-semibold">Cart Info</small>
            </div>
            <div className="d-none d-sm-block col-3">
              <small className="fs-5 fw-semibold">Product</small>
            </div>
            <div className="d-none d-sm-block col-3">
              <small className="fs-5 fw-semibold">Price</small>
            </div>
            <div className="d-none d-sm-block col-3">
              <small className="fs-5 fw-semibold">Quantity</small>
            </div>
            <div className="d-none d-sm-block col-3">
              <small className="fs-5 fw-semibold">Total</small>
            </div>
            <hr className="my-3" />

            {cart.map((item) => {
              return <CartItem key={item.id} item={item} />;
            })}

            <div className="col-12 mb-4 mt-2">
              <Link to="/" className="btn text-white" id="btn-continue-buying">
                Seguir comprando
              </Link>
            </div>
            <div className="col-12 col-sm-6 mt-4">
              <div>
                <label htmlFor="note" className="fs-6 mb-3">
                  Instrucciones especiales para el pedido
                </label>
                <textarea name="note" id="note" cols="30" rows="5" className="w-75"></textarea>
              </div>
            </div>
            <div className="col-12 col-sm-6 mt-4">
              <div className="text-sm-end mb-2">
                <small className="fs-6">Subtotal</small>
                <small className="fs-6 ms-2">${totalPrice} USD</small>
              </div>
              <div className="text-sm-end my-4">
                <small className="fs-6">Iva y costos de envio calculados en el Check Out</small>
              </div>
              <div className="text-sm-end mt-5">
                {cart.length > 0 ? (
                  <Link to="/cart/information" className="btn btn-dark w-75">
                    Check Out
                  </Link>
                ) : (
                  <small className="fs-4 border rounded p-2 bg-danger-subtle">
                    Debes tener productos en el carrito para poder seguir
                  </small>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Cart;
