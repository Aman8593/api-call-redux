import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_CONFIG = {
  GET_ALL_DETAILS: {
    method: "GET",
    url: "https://thronesapi.com/api/v2/Characters",
  },
};

const InitialState = {
  data: null,
  loading: false,
  isError: false,
  error: null,
};

export const getAllDetailsApiCall = createAsyncThunk(
  "apiCall",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: API_CONFIG.GET_ALL_DETAILS.method,
        url: API_CONFIG.GET_ALL_DETAILS.url,
      });
      return response.data; // Ensure data is properly extracted
    } catch (error) {
      return rejectWithValue(error.response?.data || "An error occurred");
    }
  }
);

const getAllDetailsApiCallSlice = createSlice({
  name: "getAllDetailsApiCall",
  initialState: InitialState,
  reducers: {
    resetState: (state) => {
      state.data = null;
      state.isError = false;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllDetailsApiCall.pending, (state) => {
        state.loading = true;
        state.isError = false;
        state.error = null;
      })
      .addCase(getAllDetailsApiCall.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.isError = false;
        state.error = null;
      })
      .addCase(getAllDetailsApiCall.rejected, (state, action) => {
        state.loading = false;
        state.isError = true;
        state.error = action.payload || "Failed to fetch data";
      });
  },
});

export const { resetState } = getAllDetailsApiCallSlice.actions;

export default getAllDetailsApiCallSlice.reducer;
