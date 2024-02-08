import { createAsyncThunk } from "@reduxjs/toolkit";
import { findNotesBySearchTerm } from "../../services/search-service";

export const findNotesBySearchTermThunk = createAsyncThunk(
  "findNotesBySearchTerm",
  async(term) => await findNotesBySearchTerm(term)
);