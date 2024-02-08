import React from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

const SongCard = ({ song }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/song/details/${song.idSong}`);
  };
  
  return (
    <Col sm={6} md={6} lg={3} className="mb-4">
      <Card className="mt-4 mb-4 h-100">
        <Card.Img variant="top" src={song.cover_medium} />
        <Card.Body>
          <Card.Title>{song.title}</Card.Title>
          <Card.Text>
            <h6>
              <span>Album: {song.album_name}</span>
            </h6>
            <h5>
              <span className="badge bg-secondary">By {song.artist}</span>{" "}
            </h5>
            <Button onClick={handleClick}>View Details</Button>
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default SongCard;
