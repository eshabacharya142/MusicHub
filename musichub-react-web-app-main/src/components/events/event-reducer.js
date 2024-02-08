import { createSlice } from "@reduxjs/toolkit";
import {
  createEventThunk,
  deleteEventThunk,
  getAllEventsThunk,
  getEventDetailsThunk,
  getEventsByUserIdThunk,
} from "./event-thunks";

const initialState = {
  event: [],
  eventById: [],
  loading: false,
  eventCreateError: false,
  eventNotFoundError: false,
};

const EventReducer = createSlice({
  name: "event",
  initialState,
  extraReducers: {
    [createEventThunk.pending]: (state) => {
      state.eventCreateError = false;
      state.eventNotFoundError = false;
      state.loading = true;
    },
    [createEventThunk.fulfilled]: (state, { payload }) => {
      state.eventCreateError = false;
      state.eventNotFoundError = false;
      state.loading = false;
      state.event.push(payload);
    },
    [createEventThunk.rejected]: (state, { payload }) => {
      state.eventCreateError = true;
      state.eventNotFoundError = false;
    },
    [getAllEventsThunk.pending]: (state) => {
      state.eventCreateError = false;
      state.eventNotFoundError = false;
      state.loading = true;
    },
    [getAllEventsThunk.fulfilled]: (state, { payload }) => {
      state.eventCreateError = false;
      state.eventNotFoundError = false;
      state.loading = false;
      state.event = payload;
    },

    [getEventDetailsThunk.pending]: (state, { payload }) => {
      state.eventCreateError = false;
      state.eventNotFoundError = false;
      state.loading = true;
    },
    [getEventDetailsThunk.fulfilled]: (state, { payload }) => {
      state.eventCreateError = false;
      state.eventNotFoundError = false;
      state.loading = false;
      state.eventById = payload;
    },
    [getEventDetailsThunk.rejected]: (state, payload) => {
      state.eventCreateError = false;
      state.eventNotFoundError = true;
    },
    [deleteEventThunk.fulfilled]: (state, action) => {
      state.events = state.events.filter((event) => {
        return event.id !== action.payload;
      });
    },
    [getEventsByUserIdThunk.pending]: (state, action) => {
      state.event = [];
      state.loading = true;
    },
    [getEventsByUserIdThunk.fulfilled]: (state, action) => {
      state.event = action.payload;
      state.loading = false;
    },
  },
});

export default EventReducer.reducer;
