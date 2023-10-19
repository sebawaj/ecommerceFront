import React, { useState } from "react";
import { Col, Button, Row, Container, Card, Form, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import css from "../Edit/Edit.module.css";
import NavbarAdmin from "../NavbarAdmin/NavbarAdmin";
import Sidebar from "../../Sidebar/Sidebar";
import { useSelector } from "react-redux";

export default function CreateCategory() {
  let admin = useSelector((state) => state.persistedReducer.admin);
  const [categoryImg, setCategoryImg] = useState("");
  const [categoryName, setcategoryName] = useState("");

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleCreateCategory = async (event) => {
    event.preventDefault();
    try {
      let formdata = new FormData(event.target);
      await axios({
        headers: {
          Authorization: `Bearer ${admin.token}`,
        },
        method: "post",
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${admin.token}`,
        },
        url: `${process.env.REACT_APP_API_BASE_URL}/categories`,
        data: formdata,
      });
      navigate("/admin/categories");
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  return (
    <>
      <NavbarAdmin />
      <Sidebar />
      <Row className="p-0 m-0">
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
                      <p>No se pudo crear la categoría</p>
                    </Alert>
                  )}
                  <Card.Body>
                    <div className="mb-3">
                      <h2 className="mb-2 text-center ">Crear Categoría</h2>
                      <div className="mb-3">
                        <Form onSubmit={handleCreateCategory}>
                          <Form.Group className="mb-3 py-2" controlId="categoryName">
                            <Form.Label className="text-center">Nombre de la categoría</Form.Label>
                            <Form.Control
                              type="text"
                              value={categoryName}
                              name="name"
                              required
                              onChange={(event) => setcategoryName(event.target.value)}
                              placeholder="Maderas"
                            />
                          </Form.Group>

                          <Form.Group className="mb-3 py-2" controlId="categoryImg">
                            <Form.Label className="text-center">Imagen de la categoría</Form.Label>
                            <Form.Control
                              type="file"
                              value={categoryImg}
                              name="img"
                              required
                              onChange={(event) => setCategoryImg(event.target.value)}
                            />
                          </Form.Group>

                          <Form.Group className="mb-3" controlId="buttonsubmit">
                            <div className="d-grid">
                              <Button type="submit" id={css["button"]}>
                                Confirm{" "}
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
