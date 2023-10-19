import React from "react";
import css from "./Admin.module.css";
import Table from "react-bootstrap/Table";
import { useState, useEffect } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Sidebar from "../Sidebar/Sidebar";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import NavbarAdmin from "./NavbarAdmin/NavbarAdmin";

const AdminReviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const getReviews = async () => {
      try {
        const response = await axios({
          method: "get",
          url: `${process.env.REACT_APP_API_BASE_URL}/reviews`,
        });
        setReviews(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getReviews();
  }, []);
  return (
    <>
      <NavbarAdmin />
      <Container className="p-0" fluid id={css["backgroundAdminLogin"]}>
        <Sidebar />
        <Row className="m-0">
          <div className="col-2"></div>
          <div className={`${css.backgroundTop} col-10 px-4`}>
            <div className={css.header}>
              <h2 className={`${css.tituloContainer} `}>Panel de Reviews</h2>
            </div>
            <div className={css.tableProducts}>
              <Table striped bordered hover className={`${css.table} mt-2`}>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Rating</th>
                    <th>Content</th>
                    <th>User Id</th>
                  </tr>
                </thead>
                <tbody>
                  {reviews.map((review, index) => {
                    return (
                      <tr key={index}>
                        <td>{review.id}</td>
                        <td>{review.rating}</td>
                        <td>{review.content}</td>
                        <td>{review.userId}</td>
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

export default AdminReviews;
