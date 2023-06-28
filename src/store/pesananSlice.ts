import { createAction, createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { AppState } from "./store";
import { Pesanan } from "@/interfaces/pesananInterface";

const hydrate = createAction<AppState>(HYDRATE);

const initialState: Pesanan = {
  reservasiMobil: [],
  reservasiWisata: [],
  reservasiOutbond: [],
  reservasiCustom: [],
  paxSelectedWisata: [],
  minimumPersonSelectedOutbond: 0,
  selectedResMobil: null,
  selectedResWisata: null,
  selectedResOutbond: null,
  selectedResCustom: null,
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

    setReservasiOutbond(state, action) {
      return {
        ...state,
        reservasiOutbond: action.payload,
      };
    },

    setReservasiCustom(state, action) {
      return {
        ...state,
        reservasiCustom: action.payload,
      };
    },

    setPaxWisata(state, action) {
      return {
        ...state,
        paxSelectedWisata: action.payload,
      };
    },

    setSelectedResOutbond(state, action) {
      return {
        ...state,
        selectedResOutbond: action.payload,
      };
    },

    setSelectedResMobil(state, action) {
      return {
        ...state,
        selectedResMobil: action.payload,
      };
    },

    setSelectedResWisata(state, action) {
      return {
        ...state,
        selectedResWisata: action.payload,
      };
    },

    setSelectedResCustom(state, action) {
      return {
        ...state,
        selectedResCustom: action.payload,
      };
    },

    setMinimumPerson(state, action) {
      return {
        ...state,
        minimumPersonSelectedOutbond: action.payload,
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

export const {
  setReservasiMobil,
  setReservasiWisata,
  setReservasiOutbond,
  setReservasiCustom,
  setSelectedResMobil,
  setSelectedResOutbond,
  setSelectedResWisata,
  setSelectedResCustom,
  setPaxWisata,
  setMinimumPerson,
} = pesananSlice.actions;

export default pesananSlice.reducer;
