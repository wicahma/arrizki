import Produk from "@/pages/admin/produk/produkInterface";
import { createAction, createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { AppState } from "./store";

const hydrate = createAction<AppState>(HYDRATE);

const initialState: Produk = {
  tableWisata: [],
  tableMobil: [],
  selectedCar: "",
  paketWisata: [],
};

export const produkSlice = createSlice({
  name: "produk",
  initialState,
  reducers: {
    setMobilState(state, action) {
      state.tableMobil = action.payload;
    },

    setWisataState(state, action) {
      state.tableWisata = action.payload;
    },

    setSelectedCar(state, action) {
      state.selectedCar = action.payload;
    },

    setPaketWisata(state, action) {
      console.group("SET PAKET WISATA");
      console.log({ action });
      console.log({ state });
      console.groupEnd();
      state.paketWisata = action.payload;
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

export const { setMobilState, setWisataState, setSelectedCar } =
  produkSlice.actions;

export const selectMobilState = (state: Produk) => state.tableMobil;

export default produkSlice.reducer;
