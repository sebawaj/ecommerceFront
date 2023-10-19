import React from "react";
import css from "../Admin.module.css";
import Table from "react-bootstrap/Table";
import { useState, useEffect } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Sidebar from "../../Sidebar/Sidebar";
import Button from "react-bootstrap/Button";
import NavbarAdmin from "../NavbarAdmin/NavbarAdmin";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [productLength, setProductLength] = useState(0);
  const [userLength, setUserLength] = useState(0);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const response = await axios({
          method: "get",
          url: `${process.env.REACT_APP_API_BASE_URL}/orders`,
        });
        setOrders(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getOrders();
  }, []);

  useEffect(() => {
    const getProductLength = async () => {
      try {
        const response = await axios({
          method: "get",
          url: `${process.env.REACT_APP_API_BASE_URL}/products`,
        });
        setProductLength(response.data.length);
      } catch (error) {
        console.log(error);
      }
    };
    getProductLength();
  }, []);

  useEffect(() => {
    const getUserLength = async () => {
      try {
        const response = await axios({
          method: "get",
          url: `${process.env.REACT_APP_API_BASE_URL}/users`,
        });
        setUserLength(response.data.length);
      } catch (error) {
        console.log(error);
      }
    };
    getUserLength();
  }, []);

  let ingresos = 0;
  for (const order of orders) {
    ingresos += Number(order.totalPrice);
  }
  return (
    <>
      <NavbarAdmin />
      <Container className="p-0" fluid id={css["backgroundAdminLogin"]}>
        <Sidebar />
        <Row className="m-0">
          <div className="col-2"></div>
          <div className={`${css.backgroundTop} col-10 px-4`}>
            <div className={css.header}>
              <h1 className={`${css.tituloContainer} `}>Dashboard de Administradores</h1>
            </div>
            <div className="row pt-3">
              {" "}
              <Col>
                <Card>
                  <Card.Header>
                    {" "}
                    <h5>
                      {" "}
                      <i className="bi bi-receipt"></i> Ingresos del Mes
                    </h5>
                  </Card.Header>
                  <Card.Body>
                    <Card.Title>Ingresos</Card.Title>
                    <Card.Text>
                      {" "}
                      <h3> USD {ingresos} </h3>
                    </Card.Text>
                    <Link to={"/admin/orders"}>
                      <Button className={css.adminButton}>Ver todos</Button>
                    </Link>
                  </Card.Body>
                </Card>
              </Col>
              <Col>
                <Card>
                  <Card.Header>
                    {" "}
                    <h5>
                      {" "}
                      <i className="bi bi-person"></i> Cantidad de Usuarios
                    </h5>
                  </Card.Header>
                  <Card.Body>
                    <Card.Title>Usuarios</Card.Title>
                    <Card.Text>
                      {" "}
                      <h3> {userLength}</h3>
                    </Card.Text>
                    <Link to={"/admin/users"}>
                      <Button className={css.adminButton}>Ver todos</Button>
                    </Link>
                  </Card.Body>
                </Card>
              </Col>
              <Col>
                <Card>
                  <Card.Header>
                    <h5>
                      <i className="bi bi-box-seam"></i> Cantidad de Productos
                    </h5>
                  </Card.Header>
                  <Card.Body>
                    <Card.Title>Productos</Card.Title>
                    <Card.Text>
                      {" "}
                      <h3> {productLength} </h3>
                    </Card.Text>
                    <Link to={"/admin/products"}>
                      <Button className={css.adminButton}>Ver todos</Button>
                    </Link>
                  </Card.Body>
                </Card>
              </Col>
            </div>
            <div className={css.header}>
              <h2 className={`${css.tituloContainer} `}>Últimas 50 ordenes</h2>
            </div>
            <div className={css.tableProducts}>
              <Table striped bordered hover className={`${css.table} mt-2`}>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>ID Usuario</th>
                    <th>Productos</th>
                    <th>Precio Total</th>
                    <th>Estado de la Orden</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => {
                    return (
                      <tr>
                        <td>{order.id}</td>
                        <td>{order.userId}</td>
                        <td>
                          {order.products.products.map((product) => {
                            return <p>• {product.title} </p>;
                          })}
                        </td>
                        <td>USD {order.totalPrice}</td>
                        <td>{order.status}</td>
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

export default AdminDashboard;
