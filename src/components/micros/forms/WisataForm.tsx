import {
  Button,
  Checkbox,
  Input,
  Option,
  Select,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import { Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";

interface WisataFormProps {
  nama: string | null;
  email: string | null;
  nomorTelepon: string | null;
  paketID: string | null;
  jumlahPeserta: number | null;
  tanggalReservasi: Date | null;
  waktuJemput: string | null;
  lokasiJemput: string | null;
  pesananTambahan: string | null;
}

const wisataValidator = Yup.object().shape({
  nama: Yup.string().required("Nama harus diisi !"),
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

const WisataForm = (props: any) => {
  const initialValues = {
    nama: null,
    email: null,
    nomorTelepon: null,
    paketID: null,
    jumlahPeserta: null,
    tanggalReservasi: null,
    waktuJemput: null,
    lokasiJemput: null,
    pesananTambahan: "",
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={wisataValidator}
      validateOnChange
      validateOnMount
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
        console.log(values);
      }}
    >
      {({ isSubmitting, setFieldValue, touched, errors }) => (
        <Form className="">
          <div className="mb-4 flex flex-col gap-6">
            <Input
              variant="outlined"
              color="orange"
              size="lg"
              label={`${errors.nama && touched.nama ? errors.nama : "Nama"}`}
              onChange={(e) => {
                setFieldValue("nama", e.target.value);
              }}
              error={errors.nama && touched.nama ? true : false}
            />
            <Input
              variant="outlined"
              color="orange"
              size="lg"
              label={`${
                errors.email && touched.email ? errors.email : "Email"
              }`}
              onChange={(e) => {
                setFieldValue("email", e.target.value);
              }}
              error={errors.email && touched.email ? true : false}
            />
            <Input
              variant="outlined"
              color="orange"
              size="lg"
              label={`${
                errors.nomorTelepon && touched.nomorTelepon
                  ? errors.nomorTelepon
                  : "Nomor Telepon"
              }`}
              type="text"
              onChange={(e) => {
                setFieldValue("nomorTelepon", e.target.value);
              }}
              error={errors.nomorTelepon && touched.nomorTelepon ? true : false}
            />
            <Input
              variant="outlined"
              color="orange"
              size="lg"
              label={`${
                errors.tanggalReservasi && touched.tanggalReservasi
                  ? errors.tanggalReservasi
                  : "Tanggal Reservasi"
              }`}
              type="date"
              onChange={(e) => {
                setFieldValue("tanggalReservasi", e.target.value);
              }}
              error={
                errors.tanggalReservasi && touched.tanggalReservasi
                  ? true
                  : false
              }
            />
            <Input
              variant="outlined"
              color="orange"
              size="lg"
              label={`${
                errors.waktuJemput && touched.waktuJemput
                  ? errors.waktuJemput
                  : "Waktu Jemput"
              }`}
              type="time"
              onChange={(e) => {
                setFieldValue("waktuJemput", e.target.value);
              }}
              error={errors.waktuJemput && touched.waktuJemput ? true : false}
            />
            <Select
              variant="outlined"
              color="orange"
              size="lg"
              label={`${
                errors.paketID && touched.paketID
                  ? errors.paketID
                  : "Jenis Paket"
              }`}
              onChange={(value) => {
                setFieldValue("paketID", value);
              }}
              error={errors.paketID && touched.paketID ? true : false}
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
                <Option value={item.toString()}>{item}</Option>
              ))}
            </Select>
            <Select
              variant="outlined"
              color="orange"
              size="lg"
              label={`${
                errors.jumlahPeserta && touched.jumlahPeserta
                  ? errors.jumlahPeserta
                  : "Jumlah Peserta"
              }`}
              onChange={(value) => {
                setFieldValue("jumlahPeserta", Number(value));
              }}
              error={
                errors.jumlahPeserta && touched.jumlahPeserta ? true : false
              }
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
                <Option value={item.toString()}>{item}</Option>
              ))}
            </Select>
            <Textarea
              variant="outlined"
              color="orange"
              size="lg"
              label={`${
                errors.lokasiJemput && touched.lokasiJemput
                  ? errors.lokasiJemput
                  : "Lokasi Jemput"
              }`}
              onChange={(e) => {
                setFieldValue("lokasiJemput", e.target.value);
              }}
              error={errors.lokasiJemput && touched.lokasiJemput ? true : false}
            />
            <Textarea
              variant="outlined"
              color="orange"
              size="lg"
              label={`${
                errors.pesananTambahan && touched.pesananTambahan
                  ? errors.pesananTambahan
                  : "Pesanan Tambahan"
              }`}
              onChange={(e) => {
                setFieldValue("pesananTambahan", e.target.value);
              }}
            />
          </div>

          <Button
            className="mt-6"
            type="submit"
            disabled={isSubmitting}
            onClick={(_) => {
              console.log({ errors });
              return false;
            }}
            color="orange"
            fullWidth
          >
            Buat Pesanan
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default WisataForm;
