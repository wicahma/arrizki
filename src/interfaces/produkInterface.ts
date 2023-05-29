import { type } from "os";
import { EnumType } from "typescript";
import * as Yup from "yup";

interface mobil {
  id?: string;
  nama: string;
  seat: string;
  harga: string;
  fasilitas: string;
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
  fasilitas: string;
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

interface outbond {
  _id: String;
  namaTempat: String;
  keterangan: String;
  hargaMinimum: String;
  status: String;
  image: String;
}

export interface wisataPilihan extends Omit<wisata, "status"> {
  _id?: string;
  jenisPaket: jenisPaket[];
  namaPaket: string;
  rundown: string[];
  status: status;
}

export interface outbondPilihan extends outbond {
  jenisPaket: jenisPaketOutbond[];
}

interface paketWisata {
  id: string;
  rundown: string[];
  tempatWisata: string[];
  images: string[];
  pax: string[];
}

interface jenisPaketOutbond {
  _id?: string;
  fasilitas: String[];
  namaPaket: string;
  minimumPerson: number;
  harga: number;
  images: string[];
}

export default interface Produk {
  tableWisata: wisata[];
  tableMobil: mobil[];
  tableOutbond: outbond[];
  selectedCar: string | null;
  selectedJumlahPeserta: string | null;
  jumlahPesertaMinimum: string | null;
  paketWisata: paketWisata[];
  paketOutbond: jenisPaketOutbond[];
  selectedDataWisata: wisataPilihan | null;
  selectedDataMobil: mobilPilihan | null;
  selectedDataOutbond: outbondPilihan | null;
  selectedDataWisataImage: jenisPaket[] | null;
  selectedDataOutbondImage: jenisPaketOutbond[] | null;
  newWisataImage: any | null;
  newOutbondImage: any | null;
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
  status: string | status | undefined;
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
  status: "",
  jenisPaket: [jenisPaketData],
  fetchType: "create",
};

export interface createMobil {
  _id?: string;
  nama: string | undefined;
  seat: number | undefined;
  harga: number | undefined;
  fasilitas: string | undefined;
  images: string | undefined;
  status: string | status | undefined;
  fetchType: fetchType;
}

export const createMobilData: createMobil = {
  _id: "",
  nama: "",
  seat: 0,
  harga: 0,
  images: "",
  fasilitas: "",
  status: "",
  fetchType: "create",
};

export interface createOutbond {
  _id?: string;
  keterangan: string;
  nama: string;
  jenisPaket: jenisPaketOutbond[];
  status: string | status | undefined;
  fetchType: fetchType;
}

export const jenisPaketOutbondData: jenisPaketOutbond = {
  fasilitas: [""],
  harga: 0,
  images: [""],
  minimumPerson: 0,
  namaPaket: "",
};

export const createOubondData: createOutbond = {
  _id: "",
  keterangan: "",
  nama: "",
  jenisPaket: [jenisPaketOutbondData],
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
                .typeError("Mohon masukkan hanya angka")
                .min(1, "Jumlah pax minimal 1, "),
              harga: Yup.number()
                .required("Harga pax harus diisi !")
                .typeError("Mohon masukkan hanya angka")
                .min(1000, "Harga pax minimal Rp. 1000"),
            })
          )
          .required("Pax harus diisi !"),
        images: Yup.array(),
      })
    )
    .required("Jenis paket harus diisi !"),
});

export const mobilValidationSchema = Yup.object().shape({
  nama: Yup.string()
    .required("Nama mobil harus diisi !")
    .max(100, "Nama mobil maksimal 100 karakter"),
  seat: Yup.number()
    .required("Seat mobil harus diisi !")
    .typeError("Mohon masukkan hanya angka")
    .min(1, "Seat mobil minimal 1, "),
  harga: Yup.number()
    .typeError("Mohon masukkan hanya angka")
    .required("Harga mobil harus diisi !")
    .min(1, "Harga mobil minimal Rp. 1.000"),
  fasilitas: Yup.string().required("Fasilitas mobil harus diisi !"),
  images: Yup.mixed().when(["fetchType"], (fetchType, schema) => {
    if (fetchType.toString() === "create") {
      return schema.required("Gambar mobil harus diisi !");
    }
    return schema;
  }),
});

export const outbondValidationSchema = Yup.object().shape({
  keterangan: Yup.string()
    .required("Keterangan harus diisi !")
    .max(100, "Keterangan maksimal 100 karakter"),
  nama: Yup.string()
    .required("Nama tempat harus diisi !")
    .max(100, "Nama tempat maksimal 100 karakter"),
  jenisPaket: Yup.array()
    .min(1, "Minimal ada 1 jenis paket !")
    .of(
      Yup.object().shape({
        fasilitas: Yup.array()
          .min(1, "Minimal ada 1 Fasilitas!")
          .of(Yup.string().required("Isi data Fasilitas!"))
          .required("Fasilitas harus diisi !"),
        namaPaket: Yup.string()
          .required("Nama Paket Dibutuhkan")
          .max(100, "Nama Paket Maksimal 100 huruf!"),
        minimumPerson: Yup.number()
          .typeError("Mohon masukkan hanya angka")
          .required("Mohon masukkan Jumlah peserta minimal!")
          .min(1, "Minimal peserta adalah 1!"),
        harga: Yup.number()
          .typeError("Mohon masukkan hanya angka")
          .required("Mohon masukkan Harga!")
          .min(1000, "Minimal Harga Rp. 1.000!"),
      })
    )
    .required("Jenis paket harus diisi !"),
});

export type { jenisPaket, pax, jenisPaketOutbond };
