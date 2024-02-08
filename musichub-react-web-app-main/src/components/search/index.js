import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { findNotesBySearchTermThunk } from "./search-thunks";
import SongCard from "../song-card/songCard";
import Row from "react-bootstrap/Row";
import { useParams, useNavigate } from "react-router-dom";

const Search = () => {
  const { searchName } = useParams();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState(searchName || "");
  const { tracks, loading } = useSelector((state) => state.search);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(findNotesBySearchTermThunk(searchTerm));
  }, [searchTerm]);

  const searchHandle = () => {
    navigate(`/search/${searchTerm}`);
  };
  console.log(tracks);
  return (
    <>
      <h2>Search</h2>
      <div>
        <button className="btn btn-primary float-end" onClick={searchHandle}>
          Search
        </button>
        <input
          className="form-control w-75"
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
          value={searchTerm}
        />
      </div>
      <Row>
        
        {tracks &&
          tracks.map((song) => <SongCard song={song} key={song.idSong} />)}
      </Row>
    </>
  );
};

export default Search;