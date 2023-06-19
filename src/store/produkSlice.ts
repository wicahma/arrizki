import Produk from "@/interfaces/produkInterface";
import { createAction, createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { AppState } from "./store";

const hydrate = createAction<AppState>(HYDRATE);

const initialState: Produk = {
  tableWisata: [],
  tableMobil: [],
  tableOutbond: [],
  selectedCar: "",
  selectedJumlahPeserta: "",
  jumlahPesertaMinimum: 0,
  paketWisata: [],
  paketOutbond: [],
  selectedDataWisata: null,
  selectedDataMobil: null,
  selectedDataOutbond: null,
  selectedDataWisataImage: null,
  selectedDataOutbondImage: null,
  newWisataImage: null,
  newOutbondImage: null,
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

    setOutbondState(state, action) {
      return {
        ...state,
        tableOutbond: action.payload,
      };
    },

    setSelectedDataOutbond(state, action) {
      return {
        ...state,
        selectedDataOutbond: action.payload,
      };
    },

    setSelectedDataOutbondImage(state, action) {
      return {
        ...state,
        selectedDataOutbondImage: action.payload,
      };
    },

    setNewOutbondImage(state, action) {
      return {
        ...state,
        newOutbondImage: action.payload,
      };
    },

    setSelectedDataWisataImage(state, action) {
      return {
        ...state,
        selectedDataWisataImage: action.payload,
      };
    },

    setNewWisataImage(state, action) {
      return {
        ...state,
        newWisataImage: action.payload,
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

    setPaketOutbond(state, action) {
      return {
        ...state,
        paketOutbond: action.payload,
      };
    },

    setSelectedJumlahPeserta(state, action) {
      return {
        ...state,
        selectedJumlahPeserta: action.payload,
      };
    },

    setJumlahPesertaMinimum(state, action) {
      return {
        ...state,
        jumlahPesertaMinimum: action.payload,
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
  setPaketOutbond,
  setOutbondState,
  setSelectedJumlahPeserta,
} = produkSlice.actions;

export const selectMobilState = (state: Produk) => state.tableMobil;

export default produkSlice.reducer;
