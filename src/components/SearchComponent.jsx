import React, { useState, useEffect } from "react";
import ProductMini from "./ProductMini/ProductMini";
import axios from "axios";
import PageNavbar from "./PageNavbar/PageNavbar";
import css from "../components/pages/Product/Product.module.css";
import { Button, Container, Row, Form, InputGroup } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Loading from "./Loading/Loading";

const SearchComponent = () => {
  const { text } = useParams();
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState(text);

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

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(search);
  };
  if (products) {
    return (
      <>
        <PageNavbar />
        <Container className="mt-5">
          <Row>
            <Form onSubmit={handleSearch}>
              <InputGroup className={`mb-3 ${css["barra-filtrar"]}`}>
                <Form.Control
                  type="text"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                  placeholder="Escriba el producto que busca"
                />
                <Button variant="outline-secondary" id="button-addon2" size="lg" type="submit">
                  <i className={`bi bi-search`}></i>
                </Button>
              </InputGroup>
            </Form>

            {products
              .filter((dato) => dato.title.toLowerCase().includes(search.toLocaleLowerCase()))
              .map((product) => (
                <ProductMini product={product} key={product.id} />
              ))}
          </Row>
        </Container>
      </>
    );
  } else {
    return <Loading />;
  }
};

export default SearchComponent;
