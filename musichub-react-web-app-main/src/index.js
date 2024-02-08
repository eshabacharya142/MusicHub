import React, { useEffect, useMemo, useState } from "react";
import Button from "react-bootstrap/Button";
import Chart from "./chart";
import axios from "axios";

const BASE_API_URL = process.env.REACT_APP_BASE;

function AdminDashboard() {
  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  const [userStats, setUserStats] = useState([]);
  const api = axios.create({ withCredentials: true });

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await api.get(`${BASE_API_URL}/stats`);
        const statsList = res.data.sort(function (a, b) {
          return a._id - b._id;
        });
        statsList.map((item) =>
          setUserStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], "New Users": item.total },
          ])
        );
      } catch (err) {
        console.log(err);
        throw err;
      }
    };
    getStats();
  }, [MONTHS]);

  const monthlyUserStats = userStats.slice(0, 12);

  const [reviews, setReviews] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    api.get("https://musichub-node-server-app.onrender.com/api/reviews").then((response) => {
      setReviews(response.data);
    });
  }, []);

  useEffect(() => {
    api.get("https://musichub-node-server-app.onrender.com/event").then((response) => {
      setEvents(response.data);
    });
  }, []);

  const handleReviewDelete = (id) => {
    api
      .delete(`https://musichub-node-server-app.onrender.com/api/reviews/song/${id}`)
      .then(() => {
        const updatedReviews = reviews.filter((review) => review._id !== id);
        setReviews(updatedReviews);
      })
      .catch((error) => {
        console.error(`Error deleting event with id ${id}: ${error.message}`);
      });
  };

  const handleEventDelete = (id) => {
    api
      .delete(`https://musichub-node-server-app.onrender.com/event/${id}`)
      .then(() => {
        const updatedEvents = events.filter((event) => event._id !== id);
        setEvents(updatedEvents);
      })
      .catch((error) => {
        console.error(`Error deleting event with id ${id}: ${error.message}`);
      });
  };

  return (
    <div className="home">
    <h2 className="sectionTitle">Monthly New Users</h2>
    <Chart data={monthlyUserStats} title="" grid dataKey="New Users" />

    {reviews.length > 0 && (
      <div className="reviews">
        <h2 className="sectionTitle mt-4">All Reviews</h2>
        <ul className="list-group" style={{ maxWidth: "900px" }}>
          {reviews.map((review) => (
            <li key={review.id} className="list-group-item d-flex align-items-center">
              <p className="reviewText">{review.review}</p>
              <div className="ms-auto">
                <Button
                  className="deleteButton btn btn-danger btn-sm"
                  onClick={() => handleReviewDelete(review._id)}
                >
                  Delete
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    )}

    {events.length > 0 && (
      <div className="events">
        <h2 className="sectionTitle mt-4">All Events</h2>
          <ul className="list-group" style={{ maxWidth: "900px" }}>
            {events.map((event) => (
              <li key={event._id} className="list-group-item d-flex align-items-center">
                <div>
                  <h5 className="mt-3">{event.title}</h5>
                  <p className="hostText">Host: {event.host.hostName}</p>
                  <p className="eventText">{event.event}</p>
                </div>
                <div className="ms-auto">
                  <Button
                    className="deleteButton btn btn-danger btn-sm"
                    onClick={() => handleEventDelete(event._id)}
                  >
                    Delete
                  </Button>
                </div>
              </li>
            ))}
          </ul>
      </div>
    )}
  </div>
  );
}

export default AdminDashboard;
