import { createAction, createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { AppState } from "./store";
import { Main } from "../interfaces/reduxInterface";

const hydrate = createAction<AppState>(HYDRATE);

const initialState: Main = {
  alert: {
    type: "error",
    message: "none",
    show: false,
  },
};

export const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    
    setAlert(state, action) {
      return {
        ...state,
        alert: action.payload,
      };
    },

  },
  extraReducers: (builder) => {
    builder.addCase(hydrate, (state, action) => {
      console.group("HYDRATE");
      console.log({ action, state });
      console.groupEnd();
      return {
        ...state,
        ...action.payload.main,
      };
    });
  },
});

export const {} = mainSlice.actions;

export default mainSlice.reducer;
