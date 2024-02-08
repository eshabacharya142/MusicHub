import axios from "axios";

const API_KEY = process.env.REACT_APP_API_KEY;

const TOP_URL1 = "https://deezerdevs-deezer.p.rapidapi.com/track/2299840635";
const TOP_URL2 = "https://deezerdevs-deezer.p.rapidapi.com/track/2216207477";
const TOP_URL3 = "https://deezerdevs-deezer.p.rapidapi.com/track/2289342455";
const TOP_URL4 = "https://deezerdevs-deezer.p.rapidapi.com/track/2105158337";


const fetchRandomSong = async () => {
  const response1 = await axios.get(`${TOP_URL1}`, {
    headers: {
      'X-RapidAPI-Key': API_KEY, 
      'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
    },
  });
  const response2 = await axios.get(`${TOP_URL2}`, {
    headers: {
      'X-RapidAPI-Key': API_KEY, 
      'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
    },
  });
  const response3 = await axios.get(`${TOP_URL3}`, {
    headers: {
      'X-RapidAPI-Key': API_KEY, 
      'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
    },
  });
  const response4 = await axios.get(`${TOP_URL4}`, {
    headers: {
      'X-RapidAPI-Key': API_KEY, 
      'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
    },
  });

  
  const obj=JSON.stringify(response1.data);

  const obje2=JSON.parse(obj);
  let result1 = [];

  if (obje2) {
    result1.idSong=obje2.id;
    result1.title= obje2.title;
    result1.artist=obje2.artist.name;
    result1.album_name=obje2.album.title;
    result1.cover_medium = obje2.album.cover_big;
    result1.preview = obje2.preview;
  }

  const objR2=JSON.stringify(response2.data);

  const obje2R1=JSON.parse(objR2);
  let result2 = [];

  if (obje2R1) {
    result2.idSong=obje2R1.id;
    result2.title= obje2R1.title;
    result2.artist=obje2R1.artist.name;
    result2.album_name=obje2R1.album.title;
    result2.cover_medium = obje2R1.album.cover_big;
    result2.preview = obje2R1.preview;
  }

  
  
  const objR3=JSON.stringify(response3.data);

  const obje2R3=JSON.parse(objR3);
  let result3 = [];

  if (obje2R3) {
    result3.idSong=obje2R3.id;
    result3.title= obje2R3.title;
    result3.artist=obje2R3.artist.name;
    result3.album_name=obje2R3.album.title;
    result3.cover_medium = obje2R3.album.cover_big;
    result3.preview = obje2R3.preview;
  }

  const objR4=JSON.stringify(response4.data);

  const obje2R4=JSON.parse(objR4);
  let result4 = [];

  if (obje2R4) {
    result4.idSong=obje2R4.id;
    result4.title= obje2R4.title;
    result4.artist=obje2R4.artist.name;
    result4.album_name=obje2R4.album.title;
    result4.cover_medium = obje2R4.album.cover_big;
    result4.preview = obje2R4.preview;
  }

  const returnSongs=[ result1, result2, result3, result4];
  
  return returnSongs;
};

export default fetchRandomSong;