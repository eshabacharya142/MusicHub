import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getSongReviewsService,
  songDetailsService,
  postSongCommentService,
} from "../../services/song-details-service";

const BASE_API_URL = process.env.REACT_APP_BASE;
const USER_API_URL = BASE_API_URL + "/song";

export const songDetailsThunks = createAsyncThunk(
  "songDetailsThunks/get",
  async (mid) => await songDetailsService(mid)
);

export const getSongReviewsThunk = createAsyncThunk(
  "song/getComments",
  async (mid) => await getSongReviewsService(mid)
);

export const postSongCommentThunk = createAsyncThunk(
  "song/postComment",
  async (comment) => await postSongCommentService(comment)
);
