import { setAlert, setLoading } from "@/store/mainSlice";
import { setMinimumPerson, setPaxWisata } from "@/store/pesananSlice";
import axios from "axios";
import * as Yup from "yup";

export interface ReservasiWisata {
  _id: string;
  jenisWisata: string;
  paketWisataId: string;
  namaReservant: string;
  phoneNumber: string;
  email: string;
  instagram: string;
  jumlahPeserta: number;
  tanggalMulai: string;
  waktuJemput: string;
  lokasiJemput: string;
  pesananTambahan: string;
  harga: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ReservasiMobil {
  _id: string;
  namaReservant: string;
  phoneNumber: string;
  email: string;
  instagram: string;
  tanggalReservasi: string;
  waktuAntar: string;
  unitId: {
    _id: string;
    unitName: string;
    seat: number;
    pricePerDay: number;
    fasilitas: string;
    imageId: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
  lokasiAntar: string;
  pesananTambahan: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ReservasiOutbond {
  _id: string;
  jenisWisata: string;
  paketWisataId: string;
  namaReservant: string;
  phoneNumber: string;
  email: string;
  instagram: string;
  jumlahPeserta: string;
  tanggalMulai: string;
  waktuJemput: string;
  lokasiJemput: string;
  pesananTambahan: string;
  harga: string;
  createdAt: string;
  updatedAt: string;
  __v: string;
}

export interface ReservasiCustom {
  _id: string;
  namaReservant: string;
  phoneNumber: string;
  email: string;
  instagram: string;
  jumlahPeserta: number;
  tanggalReservasi: string;
  waktuJemput: string;
  lokasiJemput: string;
  listWisata: string;
  armada: string;
  fasilitasPilihan: string;
  harga: string;
  pesananTambahan: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Pesanan {
  reservasiWisata: ReservasiWisata[];
  reservasiMobil: ReservasiMobil[];
  reservasiOutbond: ReservasiOutbond[];
  reservasiCustom: ReservasiCustom[];
  paxSelectedWisata: [];
  minimumPersonSelectedOutbond: number;
  selectedResMobil: ReservasiMobil | null;
  selectedResWisata: ReservasiWisata | null;
  selectedResOutbond: ReservasiOutbond | null;
  selectedResCustom: ReservasiCustom | null;
}

//NOTE - Wisata Form Interface
export interface WisataFormProps {
  id?: string | undefined;
  nama: string | undefined;
  email: string | undefined;
  instagram: string | undefined;
  nomorTelepon: string | undefined;
  paketID: string | undefined;
  jumlahPeserta: string | undefined;
  tanggalReservasi: string | undefined;
  waktuJemput: string | undefined;
  lokasiJemput: string | undefined;
  pesananTambahan: string | undefined;
  type: "admin" | "user" | string | undefined;
}

//NOTE - Wisata Validation Schema
export const wisataValidator = Yup.object().shape({
  nama: Yup.string().required("Nama harus diisi !"),
  email: Yup.string()
    .email("Email tidak valid")
    .required("Email harus diisi !"),
  instagram: Yup.string()
    .max(50, "Username maksimal instagram adalah 50!")
    .notRequired(),
  nomorTelepon: Yup.string()
    .required("Nomor telepon harus diisi !")
    .test(
      "must-start-with-08",
      "Nomor Telepon harus dimulai dengan 08",
      (value, context) => (value?.toString().startsWith("08") ? true : false)
    )
    .test("only-digits", "Masukan Nomor telepon yang valid !", (value) =>
      /^\d+$/g.test(value?.toString()) ? true : false
    )
    .min(9, "Nomor telepon harus nimimal 9 digit !"),
  paketID: Yup.string().required("Paket wisata harus diisi !"),
  jumlahPeserta: Yup.number()
    .typeError("Jumlah peserta harus diisi !")
    .required("Jumlah peserta harus diisi !"),
  tanggalReservasi: Yup.date()
    .typeError("Tanggal reservasi harus berupa tanggal !")
    .required("Tanggal reservasi harus diisi !")
    .min(new Date(), "Tanggal reservasi tidak boleh kurang dari hari ini !"),
  waktuJemput: Yup.string().required("Waktu jemput harus diisi !"),
  lokasiJemput: Yup.string().required("Lokasi jemput harus diisi !"),
});

//NOTE - Outbond Form Interface
export interface OutbondFormProps {
  id?: string | undefined;
  nama: string | undefined;
  email: string | undefined;
  instagram: string | undefined;
  nomorTelepon: string | undefined;
  paketID: string | undefined;
  jumlahPeserta: string | undefined;
  tanggalReservasi: string | undefined;
  waktuJemput: string | undefined;
  lokasiJemput: string | undefined;
  pesananTambahan: string | undefined;
  type: "admin" | "user" | string | undefined;
}

//NOTE - Outbond Validation Schema
export const outbondValidator = Yup.object().shape({
  nama: Yup.string().required("Nama harus diisi !"),
  email: Yup.string()
    .email("Email tidak valid")
    .required("Email harus diisi !"),
  instagram: Yup.string()
    .max(50, "Username maksimal instagram adalah 50!")
    .notRequired(),
  nomorTelepon: Yup.string()
    .required("Nomor telepon harus diisi !")
    .test(
      "must-start-with-08",
      "Nomor Telepon harus dimulai dengan 08",
      (value, context) => (value?.toString().startsWith("08") ? true : false)
    )
    .test("only-digits", "Masukan Nomor telepon yang valid !", (value) =>
      /^\d+$/g.test(value?.toString()) ? true : false
    )
    .min(9, "Nomor telepon harus nimimal 9 digit !"),
  paketID: Yup.string().required("Paket wisata harus diisi !"),
  jumlahPeserta: Yup.number()
    .typeError("Jumlah pesert a harus diisi !")
    .required("Jumlah peserta harus diisi !"),
  tanggalReservasi: Yup.date()
    .typeError("Tanggal reservasi harus berupa tanggal !")
    .required("Tanggal reservasi harus diisi !")
    .min(new Date(), "Tanggal reservasi tidak boleh kurang dari hari ini !"),
  waktuJemput: Yup.string().required("Waktu jemput harus diisi !"),
  lokasiJemput: Yup.string().required("Lokasi jemput harus diisi !"),
});

export const getPaketWisata = async ({
  paketID,
  dispatch,
}: {
  paketID: string;
  dispatch: any;
}) => {
  dispatch(setLoading(true));
  const paket = await axios
    .get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/wisata/paket/${paketID}`, {
      headers: {
        Authorization: `Bearer ${
          (localStorage.getItem("token") || sessionStorage.getItem("token")) ??
          ""
        }`,
      },
    })
    .then((res) => {
      dispatch(setPaxWisata(res.data.data[0].jenisPaket.pax));
      return res.data.data[0];
    })
    .catch((err) =>
      dispatch(
        setAlert({
          type: "error",
          message: "Terjadi kesalahan pada server! data gagal diambil!",
          show: true,
        })
      )
    )
    .finally(() => {
      dispatch(setLoading(false));
    });
  return paket;
};

export const getPaketOutbond = async ({
  paketID,
  dispatch,
}: {
  paketID: string;
  dispatch: any;
}) => {
  dispatch(setLoading(true));
  const paket = await axios
    .get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/outbond/paket/${paketID}`, {
      headers: {
        Authorization: `Bearer ${
          (localStorage.getItem("token") || sessionStorage.getItem("token")) ??
          ""
        }`,
      },
    })
    .then((res) => {
      dispatch(setMinimumPerson(res.data.data[0].jenisPaket.minimumPerson));
      return res.data.data[0];
    })
    .catch((err) =>
      dispatch(
        setAlert({
          type: "error",
          message: "Terjadi kesalahan pada server! data gagal diambil!",
          show: true,
        })
      )
    )
    .finally(() => {
      dispatch(setLoading(false));
    });
  return paket;
};
