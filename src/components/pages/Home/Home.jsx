import css from "./Home.module.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import PageNavbar from "../../PageNavbar/PageNavbar";
import MultiItemCarousel from "../../Carousel/MultiItemCarousel";
import ProductMini from "../../ProductMini/ProductMini";
import Carousel from "react-bootstrap/Carousel";
import Footer from "../../Footer/Footer";
import Newsletter from "../../Newsletter/Newsletter";
import Loading from "../../Loading/Loading";

import StartModal from "../../StartModal/StartModal";

function Home({ showModal, setShowModal }) {
  window.document.title = "Manos Creativas";
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [productsFromCategory1, setProductsFromCategory1] = useState([]);
  const [productsFromCategory2, setProductsFromCategory2] = useState([]);
  const [productsFromCategory3, setProductsFromCategory3] = useState([]);
  const [productsFromCategory4, setProductsFromCategory4] = useState([]);
  const [productsFromCategory5, setProductsFromCategory5] = useState([]);
  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await axios({
          method: "get",
          url: `${process.env.REACT_APP_API_BASE_URL}/products`,
        });
        setProducts(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getProducts();
  }, []);
  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await axios({
          method: "get",
          url: `${process.env.REACT_APP_API_BASE_URL}/products?categoryId=1`,
        });
        const response2 = await axios({
          method: "get",
          url: `${process.env.REACT_APP_API_BASE_URL}/products?categoryId=2`,
        });
        const response3 = await axios({
          method: "get",
          url: `${process.env.REACT_APP_API_BASE_URL}/products?categoryId=3`,
        });
        const response4 = await axios({
          method: "get",
          url: `${process.env.REACT_APP_API_BASE_URL}/products?categoryId=4`,
        });
        const response5 = await axios({
          method: "get",
          url: `${process.env.REACT_APP_API_BASE_URL}/products?categoryId=5`,
        });
        const response6 = await axios({
          method: "get",
          url: `${process.env.REACT_APP_API_BASE_URL}/categories`,
        });

        setProductsFromCategory1(response.data);
        setProductsFromCategory2(response2.data);
        setProductsFromCategory3(response3.data);
        setProductsFromCategory4(response4.data);
        setProductsFromCategory5(response5.data);
        setCategories(response6.data);
      } catch (error) {
        console.log(error);
      }
    };
    getProducts();
  }, []);

  function showProducts(arrayProducts) {
    return (
      arrayProducts && (
        <div className="row">
          {arrayProducts.slice(0, 4).map((product) => {
            return <ProductMini product={product} key={`${product.name}_${product.id}`} />;
          })}
        </div>
      )
    );
  }

  function scrollToCategory(id) {
    const elemento = document.getElementById(id);
    const posicion = elemento.getBoundingClientRect();
    window.scrollTo({
      top: posicion.top + window.pageYOffset,
      behavior: "smooth",
    });
  }

  if (products.length > 0) {
    return (
      <>
        <StartModal showModal={showModal} setShowModal={setShowModal} />
        <PageNavbar />
        <main>
          <Carousel className={css.carousel}>
            <Carousel.Item>
              <img
                className={`${css.imgPrueba} d-block`}
                src="/img/mainBanner.png"
                alt="First slide"
                draggable="false"
              />
              <Carousel.Caption className={css.carouselCaption}>
                <p className="fs-5">Lo más vendido</p>
                <h2 className="fs-1">Colección Madera Moderna</h2>
                <Link to={"product/Cajas-de-Madera-Hexagonales"}>
                  <button className={`btn ${css.bannerBtn}`}>Comprar ahora</button>
                </Link>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className={`${css.imgPrueba} d-block`}
                src="/img/mainBanner2.png"
                alt="Second slide"
                draggable="false"
              />

              <Carousel.Caption className={css.carouselCaption}>
                <p className="fs-5">Los mejores productos hechos a mano</p>
                <h2 className="fs-1">Nueva Colección Handmade</h2>
                <Link to={"product/Carrito-de-Madera"}>
                  <button className={`btn ${css.bannerBtn}`}>Comprar ahora</button>
                </Link>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>

          <div className="container">
            <h3 className="fs-2 mt-5 text-center">Categorías</h3>
            <div className="row rounded g-3 g-lg-1 " id={css["categoryDisplay"]}>
              {categories.map((category) => (
                <div
                  key={`${category.name}_${category.id}`}
                  className="col-5 col-md-4 col-lg-2 text-center"
                  onClick={() =>
                    scrollToCategory(
                      category.name.toLowerCase().replace(/[áéíóú]/g, function (match) {
                        switch (match) {
                          case "á":
                            return "a";
                          case "é":
                            return "e";
                          case "í":
                            return "i";
                          case "ó":
                            return "o";
                          case "ú":
                            return "u";
                        }
                      }),
                    )
                  }
                >
                  <div>
                    <img
                      src={process.env.REACT_APP_API_BASE_IMG_URL + `/${category.img}`}
                      alt=""
                      className={css.categoriesImg + " img-fluid"}
                      draggable="false"
                    />
                    <h5 className="mt-3">{category.name}</h5>
                  </div>
                </div>
              ))}
            </div>
            <section id={css["display"]} className="row g-3">
              <div className={`col-12 col-lg-6 ${css.displayOffer}`}>
                <img src="/img/subBanner.webp" alt="" className="img-fluid" draggable="false" />
                <div className="">
                  <p className="fs-5 mb-2">35% off</p>
                  <h3>Especial Nórdico Matte</h3>
                  <Link to={"product/Set-de-Madera-Nórdica"}>
                    <button className={`btn ${css.bannerBtn}`}>Comprar ahora</button>
                  </Link>
                </div>
              </div>
              <div className={`col-12 col-lg-6 ${css.displayOffer}`}>
                <img src="/img/subBanner2.webp" alt="" className="img-fluid" draggable="false" />
                <div>
                  <p className="fs-5 mb-2">25% off</p>
                  <h3>Terra Punto Cotta</h3>
                  <Link to={"product/Terra-Punto-Cotta"}>
                    <button className={`btn ${css.bannerBtn}`}>Comprar ahora</button>
                  </Link>
                </div>
              </div>
            </section>
            <h2 className="pb-4">Destacados</h2>
            {products && (
              <MultiItemCarousel
                products={products.filter((product) => Number(product.rating) === 5)}
                productsPerPage={4}
              ></MultiItemCarousel>
            )}

            <div className="mt-5 mb-5 ms-2">
              <h3 className="pt-5 pb-4 d-inline fs-2" id="pinturas">
                Pinturas
              </h3>
              <Link to={"/categories/1"} className={css.categoryLink}>
                ver todos <i className="bi bi-arrow-right-short"></i>
              </Link>
            </div>
            {showProducts(productsFromCategory1)}
            <div className="mt-5 mb-5 ms-2">
              <h3 className="pt-5 pb-4 d-inline fs-2" id="ceramicas">
                Cerámicas
              </h3>
              <Link to={"/categories/2"} className={css.categoryLink}>
                ver todos <i className="bi bi-arrow-right-short"></i>
              </Link>
            </div>
            {showProducts(productsFromCategory2)}
            <div className="mt-5 mb-5 ms-2">
              <h3 className="pt-5 pb-4 d-inline fs-2" id="maderas">
                Maderas
              </h3>
              <Link to={"/categories/3"} className={css.categoryLink}>
                ver todos <i className="bi bi-arrow-right-short"></i>
              </Link>
            </div>
            {showProducts(productsFromCategory3)}
            <div className="mt-5 mb-5 ms-2">
              <h3 className="pt-5 pb-4 d-inline fs-2" id="tejidos">
                Tejidos
              </h3>
              <Link to={"/categories/4"} className={css.categoryLink}>
                ver todos <i className="bi bi-arrow-right-short"></i>
              </Link>
            </div>
            {showProducts(productsFromCategory4)}
            <div className="mt-5 mb-5 ms-2">
              <h3 className="pt-5 pb-4 d-inline fs-2" id="decoraciones">
                Decoraciones
              </h3>
              <Link to={"/categories/5"} className={css.categoryLink}>
                ver todos <i className="bi bi-arrow-right-short"></i>
              </Link>
            </div>
            {showProducts(productsFromCategory5)}
          </div>
        </main>
        <Newsletter />
        <Footer />
      </>
    );
  } else return <Loading />;
}

export default Home;
