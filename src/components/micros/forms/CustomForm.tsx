import { Button, Input, Textarea } from "@material-tailwind/react";
import { Form, useFormikContext } from "formik";
import React from "react";

const CustomForm = (props: any) => {
  const { setFieldValue, touched, isSubmitting, errors }: any =
    useFormikContext();

  return (
    <Form>
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
          label={`${errors.email && touched.email ? errors.email : "Email"}`}
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
            errors.jumlahOrang && touched.jumlahOrang
              ? errors.jumlahOrang
              : "Jumlah Orang"
          }`}
          type="text"
          onChange={(e) => {
            setFieldValue("jumlahOrang", e.target.value);
          }}
          error={errors.jumlahOrang && touched.jumlahOrang ? true : false}
        />
        <Input
          variant="outlined"
          color="orange"
          size="lg"
          label={`${
            errors.tanggalReservasi && touched.tanggalReservasi
              ? errors.tanggalReservasi
              : "Jumlah Orang"
          }`}
          type="date"
          onChange={(e) => {
            setFieldValue("tanggalReservasi", e.target.value);
          }}
          error={
            errors.tanggalReservasi && touched.tanggalReservasi ? true : false
          }
        />
        <Input
          variant="outlined"
          color="orange"
          size="lg"
          label={`${
            errors.waktuJemput && touched.waktuJemput
              ? errors.waktuJemput
              : "Jumlah Orang"
          }`}
          type="time"
          onChange={(e) => {
            setFieldValue("waktuJemput", e.target.value);
          }}
          error={errors.waktuJemput && touched.waktuJemput ? true : false}
        />
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
          label={`${
            errors.armada && touched.armada
              ? errors.armada
              : "Armada yang dipilih"
          }`}
          onChange={(e) => {
            setFieldValue("armada", e.target.value);
          }}
          error={errors.armada && touched.armada ? true : false}
        />
        <Textarea
          variant="outlined"
          color="orange"
          size="lg"
          label={`${
            errors.fasilitas && touched.fasilitas
              ? errors.fasilitas
              : "Fasilitas"
          }`}
          onChange={(e) => {
            setFieldValue("fasilitas", e.target.value);
          }}
          error={errors.fasilitas && touched.fasilitas ? true : false}
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
          error={
            errors.pesananTambahan && touched.pesananTambahan ? true : false
          }
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
  );
};

export default CustomForm;
