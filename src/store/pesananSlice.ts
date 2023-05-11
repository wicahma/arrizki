import { createAction, createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { AppState } from "./store";
import { Pesanan } from "@/interfaces/pesananInterface";

const hydrate = createAction<AppState>(HYDRATE);

const initialState: Pesanan = {
  reservasiMobil: [],
  reservasiWisata: [],
};

export const pesananSlice = createSlice({
  name: "pesanan",
  initialState,
  reducers: {
    setReservasiMobil(state, action) {
      return {
        ...state,
        reservasiMobil: action.payload,
      };
    },

    setReservasiWisata(state, action) {
      return {
        ...state,
        reservasiWisata: action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(hydrate, (state, action) => {
      // console.group("HYDRATE");
      // console.log({ action, state });
      // console.groupEnd();
      return {
        ...state,
        ...action.payload.pesanan,
      };
    });
  },
});

export const { setReservasiMobil, setReservasiWisata } = pesananSlice.actions;

export default pesananSlice.reducer;
