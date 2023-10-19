import css from "./SobreEsteProyecto.module.css";
import { Container, Row, Col } from "react-bootstrap";
import PageNavbar from "../../PageNavbar/PageNavbar";
import Footer from "../../Footer/Footer";
import { Link } from "react-router-dom";

function SobreEsteProyecto() {
  return (
    <>
      <PageNavbar />
      <Container fluid className="p-0">
        <section className={`${css.darkSection} row m-0 px-5`}>
          <div className={`${css.profile} col-12 col-md-6 col-lg-4 align-items-center`}>
            <img
              src={`${process.env.REACT_APP_API_BASE_IMG_URL}/Foto_Nico.png`}
              alt="Logo"
              className="w-50 ms-2 mb-4"
            />
            <h4>Nicolás Ross</h4>
            <div className={css.icons}>
              <a href="https://github.com/nicoroke" target="_blank" rel="noreferrer">
                <i className={`${css.profileIcon} bi bi-github`}></i>
              </a>
              <a
                href="https://www.linkedin.com/in/nicol%C3%A1s-ross-kegel-1a968414b/"
                target="_blank"
                rel="noreferrer"
              >
                <i className={`${css.profileIcon} bi bi-linkedin`}></i>
              </a>
            </div>
          </div>
          <div className={`${css.profile} col-12 col-md-6 col-lg-4 align-items-center`}>
            <img
              src={`${process.env.REACT_APP_API_BASE_IMG_URL}/Foto_Kevin.png`}
              alt="Logo"
              className="w-50 ms-2 mb-4"
            />
            <h4>Kevin Lapizaga</h4>
            <div className={css.icons}>
              <a href="https://github.com/kevin4555" target="_blank">
                <i className={`${css.profileIcon} bi bi-github`}></i>
              </a>
              <a href="https://linkedin.com/in/kevin-lapizaga/" target="_blank">
                <i className={`${css.profileIcon} bi bi-linkedin`}></i>
              </a>
            </div>
          </div>
          <div className={`${css.profile} col-12 col-md-6 col-lg-4 align-items-center`}>
            <img
              src={`${process.env.REACT_APP_API_BASE_IMG_URL}/Foto_Maia.png`}
              alt="Logo"
              className="w-50 ms-2 mb-4"
            />
            <h4>Maia Chamorro</h4>
            <div className={css.icons}>
              <a href="https://github.com/lemilegram" target="_blank">
                <i className={`${css.profileIcon} bi bi-github`}></i>
              </a>
              <a href="https://www.linkedin.com/in/maia-chamorro/" target="_blank">
                <i className={`${css.profileIcon} bi bi-linkedin`}></i>
              </a>
            </div>
          </div>
        </section>
        <section className={css.greenSection}>
          <h1>eCommerce</h1>
          <h2>Proyecto Final Bootcamp</h2>
        </section>
        <section className={`${css.platinumSection}`} id={css["infoSection"]}>
          <div id={css["infoProyecto"]} className="col-md-9 col-lg-7 col-xl-6 col-xxl-5 mx-auto">
            <div className="d-flex flex-column flex-md-row align-items-center">
              <a href="https://ha.dev">
                <img src="ha_logo.png" alt="" />
              </a>
              <p className="px-3">
                Esto es <b>Manos Creativas</b>, un <b>eCommerce ficticio</b> realizado por 3
                compañeros a lo largo de 3 semanas como proyecto final del{" "}
                <b>Bootcamp de Hack Academy</b>. El Bootcamp de Full-Stack development de Hack
                Academy es un curso
                <b> intensivo</b> de 3 meses con una carga horaria de más de 600 horas.
              </p>
            </div>
          </div>
        </section>
        <section className={`${css.platinumSection}`}>
          <h3>Tecnologías Utilizadas</h3>
          <div className="row" id={css["iconList"]}>
            <div className="col-sm-6 col-md-3">
              <div>
                <img src="icons/icons8-bootstrap-32.png" alt="" />
                <h5>Bootstrap</h5>
              </div>
              <div>
                <img src="icons/icons8-express-js-30.png" alt="" />
                <h5>Expressjs</h5>
              </div>
            </div>
            <div className="col-sm-6 col-md-3">
              <div>
                <img src="icons/icons8-react-30.png" alt="" />
                <h5>React</h5>
              </div>
              <div>
                <img src="icons/icons8-redux-30.png" alt="" />
                <h5>Redux</h5>
              </div>
            </div>
            <div className="col-sm-6 col-md-3">
              <div>
                <img src="icons/icons8-node-js-32.png" alt="" />
                <h5>Node.js</h5>
              </div>
              <div>
                <img src="icons/icons8-github-30.png" alt="" />
                <h5>GitHub</h5>
              </div>
            </div>
            <div className="col-sm-6 col-md-3">
              <div>
                <img src="icons/icons8-mysql-logo-30.png" alt="" />
                <h5>MySQL</h5>
              </div>
              <div>
                <img src="icons/icons8-sequelize-30.png" alt="" />
                <h5>Sequelize</h5>
              </div>
            </div>
          </div>
        </section>
        <section className={`${css.greenSection2}`}>
          <h2>Algunas Funcionalidades</h2>
          <Row className={`p-3 mx-3 ${css.funcionalidad}`}>
            <Col sm={4} className={`pt-2 text-white`}>
              <img
                src={`${process.env.REACT_APP_API_BASE_IMG_URL}/paneladmin.gif`}
                alt="Logo"
                className={`img-fluid ms-2 mb-4`}
              />
              <h4>Panel de Administradores</h4>
              <p>
                Diseñamos un panel para administradores, donde se pueden encontrar datos de las
                entidades del eCommerce. A este panel solo se puede acceder si se está logueado como
                administrador 🤫
              </p>
            </Col>
            <Col sm={4} className={`pt-2`}>
              <img
                src={`${process.env.REACT_APP_API_BASE_IMG_URL}/crud.gif`}
                alt="Logo"
                className={`img-fluid ms-2 mb-4`}
              />
              <h4>CRUD de Entidades</h4>
              <p>
                En el Panel de Administradores se puede hacer CRUD (Create, Read, Update, Delete) de
                esas entidades! Te invitamos a{" "}
                <Link to={"/admin"} className="text-white">
                  probarlo
                </Link>{" "}
                tú mismo
              </p>
            </Col>
            <Col sm={4} className={`pt-2`}>
              <img
                src={`${process.env.REACT_APP_API_BASE_IMG_URL}/newsletter.gif`}
                alt="Logo"
                className={`img-fluid ms-2 mb-4`}
              />
              <h4>Newsletter</h4>
              <p>
                Si nos dejas tu email, te podemos enviar más información del proyecto! (Te
                prometemos que solo lo enviaremos 1 vez). Esto lo logramos con la librería
                Nodemailer.
              </p>
            </Col>
          </Row>
        </section>
      </Container>
      <Footer />
    </>
  );
}

export default SobreEsteProyecto;
