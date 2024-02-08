import axios from "axios";

const BASE_API_URL = process.env.REACT_APP_BASE;
const SONGS_REVIEWS_API = BASE_API_URL + "/api/reviews/song";
const HOST_REVIEWS_API = BASE_API_URL + "/api/users";

const api = axios.create({ withCredentials: true });

export const createReview = async (review) => {
  const response = await api.post(
    `${SONGS_REVIEWS_API}/${review.idSong}`,
    review
  );
  return response.data;
};

export const updateReviewService = async (review) => {
  const response = await api.put(`${SONGS_REVIEWS_API}/${review._id}`, review);
  return response.data;
};

export const deleteReviewService = async (reviewID) => {
  const response = await api.delete(`${SONGS_REVIEWS_API}/${reviewID}`);
  return response.data;
};

export const findReviewsBySongs = async (idSong) => {
  const response = await api.get(`${SONGS_REVIEWS_API}/${idSong}`);
  return response.data;
};

export const findReviewsByHost = async (host) => {
  const response = await api.get(`${HOST_REVIEWS_API}/${host}/reviews`);
  return response.data;
};
