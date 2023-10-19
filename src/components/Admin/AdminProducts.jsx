import React from "react";
import css from "./Admin.module.css";
import { Table, Container, Row, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../Sidebar/Sidebar";
import { Link } from "react-router-dom";
import NavbarAdmin from "./NavbarAdmin/NavbarAdmin";
import { useSelector } from "react-redux";

const AdminProducts = () => {
  const admin = useSelector((state) => state.persistedReducer.admin);
  const [products, setProducts] = useState([]);
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
  }, [products]);

  const handleDeleteProduct = async (product) => {
    try {
      await axios({
        method: "delete",
        headers: {
          Authorization: `Bearer ${admin.token}`,
        },
        url: `${process.env.REACT_APP_API_BASE_URL}/products/${product.id}`,
      });
      setProducts(products.filter((prod) => prod.id !== product.id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <NavbarAdmin />
      <Container className="p-0" fluid id={css["backgroundAdminLogin"]}>
        <Sidebar />
        <Row className="m-0">
          <div className="col-2"></div>
          <div className={`${css.backgroundTop} col-10 px-4`}>
            <div className={css.header}>
              <h2 className={css.tituloContainer}>Panel de Productos</h2>{" "}
              <Link
                to="/admin/createProduct"
                className={`text-decoration-none text-light btn ms-4 mb-2 ${css.adminButton}`}
              >
                Agregar producto
              </Link>
            </div>
            <div className="text-end">
              <div className={css.botonAgregar}></div>
            </div>
            <div className={css.tableProducts}>
              <Table striped bordered hover className={css.table}>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Titulo</th>
                    <th>Descripcion</th>
                    <th>Precio</th>
                    <th>Imagen 1</th>
                    <th>Imagen 2</th>
                    <th>Stock</th>
                    <th>Rating</th>
                    <th>Categoría</th>
                    <th>Acciones </th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product, index) => {
                    return (
                      <tr key={index}>
                        <td>{product.id}</td>
                        <td>{product.title}</td>
                        <td>
                          <p className={css.description}>{product.description}</p>
                        </td>
                        <td>{product.price}</td>
                        <td>
                          {
                            <img
                              src={process.env.REACT_APP_API_BASE_IMG_URL + `/${product.img.img1}`}
                              alt=""
                              className={css.productImg}
                            />
                          }
                        </td>
                        <td>
                          <img
                            src={process.env.REACT_APP_API_BASE_IMG_URL + `/${product.img.img2}`}
                            alt=""
                            className={css.productImg}
                          />
                        </td>
                        <td>{product.stock}</td>
                        <td>{product.rating}</td>
                        <td>{product.categoryId}</td>
                        <td>
                          {" "}
                          <Link
                            to={`/admin/editProduct/${product.slug}`}
                            className="text-decoration-none text-light buttons mb-1 btn btn-warning"
                          >
                            {" "}
                            Editar{" "}
                          </Link>
                          <Button
                            className="buttons"
                            variant="danger"
                            onClick={() => handleDeleteProduct(product)}
                          >
                            Eliminar
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </div>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default AdminProducts;
