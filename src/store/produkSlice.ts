import Produk from "@/interfaces/produkInterface";
import { createAction, createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { AppState } from "./store";

const hydrate = createAction<AppState>(HYDRATE);

const initialState: Produk = {
  tableWisata: [],
  tableMobil: [],
  selectedCar: "",
  selectedJumlahPeserta: "",
  paketWisata: [],
  selectedDataWisata: null,
  selectedDataMobil: null,
  selectedDataWisataImage: null,
  newWistaImage: null,
};

export const produkSlice = createSlice({
  name: "produk",
  initialState,
  reducers: {
    setMobilState(state, action) {
      return {
        ...state,
        tableMobil: action.payload,
      };
    },

    setSelectedDataWisataImage(state, action) {
      return {
        ...state,
        selectedDataWisataImage: action.payload,
      };
    },

    setNewWistaImage(state, action) {
      return {
        ...state,
        newWistaImage: action.payload,
      };
    },

    setSelectedDataWisata(state, action) {
      return {
        ...state,
        selectedDataWisata: action.payload,
      };
    },

    setSelectedDataMobil(state, action) {
      return {
        ...state,
        selectedDataMobil: action.payload,
      };
    },

    setWisataState(state, action) {
      return {
        ...state,
        tableWisata: action.payload,
      };
    },

    setSelectedCar(state, action) {
      return {
        ...state,
        selectedCar: action.payload,
      };
    },

    setPaketWisata(state, action) {
      return {
        ...state,
        paketWisata: action.payload,
      };
    },

    setSelectedJumlahPeserta(state, action) {
      return {
        ...state,
        selectedJumlahPeserta: action.payload,
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
        ...action.payload.produk,
      };
    });
  },
});

export const {
  setMobilState,
  setWisataState,
  setSelectedDataWisata,
  setSelectedDataMobil,
  setSelectedCar,
  setPaketWisata,
  setSelectedJumlahPeserta,
} = produkSlice.actions;

export const selectMobilState = (state: Produk) => state.tableMobil;

export default produkSlice.reducer;
