import css from "../pages/Home/Home.module.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import PageNavbar from "..//PageNavbar/PageNavbar";
import ProductMini from "../../components/ProductMini/ProductMini";
import Carousel from "react-bootstrap/Carousel";
import Footer from "../../components/Footer/Footer";
import Newsletter from "../../components/Newsletter/Newsletter";
import Loading from "../../components/Loading/Loading";
import StartModal from "../../components/StartModal/StartModal";

function Products({ showModal, setShowModal }) {
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
                src="/img/mainBanner.webp"
                alt="First slide"
                draggable="false"
              />
              <Carousel.Caption className={css.carouselCaption}>
                <p>Lo más vendido</p>
                <h2>Colección Madera Moderna</h2>
                <button className={`btn ${css.bannerBtn}`}>Comprar ahora</button>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block"
                src="/img/mainBanner2.webp"
                alt="Second slide"
                draggable="false"
              />

              <Carousel.Caption className={css.carouselCaption}>
                <p>Los mejores productos hechos a mano</p>
                <h2>Nueva Colección Handmade</h2>
                <button className={`btn ${css.bannerBtn}`}>Comprar ahora</button>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>

          <div className="container">
            <h3 className="fs-2 mt-5 text-center">Categorías</h3>
            <div className="row rounded g-1" id={css["categoryDisplay"]}>
              {categories.map((category) => (
                <div
                  key={`${category.name}_${category.id}`}
                  className="col-12 col-sm-6 col-md-4 col-xl-2"
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
                    />
                    <h5 className="mt-3">{category.name}</h5>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 mb-5 ms-2">
              <h3 className="pt-5 pb-4 d-inline fs-2" id="todos">
                Todos los productos
              </h3>
            </div>
            {showProducts(productsFromCategory1)}
            {showProducts(productsFromCategory2)}
            {showProducts(productsFromCategory3)}
            {showProducts(productsFromCategory4)}
            {showProducts(productsFromCategory5)}
          </div>
        </main>
        <Newsletter />
        <Footer />
      </>
    );
  } else return <Loading />;
}

export default Products;
