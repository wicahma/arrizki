import { reduxState } from "@/interfaces/reduxInterface";
import { setAlert } from "@/store/mainSlice";
import { setSelectedResCustom } from "@/store/pesananSlice";
import { Button, Input, Textarea } from "@material-tailwind/react";
import { Form, useFormikContext } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const CustomForm = ({ admin = false }: any) => {
  const {
      setFieldValue,
      touched,
      isSubmitting,
      errors,
      values,
      resetForm,
    }: any = useFormikContext(),
    dispatch = useDispatch(),
    customAdminSelected = useSelector(
      (state: reduxState) => state.pesanan.selectedResCustom
    );

  useEffect(() => {
    if (customAdminSelected === null) return;
    setFieldValue("id", customAdminSelected?._id);
    setFieldValue("nama", customAdminSelected?.namaReservant);
    setFieldValue("email", customAdminSelected?.email);
    setFieldValue("nomorTelepon", customAdminSelected?.phoneNumber);
    setFieldValue("tanggalReservasi", customAdminSelected?.tanggalReservasi);
    setFieldValue("waktuJemput", customAdminSelected?.waktuJemput);
    setFieldValue("lokasiJemput", customAdminSelected?.lokasiJemput);
    setFieldValue("pesananTambahan", customAdminSelected?.pesananTambahan);
    setFieldValue("fasilitas", customAdminSelected?.fasilitasPilihan);
    setFieldValue("jumlahOrang", customAdminSelected?.jumlahPeserta);
    setFieldValue("lokasiAntar", customAdminSelected?.lokasiAntar);
    setFieldValue("armada", customAdminSelected?.armada);
    setFieldValue("harga", customAdminSelected?.harga);
  }, [customAdminSelected]);

  return (
    <Form>
      <div className="mb-4 flex flex-col gap-6">
        <Input
          variant="outlined"
          color="orange"
          size="lg"
          disabled={admin}
          value={values.nama}
          label={`${errors.nama && touched.nama ? errors.nama : "Nama"}`}
          onChange={(e) => {
            setFieldValue("nama", e.target.value);
          }}
          error={errors.nama && touched.nama ? true : false}
        />
        <Input
          variant="outlined"
          color="orange"
          disabled={admin}
          value={values.email}
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
          disabled={admin}
          value={values.nomorTelepon}
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
          value={values.jumlahOrang}
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
          value={values.tanggalReservasi}
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
          value={values.waktuJemput}
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
          value={values.lokasiJemput}
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
          value={values.lokasiAntar}
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
          value={values.armada}
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
          value={values.fasilitas}
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
          value={values.pesananTambahan}
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
        {admin && (
          <div className="bg-white mt-5 drop-shadow-xl relative rounded-bl-xl rounded-tr-xl rounded-br-xl px-3 py-3">
            <div className="bg-white w-fit absolute text-blue-gray-600 rounded-t-xl left-0 bottom-full pt-1 px-3">
              Masukkan harga yang sesuai untuk Pesanan ini
            </div>
            <Input
              variant="outlined"
              color="orange"
              value={values.harga}
              size="lg"
              label={`${
                errors.harga && touched.harga ? errors.harga : "Harga"
              }`}
              type="text"
              onChange={(e) => {
                setFieldValue("harga", e.target.value);
              }}
              error={errors.harga && touched.harga ? true : false}
            />
          </div>
        )}
      </div>
      <div className="flex gap-4 mt-6 justify-end">
        {admin && (
          <Button
            onClick={() => {
              dispatch(setSelectedResCustom(null));
              dispatch(
                setAlert({
                  type: "info",
                  message: "Kolom berhasil dibersihkan!",
                  show: true,
                })
              );
              resetForm();
              console.log(values);
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
          Buat Pesanan
        </Button>
      </div>
    </Form>
  );
};

export default CustomForm;
