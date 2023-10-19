import React, { useState, useEffect } from "react";
import { Col, Button, Row, Container, Card, Form, Alert } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import NavbarAdmin from "../NavbarAdmin/NavbarAdmin";
import Sidebar from "../../Sidebar/Sidebar";
import css from "./Edit.module.css";
import { useSelector } from "react-redux";

export default function EditCategoryId() {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  let admin = useSelector((state) => state.persistedReducer.admin);

  const [category, setCategory] = useState(null);
  const [categoryName, setCategoryName] = useState("");
  const [categoryImg, setCategoryImg] = useState("");
  const { id } = useParams();

  useEffect(() => {
    const getCategory = async () => {
      try {
        const response = await axios({
          method: "get",
          url: `${process.env.REACT_APP_API_BASE_URL}/categories/${id}`,
        });
        setCategory(response.data);
        setCategoryName(response.data.name);
      } catch (error) {
        console.log(error);
      }
    };
    getCategory();
  }, []);

  const handleEditCategory = async (event) => {
    event.preventDefault();
    try {
      let formdata = new FormData(event.target);
      await axios({
        method: "patch",
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${admin.token}`,
        },
        url: `${process.env.REACT_APP_API_BASE_URL}/categories/${category.id}`,
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
                      <p>No se pudo editar la categoría</p>
                    </Alert>
                  )}
                  <Card.Body>
                    <div className="mb-3">
                      <h2 className="mb-2 text-center ">Editar Categoría</h2>
                      <div className="mb-3">
                        <Form onSubmit={handleEditCategory}>
                          <Form.Group className="mb-3" controlId="categoryName">
                            <Form.Label className="text-center">Nombre de Categoría</Form.Label>
                            <Form.Control
                              type="text"
                              value={categoryName}
                              name="name"
                              onChange={(event) => setCategoryName(event.target.value)}
                              placeholder="Nombre categoria"
                            />
                          </Form.Group>
                          <Form.Group className="mb-3 py-2" controlId="categoryImg">
                            <Form.Label className="text-center">Imagen de la categoría</Form.Label>
                            <Form.Control
                              type="file"
                              value={categoryImg}
                              name="img"
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
