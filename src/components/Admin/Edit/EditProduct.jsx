import React, { useState, useEffect } from "react";
import { Col, Button, Row, Container, Card, Form, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import css from "./Edit.module.css";
import { useParams } from "react-router-dom";
import NavbarAdmin from "../NavbarAdmin/NavbarAdmin";
import Sidebar from "../../Sidebar/Sidebar";
import { useSelector } from "react-redux";

export default function EditProduct() {
  let admin = useSelector((state) => state.persistedReducer.admin);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imgs, setImgs] = useState("");
  const [stock, setStock] = useState("");
  const [CategoryId, setCategoryId] = useState("");

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await axios({
          method: "get",
          url: `${process.env.REACT_APP_API_BASE_URL}/products/${id}`,
        });
        setProduct(response.data);
        console.log(response.data);
        setTitle(response.data.title);
        setDescription(response.data.description);
        setPrice(response.data.price);
        setStock(response.data.stock);
        setCategoryId(response.data.categoryId);
      } catch (error) {
        console.log(error);
      }
    };
    getProduct();
  }, []);

  const handleEditProduct = async (event) => {
    event.preventDefault();
    let formdata = new FormData(event.target);
    try {
      await axios({
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${admin.token}`,
        },
        method: "patch",
        url: `${process.env.REACT_APP_API_BASE_URL}/products/${product.id}`,
        data: formdata,
      });
      navigate("/admin/products");
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  return (
    <>
      <NavbarAdmin />
      <Sidebar />
      <Row className="m-0 p-0">
        <div className="col-2"></div>
        <div className="col-10 p-0">
          <Container fluid id={css["background"]}>
            <Row
              id={css["content"]}
              className="py-3 d-flex justify-content-center align-items-center"
            >
              <Col xs={11} sm={8} md={6} xl={4}>
                <Card className="px-4">
                  {error && (
                    <Alert variant="danger" onClose={() => setError(false)} dismissible>
                      <p>No se pudo editar el producto</p>
                    </Alert>
                  )}
                  <Card.Body>
                    <div className="mb-3">
                      <h2 className="mb-2 text-center ">Editar Producto</h2>
                      <div className="mb-3">
                        <Form onSubmit={handleEditProduct}>
                          <Form.Group className="mb-3 " controlId="title">
                            <Form.Label className="text-center">Nombre del producto</Form.Label>
                            <Form.Control
                              type="text"
                              value={title}
                              name="title"
                              onChange={(event) => setTitle(event.target.value)}
                              placeholder="Jarron de ceramica"
                            />
                          </Form.Group>

                          <Form.Group className="mb-3" controlId="description">
                            <Form.Label className="text-center">Descripción</Form.Label>
                            <Form.Control
                              type="text"
                              value={description}
                              name="description"
                              onChange={(event) => setDescription(event.target.value)}
                              placeholder="Jarron de ceramica modelado color beige..."
                            />
                          </Form.Group>

                          <Form.Group className="mb-3" controlId="price">
                            <Form.Label className="text-center">Precio</Form.Label>
                            <Form.Control
                              type="number"
                              value={price}
                              name="price"
                              onChange={(event) => setPrice(event.target.value)}
                              placeholder="USD"
                            />
                          </Form.Group>

                          <Form.Group className="mb-3" controlId="imgformFile">
                            <Form.Label className="text-center">Seleccionar Imágenes</Form.Label>
                            <Form.Control
                              type="file"
                              value={imgs}
                              name="imgs"
                              multiple
                              accept="image/*"
                              onChange={(event) => setImgs(event.target.value)}
                              placeholder="Seleccionar imagenes"
                            />
                          </Form.Group>

                          <Form.Group className="mb-3" controlId="stock">
                            <Form.Label className="text-center">Definir Stock</Form.Label>
                            <Form.Control
                              type="number"
                              value={stock}
                              name="stock"
                              onChange={(event) => setStock(event.target.value)}
                              placeholder="Definir stock remanente"
                            />
                          </Form.Group>

                          <Form.Group className="mb-3" controlId="CategoryId">
                            <Form.Label className="text-center">ID de la categoría</Form.Label>
                            <Form.Control
                              type="number"
                              value={CategoryId}
                              name="CategoryId"
                              onChange={(event) => setCategoryId(event.target.value)}
                              placeholder="Definir categoría de producto"
                            />
                          </Form.Group>

                          <Form.Group className="mb-3" controlId="buttonsubmit">
                            <div className="d-grid">
                              <Button type="submit" id={css["button"]}>
                                Confirmar{" "}
                              </Button>
                            </div>
                          </Form.Group>
                        </Form>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <Card.Body />
          </Container>
        </div>
      </Row>
    </>
  );
}
