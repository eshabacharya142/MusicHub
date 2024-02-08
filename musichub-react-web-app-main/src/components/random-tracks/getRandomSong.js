import { createAsyncThunk } from "@reduxjs/toolkit";
import fetchRandomSong from "./fetchRandomSong";

export const getRandomSong = createAsyncThunk(
  "getRandomSong",
  async () => await fetchRandomSong()
);
export default getRandomSong;