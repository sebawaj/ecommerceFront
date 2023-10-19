import React from "react";
import css from "./Review.module.css";
import Rating from "react-rating";
import { format } from "date-fns";
import { es } from "date-fns/locale";

export default function Review({ review }) {
  return (
    <div className="my-2 p-3 border-bottom">
      <div>
        <img
          src={`${process.env.REACT_APP_API_BASE_IMG_URL}/${review.user.avatar}`}
          alt="User img"
          className={`${css.userAvatar} rounded-pill`}
        />
        <small className="mx-2 mfw-semibold">
          {review.user.firstname} {review.user.lastname}
        </small>
        <small>
          <small>{format(new Date(review.createdAt), "dd/MM/yyyy")} </small>
        </small>
      </div>
      <Rating
        className="d-block"
        emptySymbol="bi bi-star"
        fullSymbol={`bi bi-star-fill ${css.stars}`}
        readonly="true"
        initialRating={review.rating}
      />
      <p>{review.content}</p>
    </div>
  );
}
