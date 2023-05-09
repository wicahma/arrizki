import { type } from "os";
import { EnumType } from "typescript";
import * as Yup from "yup";

interface mobil {
  id?: string;
  nama: string;
  seat: string;
  harga: string;
}

enum status {
  "aktif",
  "nonaktif",
}

type fetchType = "create" | "update";

export interface mobilPilihan extends mobil {
  _id?: string;
  unitName: string;
  pricePerDay: string;
  imageId: string;
  status: status;
}

interface wisata {
  id?: string;
  nama: string;
  idJenisPaket: string;
  fasilitas: string[];
  status: boolean;
}

export interface wisataPilihan extends Omit<wisata, "status"> {
  _id?: string;
  jenisPaket: jenisPaket[];
  namaPaket: string;
  rundown: string[];
  status: status;
}

interface paketWisata {
  id: string;
  rundown: string[];
  tempatWisata: string[];
  images: string[];
  pax: string[];
}

export default interface Produk {
  tableWisata: wisata[];
  tableMobil: mobil[];
  selectedCar: string | null;
  selectedJumlahPeserta: string | null;
  paketWisata: paketWisata[];
  selectedDataWisata: wisataPilihan | null;
  selectedDataMobil: mobilPilihan | null;
  selectedDataWisataImage: jenisPaket[] | null;
  newWistaImage: Object | null;
}

interface pax {
  jumlah: number;
  harga: number;
}

interface jenisPaket {
  _id?: string;
  rundown: string[];
  tempatWisata: string[];
  pax: pax[];
  images: string[];
}

export interface createWisata {
  _id?: string;
  fasilitas: string[];
  nama: string;
  jenisPaket: jenisPaket[];
  status: string | "aktif" | "nonaktif" | undefined;
  fetchType: fetchType;
}

export const paxData: pax = {
  jumlah: 0,
  harga: 0,
};

export const jenisPaketData: jenisPaket = {
  rundown: [""],
  tempatWisata: [""],
  pax: [paxData],
  images: [""],
};

export const createWisataData: createWisata = {
  _id: "",
  fasilitas: [""],
  nama: "",
  status: "true",
  jenisPaket: [jenisPaketData],
  fetchType: "create",
};

export interface createMobil {
  _id?: string;
  nama: string | undefined;
  seat: number | undefined;
  harga: number | undefined;
  images: string | undefined;
  status: string | "aktif" | "nonaktif" | undefined;
  fetchType: fetchType;
}

export const createMobilData: createMobil = {
  _id: "",
  nama: "",
  seat: 0,
  harga: 0,
  images: "",
  status: "",
  fetchType: "create",
};

export const wisataValidationSchema = Yup.object().shape({
  fasilitas: Yup.array()
    .min(1, "Minimal ada 1 fasilitas !")
    .of(Yup.string().required("Isi data fasilitas harus diisi !"))
    .required("Fasilitas harus diisi !"),
  nama: Yup.string().required("Nama wisata harus diisi !"),
  jenisPaket: Yup.array()
    .min(1, "Minimal ada 1 jenis paket !")
    .of(
      Yup.object().shape({
        rundown: Yup.array()
          .min(1, "Minimal ada 1 rundown !")
          .of(Yup.string().required("Isi data rundown !"))
          .required("Rundown harus diisi !"),
        tempatWisata: Yup.array()
          .min(1, "Minimal ada 1 tempat wisata !")
          .of(Yup.string().required("Isi data tempat wisata !"))
          .required("Tempat wisata harus diisi !"),
        pax: Yup.array()
          .min(1, "Minimal ada 1 pax !")
          .of(
            Yup.object().shape({
              jumlah: Yup.number()
                .required("Jumlah pax harus diisi !")
                .min(1, "Jumlah pax minimal 1, "),
              harga: Yup.number()
                .required("Harga pax harus diisi !")
                .min(1, "Harga pax minimal 1 "),
            })
          )
          .required("Pax harus diisi !"),
        images: Yup.array(),
      })
    )
    .required("Jenis paket harus diisi !"),
});

export const mobilValidationSchema = Yup.object().shape({
  nama: Yup.string().required("Nama mobil harus diisi !"),
  seat: Yup.number()
    .required("Seat mobil harus diisi !")
    .min(1, "Seat mobil minimal 1, "),
  harga: Yup.number()
    .required("Harga mobil harus diisi !")
    .min(1, "Harga mobil minimal 1 "),
  images: Yup.mixed().when(["fetchType"], (fetchType, schema) => {
    if (fetchType.toString() === "create") {
      return schema.required("Gambar mobil harus diisi !");
    }
    return schema;
  }),
});

export type { jenisPaket, pax };
