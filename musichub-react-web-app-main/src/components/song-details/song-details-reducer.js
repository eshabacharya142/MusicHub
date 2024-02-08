import { createSlice } from "@reduxjs/toolkit";
import { songDetailsThunks } from "./song-details-thunks";

const initialState = {
  song: {},
  comments: [],
  loading: false,
};

const songDetailsReducer = createSlice({
  name: "songDetailsReducer",
  initialState,
  extraReducers: {
    [songDetailsThunks.pending]: (state) => {
      state.loading = true;
      state.song = {};
      state.comments = {};
    },
    [songDetailsThunks.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.song = payload;
    },
  },
});

export default songDetailsReducer.reducer;
