import { jenisPaketOutbond } from "@/interfaces/produkInterface";
import { Button, Input, Option, Select, Textarea } from "@material-tailwind/react";
import { Form, useFormikContext } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const OutbondForm = (props: any) => {
  const { jenisPaket } = props,
    dispatch = useDispatch(),
    { setFieldValue, touched, isSubmitting, errors, values }: any =
      useFormikContext(),
    jumlahPesertaMinimum: string = useSelector(
      (state: any) => state.produk.selectedJumlahPeserta
    );

  return (
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
            errors.tanggalReservasi && touched.tanggalReservasi
              ? errors.tanggalReservasi
              : "Tanggal Reservasi"
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
            errors.paketID && touched.paketID ? errors.paketID : "Jenis Paket"
          }`}
          onChange={(value) => {
            setFieldValue("paketID", value);
            setFieldValue("jumlahPeserta", undefined);
          }}
          error={errors.paketID && touched.paketID ? true : false}
        >
          {jenisPaket.map((item: jenisPaketOutbond, i: number) => (
            <Option key={i} value={item._id}>
              {item.namaPaket}
            </Option>
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
  );
};

export default OutbondForm;
