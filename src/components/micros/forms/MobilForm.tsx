import { reduxState } from "@/interfaces/reduxInterface";
import { setSelectedResMobil } from "@/store/pesananSlice";
import { setSelectedCar } from "@/store/produkSlice";
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

const MobilForm = ({ mobilData, admin = false }: any) => {
  const dispatch = useDispatch(),
    { setFieldValue, touched, isSubmitting, errors, values, resetForm }: any =
      useFormikContext(),
    selectedCar: any = useSelector(
      (state: reduxState) => state.produk.selectedCar
    ),
    adminSelectedCar = useSelector(
      (state: reduxState) => state.pesanan.selectedResMobil
    );

  useEffect(() => {
    setFieldValue("jenisMobil", selectedCar);
  }, [selectedCar]);

  useEffect(() => {
    if (adminSelectedCar === null) return;
    setFieldValue("id", adminSelectedCar?._id);
    setFieldValue("nama", adminSelectedCar?.namaReservant);
    setFieldValue("email", adminSelectedCar?.email);
    setFieldValue("nomorTelepon", adminSelectedCar?.phoneNumber);
    setFieldValue("jenisMobil", adminSelectedCar?.unitId._id);
    setFieldValue("tanggalReservasi", adminSelectedCar?.tanggalReservasi);
    setFieldValue("waktuAntar", adminSelectedCar?.waktuAntar);
    setFieldValue("lokasiAntar", adminSelectedCar?.lokasiAntar);
    setFieldValue("pesananTambahan", adminSelectedCar?.pesananTambahan);
    dispatch(setSelectedCar(adminSelectedCar?.unitId._id));
  }, [adminSelectedCar]);

  return (
    <Form className="">
      <div className="mb-4 flex flex-col gap-6">
        <Input
          variant="outlined"
          color="orange"
          size="lg"
          disabled={admin}
          label={`${errors.nama && touched.nama ? errors.nama : "Nama"}`}
          onChange={(e) => {
            setFieldValue("nama", e.target.value);
          }}
          value={values.nama}
          error={errors.nama && touched.nama ? true : false}
        />
        <Input
          variant="outlined"
          color="orange"
          disabled={admin}
          size="lg"
          label={`${errors.email && touched.email ? errors.email : "Email"}`}
          onChange={(e) => {
            setFieldValue("email", e.target.value);
          }}
          value={values.email}
          error={errors.email && touched.email ? true : false}
        />
        <Input
          variant="outlined"
          color="orange"
          disabled={admin}
          size="lg"
          label={`${
            errors.nomorTelepon && touched.nomorTelepon
              ? errors.nomorTelepon
              : "Nomor Telepon"
          }`}
          value={values.nomorTelepon}
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
            disabled={admin}
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
            selected={(data) =>
              admin ? adminSelectedCar?.unitId.unitName : data?.props.children
            }
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
          value={
            values.tanggalReservasi && values.tanggalReservasi.split("T")[0]
          }
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
          value={values.waktuAntar}
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
          value={values.lokasiAntar}
          onChange={(e) => {
            setFieldValue("lokasiAntar", e.target.value);
          }}
          error={errors.lokasiAntar && touched.lokasiAntar ? true : false}
        />
        <Textarea
          variant="outlined"
          color="orange"
          size="lg"
          value={values.pesananTambahan}
          label="Pesanan Tambahan"
          onChange={(e) => {
            setFieldValue("pesananTambahan", e.target.value);
          }}
        />
      </div>
      <div className="flex gap-4 mt-6 justify-end">
        {admin && (
          <Button
            onClick={() => {
              dispatch(setSelectedResMobil(null));
              dispatch(setSelectedCar(null));
              dispatch({
                type: "main/setAlert",
                payload: {
                  type: "info",
                  message: "Kolom berhasil dibersihkan!",
                  show: true,
                },
              });
              resetForm();
            }}
            color="red"
            variant="text"
          >
            Bersihkan Form
          </Button>
        )}
        <Button
          type="submit"
          onClick={() => {
            console.log({ errors });
          }}
          disabled={isSubmitting}
          color="orange"
          fullWidth={!admin}
        >
          {admin ? "Update Pesanan" : "Buat Pesanan"}
        </Button>
      </div>
    </Form>
  );
};

export default MobilForm;
