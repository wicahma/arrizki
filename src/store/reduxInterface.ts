import { AlertProps } from "@/components/micros/alerts/Alert";
import Produk from "@/pages/admin/produk/produkInterface";

export interface Main {
  alert: AlertProps;
}

export interface reduxState {
  produk: Produk;
  main: Main;
}
