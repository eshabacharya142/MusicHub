import { createSlice } from "@reduxjs/toolkit";
import { findNotesBySearchTerm } from "../../services/search-service";
import { findNotesBySearchTermThunk } from "./search-thunks";

const initialState = {
  tracks: [],
  loading: false,
};

const searchReducer = createSlice({
  name: "search",
  initialState,
  extraReducers: {
    [findNotesBySearchTermThunk.fulfilled]: (state, action) => {
      state.tracks = action.payload;
      console.log(action.payload);
    },

  },
});

export default searchReducer.reducer;