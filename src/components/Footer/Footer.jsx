import css from "./Footer.module.css";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <>
      <footer className="container" id={css["text-footer"]}>
        <nav className="row">
          <div className="col-2 d-none d-md-block"></div>
          <div className="col-12 col-md-4">
            <img
              src={`${process.env.REACT_APP_API_BASE_IMG_URL}/logo.png`}
              alt="Logo"
              className="w-50 ms-2"
            />
            <div className={`${css.socials} ms-4`}>
              <i className={`bi bi-instagram ${css.bi}`} />
              <i className={`bi bi-facebook ${css.bi}`} />
              <i className={`bi bi-twitter ${css.bi}`} />
              <i className={`bi bi-youtube ${css.bi}`} />
            </div>
            <ul className={`list-unstyled ${css.green} ms-4 mt-2`}>
              <li>
                <i className="bi bi-geo-alt"></i> Manos Creativas 123, Montevideo, Uruguay
              </li>
              <li>
                <i className="bi bi-telephone"></i> +59898123456
              </li>
              <li>
                <i className="bi bi-envelope"></i> manoscreativas.ha@gmail.com
              </li>
            </ul>
          </div>
          <div className="col-1 d-none d-md-block"></div>
          <div className="col-12 col-md-3 pt-4">
            <h5>Productos</h5>
            <ul className={`list-unstyled ${css.linkStyle}`}>
              <li>
                <Link>
                  <i className="bi bi-arrow-right-short"></i>Cerámicas
                </Link>
              </li>
              <li>
                <Link>
                  <i className="bi bi-arrow-right-short"></i>Pinturas
                </Link>
              </li>
              <li>
                <Link>
                  <i className="bi bi-arrow-right-short"></i>Maderas
                </Link>
              </li>
              <li>
                <Link>
                  <i className="bi bi-arrow-right-short"></i>Tejidos
                </Link>
              </li>
              <li>
                <Link>
                  <i className="bi bi-arrow-right-short"></i>Decoraciones
                </Link>
              </li>
            </ul>
          </div>
          <div className="container">
            <p className="text-center border-top pt-2 mt-2">© 2023, Manos Creativas</p>
          </div>
        </nav>
      </footer>
    </>
  );
}

export default Footer;
