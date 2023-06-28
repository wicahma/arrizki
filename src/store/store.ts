import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { mainSlice } from "./mainSlice";
import { pesananSlice } from "./pesananSlice";
import { produkSlice } from "./produkSlice";

const store = configureStore({
  reducer: {
    [mainSlice.name]: mainSlice.reducer,
    [produkSlice.name]: produkSlice.reducer,
    [pesananSlice.name]: pesananSlice.reducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

const makeStore = () => store;

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;

export const wrapper = createWrapper<AppStore>(makeStore);
