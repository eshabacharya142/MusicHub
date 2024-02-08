import axios from "axios";

const BASE_API_URL = process.env.REACT_APP_BASE;
const FOLLOWS_API = BASE_API_URL + "/follows";
const USERS_API = BASE_API_URL + "/users";

const api = axios.create({ withCredentials: true });

export const followUser = async (follow) => {
  const response = await api.post(`${FOLLOWS_API}`, follow);
  return response.data;
};

export const findFollowers = async (followed) => {
  const response = await api.get(`${USERS_API}/${followed}/followers`);
  return response.data;
};

export const findFollowing = async (follower) => {
  const response = await api.get(`${USERS_API}/${follower}/following`);
  return response.data;
};
