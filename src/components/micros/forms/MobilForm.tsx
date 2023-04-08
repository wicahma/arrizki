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

interface MobilFormProps {
  nama: string | null;
  email: string | null;
  nomorTelepon: string | null;
  jenisMobil: string | null;
  tanggalReservasi: Date | null;
  waktuAntar: string | null;
  lokasiAntar: string | null;
  pesananTambahan: string;
}

const carValidation = Yup.object().shape({
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
  jenisMobil: Yup.string().required("Jenis mobil harus diisi !"),
  tanggalReservasi: Yup.date()
    .typeError("Tanggal reservasi harus berupa tanggal !")
    .required("Tanggal reservasi harus diisi !")
    .min(new Date(), "Tanggal reservasi tidak boleh kurang dari hari ini !"),
  waktuAntar: Yup.string().required("Waktu antar harus diisi !"),
  lokasiAntar: Yup.string().required("Lokasi antar harus diisi !"),
  pesananTambahan: Yup.string(),
});

const MobilForm = (props: any) => {
  const [selectedCar, setSelectedCar] = React.useState("Avanza");
  const initialValues: MobilFormProps = {
    nama: null,
    email: null,
    nomorTelepon: null,
    jenisMobil: null,
    tanggalReservasi: null,
    waktuAntar: null,
    lokasiAntar: null,
    pesananTambahan: "",
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={carValidation}
      validateOnChange
      validateOnMount
      onSubmit={async (values, { setSubmitting }) => {
        await new Promise((r) => setTimeout(r, 500));
        alert(JSON.stringify(values, null, 10));
        return false;
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
            <Select
              name="jenisMobil"
              variant="outlined"
              color="orange"
              size="lg"
              label={`${
                errors.jenisMobil && touched.jenisMobil
                  ? errors.jenisMobil
                  : "Jenis Mobil"
              }`}
              onChange={(value) => {
                setFieldValue("jenisMobil", value);
              }}
              error={errors.jenisMobil && touched.jenisMobil ? true : false}
            >
              {[1, 1, 1, 1].map((item, index) => {
                return (
                  <Option value={`Mobil ${item.toString()}`} key={index}>
                    Avanza {item}
                  </Option>
                );
              })}
            </Select>
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
                errors.waktuAntar && touched.waktuAntar
                  ? errors.waktuAntar
                  : "Waktu Antar"
              }`}
              type="time"
              onChange={(e) => {
                setFieldValue("waktuAntar", e.target.value);
              }}
              error={errors.waktuAntar && touched.waktuAntar ? true : false}
            />
            <Textarea
              variant="outlined"
              color="orange"
              size="lg"
              label={`${
                errors.lokasiAntar && touched.lokasiAntar
                  ? errors.lokasiAntar
                  : "Lokasi Antar"
              }`}
              onChange={(e) => {
                setFieldValue("lokasiAntar", e.target.value);
              }}
              error={errors.lokasiAntar && touched.lokasiAntar ? true : false}
            />
            <Textarea
              variant="outlined"
              color="orange"
              size="lg"
              label="Pesanan Tambahan"
              onChange={(e) => {
                setFieldValue("pesananTambahan", e.target.value);
              }}
            />
          </div>

          <Button
            className="mt-6"
            type="submit"
            onClick={() => {
              console.log({ errors });
            }}
            disabled={isSubmitting}
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

export default MobilForm;
