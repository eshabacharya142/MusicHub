import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "../index.css";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { parseTime } from "../events/parseTime";
import { deleteReviewThunk, updateReviewThunk } from "../reviews/reviews-thunks";


const ReviewComponent = ({ rerender, u }) => {
  const { currentUser } = useSelector((event) => event.users);
  const [editable, setEditable] = useState(false);
  const [editReview, setEditReview] = useState(u.review);
  const dispatch = useDispatch();
  const updateReviewHandle = () => {
    const newReview = {
      ...u,
      review: editReview,
    };
    dispatch(updateReviewThunk(newReview));
    setEditable(false);
  };

  const deleteReviewHandle = () => {
    dispatch(deleteReviewThunk(u._id))
    .then(() => {
      setEditable(false);
      rerender();
    })
    .catch((error) => {
      console.log(error);
    });
  };

  return (
    <li className={"list-group-item"}>
      {!editable && currentUser && currentUser._id === u.host._id && (
        <h5>
          <i
            className="bi bi-pencil-fill float-end wd-cursor-pointer"
            onClick={() => setEditable(!editable)}
          ></i>
        </h5>
      )}

      <span className={"fw-bold"}>
        <Link className={"text-black"} to={`/profile/${u.host._id}`}>
          {u.host.username}
        </Link>
      </span>
      <span>
        <i className="bi bi-dot"></i>
        {parseTime(u.time)}
      </span>
      {editable ? (
        <>
          <Form.Control
            className={"mb-2 mt-2"}
            onChange={(event) => setEditReview(event.target.value)}
            as="textarea"
            value={editReview}
          />
          <Button
            variant={"primary"}
            className={"me-2"}
            onClick={updateReviewHandle}
          >
            Update
          </Button>
          <Button
            variant={"danger"}
            className={"me-2"}
            onClick={deleteReviewHandle}
          >
            Delete
          </Button>
          <Button variant={"secondary"} onClick={() => setEditable(false)}>
            Cancel
          </Button>
        </>
      ) : (
        <p>{u.review}</p>
      )}
    </li>
  );
};

export default ReviewComponent;
