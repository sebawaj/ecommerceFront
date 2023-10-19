import css from "./Product.module.css";
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Container, Carousel, Form, Button, Row, Col, Toast } from "react-bootstrap";
import Footer from "../../Footer/Footer";

import PageNavbar from "../../PageNavbar/PageNavbar";
import Review from "./Review/Review";
import Rating from "react-rating";

import { useDispatch } from "react-redux";
import { addItemToCart } from "../..//..//slices/cartSlice.js";
import { useSelector } from "react-redux";
import Newsletter from "../../Newsletter/Newsletter";
import Loading from "../../Loading/Loading";

function Product() {
  let user = useSelector((state) => state.persistedReducer.user);
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [reviewtext, setReviewText] = useState("");
  const [rating, setRating] = useState(0);
  const [stock, setStock] = useState(null);
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await axios({
          method: "get",
          url: `${process.env.REACT_APP_API_BASE_URL}/products/${slug}`,
        });
        setProduct(response.data);
        setReviews(response.data.reviews);
      } catch (error) {
        console.log(error);
      }
    };
    getProduct();
  }, [slug]);

  const dispatch = useDispatch();

  async function handleReview(event) {
    event.preventDefault();
    if (reviewtext !== "") {
      try {
        const response = await axios({
          method: "post",
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
          url: `${process.env.REACT_APP_API_BASE_URL}/reviews`,
          data: {
            content: reviewtext,
            productId: product.id,
            rating,
          },
        });
        let newreview = response.data;
        newreview.user = user;
        setReviews([newreview, ...reviews]);
        setReviewText("");
        setRating(0);
      } catch (error) {}
    }
  }

  const handleAddToCart = () => {
    dispatch(addItemToCart({ ...product, quantity: 1 }));
    setShow2(true);
  };

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };
  if (product) {
    window.document.title = `${product.title}`;
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
              <Toast.Body>Lo sentimos pero esta funcionalidad está en desarollo.</Toast.Body>
              <div className={css.toast}></div>
            </Toast>
          </Col>
        </Row>
        <Row>
          <Col xs={6}>
            <Toast
              onClose={() => setShow2(false)}
              show={show2}
              delay={3000}
              autohide
              className={`position-fixed bg-white ${css.rightBottomZero}`}
            >
              <Toast.Body>Tu producto ha sido agregado al carrito.</Toast.Body>
              <div className={css.toast}></div>
            </Toast>
          </Col>
        </Row>

        <PageNavbar />
        <div className="container mt-5 p-3">
          <div className="row">
            <div className="col-12 col-md-6" id={css["producto"]}>
              <div className="me-5">
                <Carousel className="rounded">
                  <Carousel.Item className="h-100">
                    <img
                      className={`d-block w-100 h-100 object-fit-cover ${css.carouselImage}`}
                      src={process.env.REACT_APP_API_BASE_IMG_URL + `/${product.img.img1}`}
                      alt="First slide"
                    />
                  </Carousel.Item>
                  <Carousel.Item className="h-100">
                    <img
                      className={`d-block w-100 h-100 object-fit-cover ${css.carouselImage}`}
                      src={process.env.REACT_APP_API_BASE_IMG_URL + `/${product.img.img2}`}
                      alt="Second slide"
                    />
                  </Carousel.Item>
                </Carousel>
              </div>
            </div>
            <div className="col-12 col-md-6 text-center  text-md-start p-3">
              <Rating
                className="d-block my-3 mb-1"
                emptySymbol="bi bi-star"
                fullSymbol={`bi bi-star-fill ${css.stars}`}
                initialRating={product.rating}
              />
              <h1 className="">{product.title}</h1>
              <h3 className="d-inline">${product.price} USD</h3>
              <span className={`${css.priceBefore} ms-2`}>
                ${Math.floor(product.price * 1.2)} USD
              </span>
              {product.stock === 0 ? (
                <span className={`${css.badge} ms-3 bg-red`}>FUERA DE STOCK</span>
              ) : (
                <span className={`${css.badge} ms-3`}>
                  {product.stock === 1 ? `Queda una unidad` : `Quedan ${product.stock} unidades!`}
                </span>
              )}
              <p className="mt-4">{product.description}</p>
              <div className="d-flex align-items-center justify-content-center justify-content-md-start">
                {product.stock <= 0 ? (
                  <small className={`${css.badge} fs-6 rounded text-center p-2 fw-semibold`}>
                    FUERA DE STOCK
                  </small>
                ) : (
                  <button className="btn fw-semibold" id={css["btn"]} onClick={handleAddToCart}>
                    Añadir al carrito
                  </button>
                )}

                <button className="border-0 bg-white ms-3" onClick={() => setShow(true)}>
                  <i className="bi bi-heart fs-5"></i>
                </button>
              </div>
            </div>
          </div>
        </div>

        <Container className="my-5 mx-auto p-3 border text-center text-md-start ">
          <h3 className="m-3 mb-0">Comentarios</h3>
          {user ? (
            <Form className="m-3 mb-0" onSubmit={handleReview}>
              <Form.Group className="mb-3" controlId="inputReview">
                <Form.Label>Deja tu Comentario</Form.Label>
                <Rating
                  className="d-block mb-1"
                  emptySymbol="bi bi-star"
                  fullSymbol={`bi bi-star-fill ${css.stars}`}
                  initialRating={rating}
                  onChange={handleRatingChange}
                />
                <Form.Control
                  as="textarea"
                  value={reviewtext}
                  onChange={(e) => setReviewText(e.target.value)}
                />
              </Form.Group>
              <Button type="submit" id={css["buttonReview"]}>
                Comentar
              </Button>
            </Form>
          ) : (
            <div className="m-3 mb-0">
              <p>
                Si quieres dejar un comentario debes{" "}
                <Link className="btn" id={css["buttonLogin"]} to="/login">
                  Iniciar Sesión
                </Link>
              </p>
            </div>
          )}
          {reviews.map((review, index) => {
            return <Review review={review} key={index} />;
          })}
        </Container>
        <Newsletter />
        <Footer />
      </>
    );
  } else {
    return <Loading />;
  }
}

export default Product;
