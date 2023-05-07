import { AlertProps } from "@/components/micros/alerts/Alert";
import Produk from "./produkInterface";

export interface Main {
  alert: AlertProps;
  token: string;
  isLoading: boolean;
}

export interface reduxState {
  produk: Produk;
  main: Main;
}
