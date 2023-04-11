import { MobilFormProps } from "@/components/micros/forms/carProps";

interface mobil {
  id: string;
  nama: string;
  seat: string;
  harga: string;
}

interface wisata {
  id: string;
  nama: string;
  idJenisPaket: string;
  fasilitas: string[];
  status: boolean;
}

export default interface Produk {
  tableWisata: wisata[];
  tableMobil: mobil[];
  selectedCar: string;
}
