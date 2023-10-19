import css from "./ProductMini.module.css";
import cssHome from "../pages/Home/Home.module.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Toast } from "react-bootstrap";

function ProductMini({ product }) {
  const [show, setShow] = useState(false);
  return (
    <>
      <div className={`col-6 col-md-4 col-lg-3 mb-5 p-relative`} id={css["productMini"]}>
        <Row>
          <Col xs={6}>
            <Toast
              onClose={() => setShow(false)}
              show={show}
              delay={3000}
              autohide
              className={`position-fixed bg-white ${css.rightBottomZero}`}
            >
              <Toast.Body>Lo sentimos pero esta funcionalidad está en desarollo.</Toast.Body>
              <div className={css.toast}></div>
            </Toast>
          </Col>
        </Row>
        <div id={css["productContainer"]} className="shadow rounded">
          <div className={css.imgContainer}>
            <Link to={`/product/${product.slug}`} className="text-decoration-none">
              <img
                src={process.env.REACT_APP_API_BASE_IMG_URL + `/${product.img.img1}`}
                alt=""
                className={`${cssHome.destacadosImg} w-100 rounded-top`}
                draggable="false"
              />
            </Link>
            <button className={css.iconoBtn}>
              <i className={`bi bi-heart ${css.heartIcon}`} onClick={() => setShow(true)}></i>
            </button>
          </div>
          <Link to={`/product/${product.slug}`} className="text-decoration-none">
            <div className="border px-2 rounded-bottom" id={css["infoContainer"]}>
              <div className="row">
                <h5 className={`mt-3 ps-3 ${css.title}`}>{product.title}</h5>
                <small className="fw-light col-12 mb-2 ps-3" id={css["product"]}>
                  {product.description}
                </small>
                <span>
                  <small id={css["priceBefore"]}>{Math.floor(product.price * 1.2)} USD</small>
                  <small> 20% OFF</small>
                </span>
                <small id={css["price"]} className="fw-bold">
                  {product.price} USD
                </small>
                <small id={css["rating"]} className="col-6">
                  <i className="bi bi-star-fill text-warning"></i> {product.rating}
                </small>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}

export default ProductMini;
