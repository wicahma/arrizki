import {
  Button,
  Input,
  Option,
  Select,
  Textarea,
} from "@material-tailwind/react";
import { Form, useFormikContext } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const MobilForm = ({ mobilData }: any) => {
  const dispatch = useDispatch();
  const { setFieldValue, touched, isSubmitting, errors }: any =
    useFormikContext();
  const selectedCar = useSelector((state: any) => state.produk.selectedCar);

  useEffect(() => {
    setFieldValue("jenisMobil", selectedCar);
  }, [selectedCar]);


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
        <div>
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
            value={selectedCar}
            onChange={(value) => {
              dispatch({ type: "produk/setSelectedCar", payload: value });
              setFieldValue("jenisMobil", value);
            }}
            error={errors.jenisMobil && touched.jenisMobil ? true : false}
          >
            {mobilData
              .filter((data: any) => data.status === "aktif")
              .map((item: any, i: number) => {
                return (
                  <Option value={item._id} key={i}>
                    {item.unitName}
                  </Option>
                );
              })}
          </Select>
          <p className="text-xs text-black/50 mt-1">
            <span className="!text-red-500">*</span>Tips: Klik mobil yang ingin
            anda pesan untuk memilih mobil
          </p>
        </div>
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
  );
};

export default MobilForm;
