import axios from "axios";

const SEARCH_URL = process.env.REACT_APP_SEARCH_URL;
const API_KEY = process.env.REACT_APP_API_KEY;

export const findNotesBySearchTerm = async (term) => {
  try {
    const response = await axios.get(`${SEARCH_URL}${term}`, {
      headers: {
        'x-rapidapi-host': 'deezerdevs-deezer.p.rapidapi.com',
        'x-rapidapi-key': API_KEY,
      }
    });
  
    const obj=JSON.stringify(response.data);

    const obje2=JSON.parse(obj);
    let result = [];
 
    if (obje2.data) {
      Object.entries(obje2.data).forEach(prop => result.push({
        "idSong": prop[1].id,
        "title": prop[1].title,
        "cover_medium": prop[1].album.cover_medium,
        "artist": prop[1].artist.name,
        "album_name": prop[1].album.title,
        "cover_big": prop[1].album.cover_big
      }));
    }
 
  
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
