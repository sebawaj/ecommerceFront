import css from "./CartInformationItem.module.css";

function CartInformationItem({ item }) {
  return (
    <>
      <div className="d-flex justify-content-between align-items-center my-4">
        <div className="d-flex flex-column flex-sm-row justify-content-sm-between align-items-sm-center">
          <div className={`position-relative ${css.infoImgContainer}`}>
            <img
              src={process.env.REACT_APP_API_BASE_IMG_URL + `/${item.img.img1}`}
              alt=""
              className={`${css.infoImgContainer} rounded`}
            />
            <small className="position-absolute top-0 end-0 rounded-pill bg-secondary text-white px-2">
              {item.quantity}
            </small>
          </div>

          <small className="fs-6 d-block mt-2 mt-sm-0 ms-sm-2 ">{item.title}</small>
        </div>
        <div className="d-inline">
          <small className="fs-6 fw-semibold">${item.price * item.quantity}</small>
        </div>
      </div>
      <hr />
    </>
  );
}

export default CartInformationItem;
