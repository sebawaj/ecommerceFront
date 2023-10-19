import React, { useState } from "react";
import ProductMini from "../../components/ProductMini/ProductMini";

import css from "./MultiItemCarousel.module.css";

const Carousel = ({ products, productsPerPage }) => {
  const [activePage, setActivePage] = useState(1);

  const totalPages = Math.ceil(products.length / productsPerPage);
  const startIndex = (activePage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;

  const handlePrevClick = () => {
    let newActivePage = activePage - 1;
    if (newActivePage < 1) {
      newActivePage = totalPages;
    }
    setActivePage(newActivePage);
  };

  const handleNextClick = () => {
    let newActivePage = activePage + 1;
    if (newActivePage > totalPages) {
      newActivePage = 1;
    }
    setActivePage(newActivePage);
  };
  console.log();
  return (
    <div>
      <div className=" justify-content-center position-relative">
        <div className="row">
          {products.slice(startIndex, endIndex).map((product, index) => (
            <ProductMini product={product} key={index} />
          ))}
        </div>
        <div>
          <button
            type="button"
            onClick={handlePrevClick}
            className={` ${css.btn} btn btn-outline-dark position-absolute top-50 start-0 translate-middle rounded-circle bg-light`}
          >
            <i className="bi bi-arrow-left h1"></i>
          </button>
          <button
            type="button"
            onClick={handleNextClick}
            className={`${css.btn} btn btn-outline-dark position-absolute top-50 start-100 translate-middle rounded-circle bg-light`}
          >
            <i className="bi bi-arrow-right h1"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
