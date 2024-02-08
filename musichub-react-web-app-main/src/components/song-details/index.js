import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import "./index.css";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import { faStar as faSolidStar } from "@fortawesome/free-solid-svg-icons";

import { songDetailsThunks } from "./song-details-thunks";
import { createReviewThunk, findReviewsBySongsThunk } from "../reviews/reviews-thunks";
import { userLikesSongsThunk } from "../likes/likes-thunks";
import ReviewComponent from "./review-component";


const BASE_API_URL = process.env.REACT_APP_BASE;
const USERS_URL = BASE_API_URL + "/users";

const api = axios.create({ withCredentials: true });

const SongDetails = () => {
  const { currentUser } = useSelector((state) => state.users);
  const { song, loading } = useSelector((state) => state.songDetails);
  const { reviews } = useSelector((state) => state.reviews);
  const dispatch = useDispatch();
  const { mid } = useParams();
  const [review, setReview] = useState("");
  const [liked, setLiked] = useState(false);
  const [userLikes, setUserLikes] = useState([]);

  useEffect(() => {
    dispatch(songDetailsThunks(mid));
    dispatch(findReviewsBySongsThunk(mid));
    dispatch(userLikesSongsThunk(mid));
  }, []);

  const postSongReview = () => {
    const postReview = {
      idSong: song.id,
      review: review,
    };
    dispatch(createReviewThunk(postReview));
    setReview("");
    dispatch(findReviewsBySongsThunk(mid));
    reloadReviews();
  };

  const reloadReviews = () => {
    dispatch(findReviewsBySongsThunk(mid));
  };

  useEffect(() => {
    if (currentUser) {
      api.get(`${USERS_URL}/${currentUser._id}/likes`).then((response) => {
        setUserLikes(response.data);
        const isLiked = response.data.some(
          (like) => like.idSong === song.id && like.liked
        );
        setLiked(isLiked);
      });
    }
  }, [currentUser, song.id]);

  const toggleSongLike = () => {
    if (!liked) {
      const like = {
        idSong: song.id,
        liked: true
      };
      dispatch(userLikesSongsThunk(like));
      setLiked(true);
    } else {
      api
        .delete(`${USERS_URL}/${currentUser._id}/likes/${song.id}`)
        .then(() => {
          setLiked(false);
          setUserLikes(userLikes.filter((like) => like.idSong !== song.id));
        })
        .catch((error) => console.log(error));
    }
  };

  const navigate = useNavigate();

  function handleGoBack(event) {
    event.preventDefault();
    navigate(-1);
  }

  return (
    <div className={"mt-3"}>
      <div className={"mb-2"}>
        <a
          onClick={handleGoBack}
          href="src/components/song-details#"
          className={"text-decoration-none text-secondary"}
        >
          <i className="bi bi-arrow-left me-1"></i>Back
        </a>
      </div>
      {!loading && (
        <>
          <h2>{song.title}</h2>
          <h5>Album: {song.album_name}</h5>
          <h5>
            <span className="badge bg-secondary">By {song.artist}</span>{" "}
            <span
              className="wd-float-right wd-font-size-15px"
              disabled={!currentUser}
              onClick={() => toggleSongLike()}
            >
              {currentUser && liked && (
                <span className="wd-pointer">
                  <FontAwesomeIcon className="wd-yellow" icon={faSolidStar} />
                </span>
              )}
              {currentUser && !liked && (
                <span className="wd-pointer">
                  <FontAwesomeIcon className="wd-gray" icon={faStar} />
                </span>
              )}
            </span>
          </h5>
          <Container>
            <Row>
              <Col sm={"12"} md={"6"}>

                <img
                  className={"w-100 mb-3"}
                  alt={"Picture of " + song.title}
                  src={song.cover_big}
                />

                <h4>MP3:</h4>
                {song.preview && (
                  <audio controls>
                    <source src={song.preview} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                )}
              </Col>

            </Row>
          </Container>
          <hr />

          <h4>
            Reviews
            <span className={"text-secondary"}>
              <i className="bi bi-dot"></i>
              {reviews.length}
            </span>
          </h4>
          <Container>
            {currentUser ? (
              <Form>
                <Form.Group className={"mb-2"}>
                  <FloatingLabel
                    controlId="floatingTextarea2"
                    label="Write a review here"
                  >
                    <Form.Control
                      as="textarea"
                      placeholder="Write a review here"
                      value={review}
                      onChange={(event) => setReview(event.target.value)}
                      style={{ height: "6rem" }}
                    />
                  </FloatingLabel>
                  <Form.Text>Logged in as {currentUser.username}.</Form.Text>
                </Form.Group>

                <Button
                  variant="primary"
                  onClick={() => postSongReview()}
                  disabled={review === ""}
                >
                  Post Review
                </Button>
              </Form>
            ) : (
              <Alert variant={"warning"} className={"mb-3"}>
                Please login to post review.
              </Alert>
            )}
            <ul className={"list-group mb-3 mt-3"}>
              {reviews.map((u) => (
                <ReviewComponent u={u} rerender={reloadReviews} key={u._id} />
              ))}
            </ul>
          </Container>
        </>
      )}
    </div>
  );
};

export default SongDetails;
