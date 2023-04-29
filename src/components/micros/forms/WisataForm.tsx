import { jenisPaket } from "@/interfaces/produkInterface";
import { setSelectedJumlahPeserta } from "@/store/produkSlice";
import {
  Button,
  Checkbox,
  Input,
  Option,
  Select,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import { Form, useFormikContext } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const WisataForm = (props: any) => {
  const { jenisPaket } = props,
    dispatch = useDispatch(),
    { setFieldValue, touched, isSubmitting, errors, values }: any =
      useFormikContext(),
    selectedJumlahPeserta: string = useSelector(
      (state: any) => state.produk.selectedJumlahPeserta
    ),
    [jumlahPesertaData, setJumlahPesertaData] = React.useState([]);

  useEffect(() => {
    values.paketID &&
      setJumlahPesertaData(
        jenisPaket.filter((item: any) => item._id === values.paketID)[0].pax
      );
  }, [values.paketID]);

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
            dispatch(setSelectedJumlahPeserta(""));
            setFieldValue("jumlahPeserta", undefined);
          }}
          error={errors.paketID && touched.paketID ? true : false}
        >
          {jenisPaket.map((item: jenisPaket, i: number) => (
            <Option key={i} value={item._id}>
              Paket Wisata {i + 1}
            </Option>
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
          value={selectedJumlahPeserta}
          onChange={(value) => {
            dispatch(setSelectedJumlahPeserta(value));
            setFieldValue("jumlahPeserta", value);
          }}
          error={errors.jumlahPeserta && touched.jumlahPeserta ? true : false}
        >
          {values.paketID !== undefined ? (
            jumlahPesertaData.map((item: any, i: number) => (
              <Option
                onClick={() => {
                  dispatch({
                    type: "produk/setSelectedJumlahPeserta",
                    payload: item.jumlah.toString(),
                  });
                  setFieldValue("jumlahPeserta", item.jumlah.toString());
                }}
                key={i}
                value={item.jumlah.toString()}
              >
                {item.jumlah} Orang
              </Option>
            ))
          ) : (
            <Option value={undefined}>
              Pilih Paket Wisata Terlebih Dahulu
            </Option>
          )}
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

export default WisataForm;
