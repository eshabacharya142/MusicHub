import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { findReviewsByHostThunk } from "../reviews/reviews-thunks";
import { findUserByIdThunk } from "../users/users-thunk";
import { getEventsByUserIdThunk } from "../events/event-thunks";
import { parseTime } from "../events/parseTime";
import RandomTracks from "../random-tracks";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.users);
  const { event } = useSelector((state) => state.event);
  const { reviews } = useSelector((state) => state.reviews);

  useEffect(() => {
    if (currentUser) {
      dispatch(findUserByIdThunk(currentUser._id));
      dispatch(getEventsByUserIdThunk(currentUser._id));
      dispatch(findReviewsByHostThunk(currentUser._id));
    }
  }, [currentUser, dispatch]);

  return (
    <div>
      <div className="container">
        {currentUser && (
          <h1>
            Welcome {currentUser.firstName}!
          </h1>
        )}

        {(currentUser?.role === "MUSIC-CREATOR" || currentUser?.role === "ADMIN") && (
          <>
            <h4>Recent Events</h4>
            <ul className="list-group mb-3">
              {event && event.length === 0 ? (
                <p>This user hasn't created any events.</p>
              ) : (
                event
                  .filter((bg) => bg.host.hostName === currentUser.username)
                  .map((e) => (
                    <li
                      className="list-group-item"
                      onClick={() => navigate(`/event/details/${e._id}`)}
                      key={e._id}
                    >
                      <h5>{e.title}</h5>
                      <div className="text-secondary">
                        <span>By: {e.host.hostName}</span>
                        <i className="bi bi-dot"></i>
                        <span>{new Date(e.date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                timeZone: "UTC",
                        })}</span>
                      </div>
                    </li>
                  ))
              )}
            </ul>
          </>
        )}

        {currentUser && (
          <>
            <h4>Recent Comments</h4>
            <ul className="list-group mb-3">
              {currentUser && reviews && reviews.length === 0 ? (
                <p>This user hasn't posted any comments yet.</p>
              ) : (
                reviews.map((u) => (
                  <li
                    className="list-group-item"
                    onClick={() => navigate(`/song/details/${u.idSong}`)}
                    key={u._id}
                  >
                    <span className="fw-bold">
                      <Link
                        className="text-black"
                        to={`/profile/${u.host._id}`}
                      >
                        {u.host.username}
                      </Link>
                    </span>
                    <span>
                      <i className="bi bi-dot"></i>
                      {parseTime(u.time)}
                    </span>
                    <p>{u.review}</p>
                  </li>
                ))
              )}
            </ul>
          </>
        )}

<h3>Top Hits</h3>
        <RandomTracks />
      </div>
    </div>
  );
};

export default Home;
