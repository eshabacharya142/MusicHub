import { createAsyncThunk } from "@reduxjs/toolkit";
import { createReview, updateReviewService, deleteReviewService, findReviewsBySongs, findReviewsByHost } 
        from "../../services/reviews-service";

export const createReviewThunk = createAsyncThunk(
  "createReviewThunk",
  async (review) => createReview(review)
);

export const updateReviewThunk = createAsyncThunk(
  "updateReviewThunk",
  async (comment) => updateReviewService(comment)
);

export const deleteReviewThunk = createAsyncThunk(
  "deleteReviewCommentThunk",
  async (reviewID) => deleteReviewService(reviewID)
);

export const findReviewsBySongsThunk = createAsyncThunk(
  "findReviewsByNotesThunk",
  async (idSong) => findReviewsBySongs(idSong)
);

export const findReviewsByHostThunk = createAsyncThunk(
  "findReviewsByHostThunk",
  async (host) => findReviewsByHost(host)
);
