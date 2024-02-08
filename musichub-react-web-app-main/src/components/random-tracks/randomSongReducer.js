import { createSlice } from "@reduxjs/toolkit";
import { getRandomSong } from "./getRandomSong";

const initialState = {
  recipes: [],
  loading: false,
};

const randomSongSlice = createSlice({
  name: "randomSongs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRandomSong.pending, (state) => {
        state.loading = true;
        state.tracks = [];
      })
      .addCase(getRandomSong.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.tracks = payload;
      });
  },
});

export default randomSongSlice.reducer;