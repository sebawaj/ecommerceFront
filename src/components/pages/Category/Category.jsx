import css from "./Category.module.css";
import cssHome from "../Home/Home.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import PageNavbar from "../../PageNavbar/PageNavbar";
import ProductMini from "../../ProductMini/ProductMini";
import Newsletter from "../../Newsletter/Newsletter";
import Footer from "../../Footer/Footer";
import Loading from "../../Loading/Loading";
import { useNavigate, useParams } from "react-router-dom";

function Category() {
  const [category, setCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getCategory = async () => {
      try {
        const response = await axios({
          method: "get",
          url: `${process.env.REACT_APP_API_BASE_URL}/categories/${id}`,
        });
        const response2 = await axios({
          method: "get",
          url: `${process.env.REACT_APP_API_BASE_URL}/categories`,
        });
        setCategory(response.data);
        setCategories(response2.data);
      } catch (error) {
        console.log(error);
      }
    };
    getCategory();
  }, [id]);

  function scrollToCategory(id) {
    const elemento = document.getElementById(id);
    const posicion = elemento.getBoundingClientRect();
    window.scrollTo({
      top: posicion.top + window.pageYOffset,
      behavior: "smooth",
    });
  }

  function showProducts() {
    return (
      category && (
        <div className="row">
          {category.products.map((product) => {
            return <ProductMini product={product} key={`${product.name}_${product.id}`} />;
          })}
        </div>
      )
    );
  }

  if (category) {
    return (
      <>
        <PageNavbar />
        <main>
          <div className="container">
            <h3 className="fs-1 mt-4 text-center">Categorías</h3>
            <div className="row rounded border-bottom" id={cssHome["categoryDisplay"]}>
              {categories.map((category) => (
                <div
                  key={`${category.name}_${category.id}`}
                  className="col-12 col-sm-6 col-md-4 col-xl-2"
                  onClick={() => {
                    navigate("/categories/" + category.id);
                    scrollToCategory("products");
                  }}
                >
                  <img
                    src={process.env.REACT_APP_API_BASE_IMG_URL + `/${category.img}`}
                    alt=""
                    className={css.categoriesImg}
                  />
                  <h5 className="mt-3">{category.name}</h5>
                </div>
              ))}
            </div>
            <div className="mt-5 mb-5 ms-2">
              <h3 className="pt-5 pb-4 d-inline fs-2" id="products">
                {category.name}
                <small className="fs-6 fw-lighter"> {category.products.length} artículos</small>
              </h3>
            </div>
            {showProducts()}
          </div>
        </main>
        <Newsletter />
        <Footer />
      </>
    );
  } else {
    return <Loading />;
  }
}

export default Category;
