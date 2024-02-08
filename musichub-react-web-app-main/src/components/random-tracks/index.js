import React, { useEffect } from "react";
import Row from "react-bootstrap/Row";
import { useDispatch, useSelector } from "react-redux";
import { getRandomSong } from "./getRandomSong";
import SongCard from "../song-card/songCard";

const RandomTracks = () => {
  const { tracks, loading } = useSelector((state) => state.randomSongs);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRandomSong());
  }, [dispatch]);

  

  return (
    <Row>
      {tracks &&
        tracks.map((track) => <SongCard song={track} key={track.id} />)}   
    </Row>
  );
};

export default RandomTracks;