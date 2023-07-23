import * as Yup from "yup";

export interface MobilFormProps {
  id?: string;
  nama: string | undefined;
  email: string | undefined;
  instagram: string | undefined;
  nomorTelepon: string | undefined;
  jenisMobil: string | undefined;
  tanggalReservasi: string | undefined;
  waktuAntar: string | undefined;
  lokasiAntar: string | undefined;
  pesananTambahan: string;
}

export const carValidation = Yup.object().shape({
  nama: Yup.string().required("Nama harus diisi !"),
  email: Yup.string()
    .email("Email tidak valid")
    .required("Email harus diisi !"),
  instagram: Yup.string().notRequired(),
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
  jenisMobil: Yup.string().required("Jenis mobil harus diisi !"),
  tanggalReservasi: Yup.date()
    .typeError("Tanggal reservasi harus berupa tanggal !")
    .required("Tanggal reservasi harus diisi !")
    .min(new Date(), "Tanggal reservasi tidak boleh kurang dari hari ini !"),
  waktuAntar: Yup.string().required("Waktu antar harus diisi !"),
  lokasiAntar: Yup.string().required("Lokasi antar harus diisi !"),
  pesananTambahan: Yup.string(),
});
