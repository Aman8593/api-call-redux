import { configureStore } from "@reduxjs/toolkit";
import getAllDetailsApiCallReducer from "../features/slice";

export const store = configureStore({
  reducer: {
    getAllDetailsApiCall: getAllDetailsApiCallReducer,
  },
});