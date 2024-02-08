import axios from "axios";

const BASE_API_URL = process.env.REACT_APP_BASE;
const EVENT_API = BASE_API_URL + "/event";

const api = axios.create({ withCredentials: true });

export const createEvent = async (event) => {
  const response = await api.post(EVENT_API, event);
  return response.data;
};

export const getAllEvents = async () => {
  const response = await api.get(EVENT_API);
  return response.data;
};

export const getEventDetails = async (eid) => {
  const response = await api.get(`${EVENT_API}/${eid}`);
  return response.data;
};

export const getEventsByUserIdService = async (uid) => {
  const response = await api.get(`${EVENT_API}/user/${uid}`);
  return response.data;
};

export const deleteEvent = async (eid) => {
  const response = await axios.delete(`${EVENT_API}/${eid}`);
  const status = response.data;
  return eid;
};
