import * as Yup from "yup";

export interface customFormProps {
  id?: string;
  nama: string | undefined;
  nomorTelepon: string | undefined;
  email: string | undefined;
  jumlahOrang: string | undefined;
  tanggalReservasi: string | undefined;
  waktuJemput: string | undefined;
  lokasiJemput: string | undefined;
  lokasiAntar: string | undefined;
  armada: string | undefined;
  fasilitas: string | undefined;
  pesananTambahan: string;
  type: "admin" | "user" | string | undefined;
  harga?: string;
}

export const customValidation = Yup.object().shape({
  nama: Yup.string()
    .required("Nama harus diisi !")
    .max(80, "Nama terlalu panjang !"),
  email: Yup.string()
    .email("Email tidak valid")
    .required("Email harus diisi !"),
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
  jumlahOrang: Yup.number()
    .typeError("Jumlah orang harus berupa angka !")
    .required("Jumlah orang harus diisi !")
    .max(200, "Jumlah orang terlalu banyak !"),
  tanggalReservasi: Yup.date()
    .typeError("Tanggal reservasi harus berupa tanggal !")
    .required("Tanggal reservasi harus diisi !")
    .min(new Date(), "Tanggal reservasi tidak boleh kurang dari hari ini !"),
  waktuJemput: Yup.string().required("Waktu jemput harus diisi !"),
  lokasiJemput: Yup.string()
    .required("Lokasi jemput harus diisi !")
    .max(500, "Lokasi jemput terlalu panjang !"),
  lokasiAntar: Yup.string()
    .required("Lokasi antar harus diisi !")
    .max(500, "Lokasi antar terlalu panjang !"),
  armada: Yup.string().required("Armada harus diisi !"),
  fasilitas: Yup.string().required("Fasilitas harus diisi !"),
  pesananTambahan: Yup.string().max(1000, "Pesanan tambahan terlalu panjang !"),
  harga: Yup.number().typeError("Harga harus dalam bentuk angka").notRequired(),
});
