import css from "./Profile.module.css";
import PageNavbar from "../../PageNavbar/PageNavbar";
import Order from "../../Order/Order";
import Newsletter from "../../Newsletter/Newsletter";
import Footer from "../../Footer/Footer";
import MultiItemCarousel from "../../Carousel/MultiItemCarousel";
import { setUser } from "../../../slices/usersSlice";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { removeUser } from "../../../slices/usersSlice";
import { removeAdmin } from "../../../slices/adminSlice";
import { ButtonGroup, Button, Row, Col, Toast } from "react-bootstrap";
import axios from "axios";

function Profile() {
  let user = useSelector((state) => state.persistedReducer.user);
  let admin = useSelector((state) => state.persistedReducer.admin);
  user
    ? (window.document.title = `${user.firstname} ${user.lastname}`)
    : (window.document.title = `${admin.firstname} ${admin.lastname}`);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [show, setShow] = useState(false);
  const [firstname, setFirstname] = useState(user ? user.firstname : admin.firstname);
  const [lastname, setLastname] = useState(user ? user.lastname : admin.lastname);
  const [phone, setPhone] = useState(user ? user.phone : "");
  const [email, setEmail] = useState(user ? user.email : admin.email);
  const [address, setAddress] = useState(user ? user.address : "");
  const [avatar, setAvatar] = useState("");
  const [userToUpdate, setUserToUpdate] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [block, setBlock] = useState("d-block");
  const [none, setNone] = useState("d-none");
  const [error, setError] = useState("");
  const [token, setToken] = useState(user ? user.token : "");
  const [buttonConfirm, setButtonConfirm] = useState("Confirmar");

  function handleUserLogOut() {
    dispatch(removeUser());
    navigate("/");
  }
  function handleAdminLogOut() {
    dispatch(removeAdmin());
    navigate("/");
  }
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 750);
    const getOrders = async () => {
      try {
        const response = await axios({
          method: "get",
          url: `${process.env.REACT_APP_API_BASE_URL}/orders`,
        });
        const response2 = await axios({
          method: "get",
          url: `${process.env.REACT_APP_API_BASE_URL}/products`,
        });
        setOrders(response.data);
        setProducts(response2.data);
      } catch (error) {
        console.log(error);
      }
    };
    getOrders();
  }, []);
  const handleEditUser = async (event) => {
    event.preventDefault();
    let formdata = new FormData(event.target);
    setButtonConfirm(
      <span
        className="spinner-border spinner-border text-white"
        role="status"
        aria-hidden="true"
      ></span>,
    );
    try {
      const response = await axios({
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${user.token}`,
        },
        method: "patch",
        url: `${process.env.REACT_APP_API_BASE_URL}/users/${user.id}`,
        data: formdata,
      });
      dispatch(setUser({ token, ...response.data.user }));
      setButtonConfirm("Confirmar");
    } catch (err) {
      console.log(err);
      setError(true);
    }
    setBlock("d-block");
    setNone("d-none");
  };

  const handleCancelEdit = (event) => {
    event.preventDefault();
    setFirstname(user.firstname);
    setLastname(user.lastname);
    setEmail(user.email);
    setAddress(user.address);
    setPhone(user.phone);
    setAvatar("");
    setBlock("d-block");
    setNone("d-none");
  };

  const ordersFromLoggedUser = orders.filter((order) => user && order.userId === user.id);
  const ordersFromLoggedAdmin = orders.filter((order) => admin && order.adminId === admin.id);
  if (isLoading)
    return (
      <div className="screen">
        <div className="spinner"></div>
      </div>
    );
  else
    return (
      <>
        <Row>
          <Col xs={6}>
            <Toast
              onClose={() => setShow(false)}
              show={show}
              delay={3000}
              autohide
              className={`position-fixed bg-white ${css.rightBottomZero}`}
            >
              <Toast.Body>Tu producto ha sido agregado al carrito.</Toast.Body>
              <div className={css.toast}></div>
            </Toast>
          </Col>
        </Row>
        <PageNavbar />
        <main>
          <div
            id={css["topBanner"]}
            className="container-fluid py-5 d-flex align-item-center justify-content-center flex-column"
          >
            <h1 className="fs-2 fw-bold text-light text-center">Mi Perfil</h1>
            <small className="fs-6 fw-semibold text-light text-center">Home</small>
          </div>
          <div className="container mt-5">
            <div className="col-12 col-lg-8 order-lg-1"></div>
            <div className="row">
              <div className="col-12 col-lg-4 order-lg-1">
                <div id={css["userProfile"]} className="shadow text-center p-4 rounded mb-5">
                  {user ? (
                    <img
                      src={`${process.env.REACT_APP_API_BASE_IMG_URL}/${user.avatar}`}
                      alt="Profile"
                      className={`${css.profileImg} rounded-pill`}
                    />
                  ) : (
                    <img
                      src={`${process.env.REACT_APP_API_BASE_IMG_URL}/Profile_defaultMale.png`}
                      alt="Profile"
                      className={`${css.profileImg} rounded-pill`}
                    />
                  )}
                  {user ? (
                    <>
                      <h2 className="mb-0 mt-3">
                        {user.firstname} {user.lastname}
                      </h2>
                      <small>{user.email}</small>{" "}
                    </>
                  ) : (
                    <>
                      <h2 className="mb-0 mt-3">
                        {admin.firstname} {admin.lastname}
                      </h2>
                      <small>{admin.email}</small>
                    </>
                  )}

                  <div className={`row mt-3 bg-white p-5 p-lg-2 rounded shadow ${block}`}>
                    <div className="col-12 col-sm-6 d-lg-flex flex-lg-column text-start my-2">
                      <small className="fw-bold fs-6">Nombre: </small>
                      {user ? (
                        <small className="fs-6">{user.firstname}</small>
                      ) : (
                        <small className="fs-6">{admin.firstname}</small>
                      )}
                    </div>
                    <div className="col-12 col-sm-6 d-lg-flex flex-lg-column text-start my-2">
                      <small className="fw-bold fs-6">Apellido: </small>
                      {user ? (
                        <small className="fs-6">{user.lastname}</small>
                      ) : (
                        <small className="fs-6">{admin.lastname}</small>
                      )}
                    </div>
                    <div className="col-12 col-sm-6 d-lg-flex flex-lg-column text-start my-2">
                      {user && (
                        <>
                          <small className="fs-6 fw-bold">Teléfono: </small>
                          <small className="fs-6">{user.phone}</small>
                        </>
                      )}
                    </div>
                    <div className="col-12 d-lg-flex flex-lg-column text-start my-2">
                      <small className="fw-bold fs-6">Email: </small>
                      {user ? (
                        <small className="fs-6">{user.email}</small>
                      ) : (
                        <small className="fs-6">{admin.email}</small>
                      )}
                    </div>
                    <div className="col-12 d-lg-flex flex-lg-column text-start my-2">
                      {user && (
                        <>
                          <small className="fw-bold fs-6">Dirección: </small>
                          <small className="fs-6">{user.address}</small>
                        </>
                      )}
                    </div>
                    {user && (
                      <button
                        className="btn btn-warning"
                        onClick={() => {
                          setBlock("d-none");
                          setNone("d-block");
                        }}
                      >
                        Editar
                      </button>
                    )}
                    {user ? (
                      <button className="btn btn-danger mt-2" onClick={handleUserLogOut}>
                        Cerrar sesión
                      </button>
                    ) : (
                      <button className="btn btn-danger mt-2" onClick={handleAdminLogOut}>
                        Cerrar sesión
                      </button>
                    )}
                  </div>
                  <form onSubmit={handleEditUser}>
                    <div className={`row mt-3 bg-white p-5 p-lg-2 rounded shadow ${none}`}>
                      <div className="col-12 col-sm-6 d-lg-flex flex-lg-column text-start my-2">
                        <label className="fw-bold fs-6">Firstname: </label>
                        <input
                          className="fs-6 rounded"
                          name="firstname"
                          value={firstname}
                          onChange={(event) => setFirstname(event.target.value)}
                        ></input>
                      </div>
                      <div className="col-12 col-sm-6 d-lg-flex flex-lg-column text-start my-2">
                        <label className="fw-bold fs-6">Lastname: </label>
                        <input
                          className="fs-6 rounded"
                          name="lastname"
                          value={lastname}
                          onChange={(event) => setLastname(event.target.value)}
                        ></input>
                      </div>
                      <div className="col-12 col-sm-6 d-lg-flex flex-lg-column text-start my-2">
                        <label className="fw-bold fs-6">Phone: </label>
                        <input
                          className="fs-6 rounded"
                          name="phone"
                          value={phone}
                          onChange={(event) => setPhone(event.target.value)}
                        ></input>
                      </div>
                      <div className="col-12 d-lg-flex flex-lg-column text-start my-2">
                        <label className="fw-bold fs-6">Email: </label>
                        <input
                          className="fs-6 rounded"
                          name="email"
                          value={email}
                          onChange={(event) => setEmail(event.target.value)}
                        ></input>
                      </div>
                      <div className="col-12 d-lg-flex flex-lg-column text-start my-2">
                        <label className="fw-bold fs-6">Address: </label>
                        <input
                          className="fs-6 rounded"
                          name="address"
                          value={address}
                          onChange={(event) => setAddress(event.target.value)}
                        ></input>
                      </div>
                      <div className="col-12 d-lg-flex flex-lg-column text-start my-2">
                        <label className="fw-bold fs-6">Adjuntar Foto: </label>
                        <input
                          className="fs-6 rounded"
                          type="file"
                          accept="image/*"
                          value={avatar}
                          name="avatar"
                          onChange={(event) => setAvatar(event.target.value)}
                        ></input>
                      </div>

                      <ButtonGroup>
                        <Button className="btn btn-warning px-5" type="submit">
                          {buttonConfirm}
                        </Button>
                        {buttonConfirm === "Confirmar" && (
                          <Button className="btn btn-danger" onClick={handleCancelEdit}>
                            <i className="bi bi-x-lg text-white"></i>
                          </Button>
                        )}
                      </ButtonGroup>

                      <button className="btn btn-danger mt-2 " onClick={handleUserLogOut}>
                        Cerrar sesión
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              <div className="col-12 col-lg-8">
                <h2 className="fs-3">Historial de pedidos</h2>

                {ordersFromLoggedUser.length > 0 ? (
                  ordersFromLoggedUser.map((order, index) => <Order order={order} key={index} />)
                ) : ordersFromLoggedAdmin.length > 0 ? (
                  ordersFromLoggedAdmin.map((order, index) => <Order order={order} key={index} />)
                ) : (
                  <div className="mt-4">
                    <p className="fs-6">
                      No haz realizado ningún pedido, aún.
                      <br />
                      Para ver nuestros productos haz
                      <Link to="/categories/1" className="ms-1">
                        Click aqui
                      </Link>
                    </p>
                    <h4>También te recomendamos algunos de nuestros productos</h4>

                    {products && (
                      <MultiItemCarousel
                        products={products.filter((product) => Number(product.rating) === 5)}
                        productsPerPage={4}
                      ></MultiItemCarousel>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
        <Newsletter />
        <Footer />
      </>
    );
}

export default Profile;
