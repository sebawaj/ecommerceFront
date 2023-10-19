import css from "./CartItem.module.css";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart, removeItemFromCart } from "../../../slices/cartSlice";

function CartItem({ item }) {
  let cart = useSelector((state) => state.persistedReducer.cart);
  const cartItem = cart.items.find((cartItem) => cartItem.id === item.id);
  const dispatch = useDispatch();
  const handleAddToCart = () => {
    dispatch(addItemToCart({ ...cartItem, quantity: 1 }));
  };
  const handleRemoveItemFromCart = () => {
    dispatch(removeItemFromCart(cartItem));
  };
  return (
    <>
      <div className="col-12 col-sm-3 my-2 my-sm-4">
        <img
          src={process.env.REACT_APP_API_BASE_IMG_URL + `/${item.img.img1}`}
          alt=""
          className={`${css.productImage} rounded`}
        />
        <div className="mt-1">
          <small className="fs-6">{item.title}</small>
        </div>
      </div>
      <div className="col-12 col-sm-3 my-2 my-sm-auto">
        <small className="fs-6 fw-semibold">
          <span className="d-sm-none">Price: </span> ${item.price}
        </small>
      </div>
      <div className="col-12 col-sm-3 my-2 my-sm-auto text-center">
        <div className={`${css.w7Rem} border p-sm-2 mx-auto mx-sm-0`}>
          <button className="btn fw-semibold mx-auto mx-sm-0" onClick={handleRemoveItemFromCart}>
            -
          </button>{" "}
          <small className=" fw-semibold mx-auto mx-sm-0">{cartItem.quantity}</small>{" "}
          <button className="btn fw-semibold mx-auto mx-sm-0" onClick={handleAddToCart}>
            +
          </button>
        </div>
      </div>
      <div className="col-12 col-sm-3 my-2 my-sm-auto">
        <small className="fs-6 fw-semibold">
          <span className="d-sm-none">Total Price: </span> ${item.price * item.quantity}
        </small>
      </div>
      <hr />
    </>
  );
}

export default CartItem;
