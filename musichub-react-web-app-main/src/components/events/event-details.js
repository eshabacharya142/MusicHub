import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getEventDetailsThunk } from "./event-thunks";
import { useEffect } from "react";
import Container from "react-bootstrap/Container";
import { Alert } from "react-bootstrap";

const EventDetails = () => {
  const { bid } = useParams();
  const { currentUser } = useSelector((state) => state.users);
  const { eventById, loading, eventNotFoundError } = useSelector(
    (state) => state.event
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getEventDetailsThunk(bid));
  }, []);

  return (
    <div className="eventDetailsContainer">
      <Link to="/event" className="backLink">
        <i className="bi bi-arrow-left me-1"></i>Back
      </Link>
      <Container>
        {eventNotFoundError ? (
          <Alert variant="danger" className="mt-5">
            <Alert.Heading>Event not found!</Alert.Heading>
            <p>Please navigate back or choose another event.</p>
          </Alert>
        ) : !loading ? (
          <>
            <h1 className="mt-3 eventTitle">{eventById.title}</h1>
            <div className="hostInfo">
              {eventById.host && (
                <span>
                  Hosted by:{" "}
                  <Link
                    to={"/profile/" + eventById.host.hostId}
                    className="hostName"
                  >
                    {eventById.host.hostName}
                  </Link>
                </span>
              )}
            </div>
            <h5 className="eventDate">
              {new Date(eventById.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
                timeZone: "UTC",
              })}
            </h5>
            <hr />
            <div className="eventDescription">{eventById.description}</div>
            <hr />
            <h4 className="eventPrice">{eventById.price} $</h4>
          </>
        ) : null}
      </Container>
    </div>
  );
};

export default EventDetails;
