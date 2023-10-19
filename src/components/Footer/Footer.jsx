import css from "./Footer.module.css";
import { Link } from "react-router-dom";
import logo from "../../logo nuevo.png";

function Footer() {
  return (
    <>
      <footer className="container" id={css["text-footer"]}>
        <nav className="row">
          <div className="col-2 d-none d-md-block"></div>
          <div className="col-12 col-md-4">
            <img src={logo} alt="Logo" className="w-50 ms-2" />

            <ul className={`list-unstyled ${css.green} ms-4 mt-2`}>
              <li>
                <i className="bi bi-geo-alt"></i> Rodano 3373, Montevideo, Uruguay
              </li>
              <li>
                <i className="bi bi-telephone"></i> +598 99 61 85 63
              </li>
              <li>
                <i className="bi bi-envelope"></i> atiduniformesuy@gmail.com
              </li>
            </ul>
          </div>
          <div className="col-1 d-none d-md-block"></div>
          <div className="col-12 col-md-3 pt-4">
            <h5>Productos</h5>
            <ul className={`list-unstyled ${css.linkStyle}`}>
              <li>
                <Link>
                  <i className="bi bi-arrow-right-short"></i>Camisas
                </Link>
              </li>
              <li>
                <Link>
                  <i className="bi bi-arrow-right-short"></i>Pantalones
                </Link>
              </li>
              <li>
                <Link>
                  <i className="bi bi-arrow-right-short"></i>Remeras
                </Link>
              </li>
              <li>
                <Link>
                  <i className="bi bi-arrow-right-short"></i>Camperas
                </Link>
              </li>
              <li>
                <Link>
                  <i className="bi bi-arrow-right-short"></i>Buzos
                </Link>
              </li>
              <li>
                <Link>
                  <i className="bi bi-arrow-right-short"></i>Mamelucos
                </Link>
              </li>
              <li>
                <Link>
                  <i className="bi bi-arrow-right-short"></i>Otros
                </Link>
              </li>
            </ul>
          </div>
          <div className="container">
            <p className="text-center border-top pt-2 mt-2">© 2023, Atid Uniformes</p>
          </div>
        </nav>
      </footer>
    </>
  );
}

export default Footer;
