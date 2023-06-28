import { AlertProps } from "@/components/micros/alerts/Alert";
import Produk from "./produkInterface";
import { Pesanan } from "./pesananInterface";

export interface Main {
  alert: AlertProps;
  token: string;
  isLoading: boolean;
}

export interface reduxState {
  produk: Produk;
  main: Main;
  pesanan: Pesanan;
}
