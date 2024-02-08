import { createSlice } from "@reduxjs/toolkit";
import { createReviewThunk, updateReviewThunk, deleteReviewThunk, findReviewsBySongsThunk, findReviewsByHostThunk } 
        from "./reviews-thunks";
import { deleteReviewService } from "../../services/reviews-service";

const reviewsReducer = createSlice({
  name: "reviews",
  initialState: {
    reviews: [],
  },
  extraReducers: {
    [createReviewThunk.fulfilled]: (state, action) => {
      state.reviews.unshift(action.payload);
    },
    [updateReviewThunk.fulfilled]: (state, action) => {
      const newReview = action.payload;
      const index = state.reviews.findIndex((u) => u._id === newReview._id);
      state.reviews[index] = newReview;
    },
    [deleteReviewThunk.fulfilled]: (state, action) => {
      const deletedReview = action.payload;
      state.reviews = state.reviews.filter((u) => u._id !== deletedReview._id);
    },
    [findReviewsBySongsThunk.fulfilled]: (state, action) => {
      state.reviews = action.payload;
    },
    [findReviewsByHostThunk.fulfilled]: (state, action) => {
      state.reviews = action.payload;
    },
  },
});

export default reviewsReducer.reducer;