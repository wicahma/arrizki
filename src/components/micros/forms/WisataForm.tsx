import { jenisPaket } from "@/interfaces/produkInterface";
import { reduxState } from "@/interfaces/reduxInterface";
import { setPaxWisata, setSelectedResWisata } from "@/store/pesananSlice";
import { setSelectedJumlahPeserta } from "@/store/produkSlice";
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

const WisataForm = ({ jenisPaket, admin = false }: any) => {
  const dispatch = useDispatch(),
    { setFieldValue, touched, isSubmitting, errors, values, resetForm }: any =
      useFormikContext(),
    selectedJumlahPeserta: any = useSelector(
      (state: reduxState) => state.produk.selectedJumlahPeserta
    ),
    adminSelectedWisata = useSelector(
      (state: reduxState) => state.pesanan.selectedResWisata
    ),
    paxWisataSelected = useSelector(
      (state: reduxState) => state.pesanan.paxSelectedWisata
    ),
    [jumlahPesertaData, setJumlahPesertaData] = React.useState([]);

  useEffect(() => {
    values.paketID &&
      !admin &&
      setJumlahPesertaData(
        jenisPaket.filter((item: any) => item._id === values.paketID)[0].pax
      );
  }, [values.paketID]);

  useEffect(() => {
    if (adminSelectedWisata === null) return;
    if (paxWisataSelected === null) return;
    setFieldValue("id", adminSelectedWisata?._id);
    setFieldValue("nama", adminSelectedWisata?.namaReservant);
    setFieldValue("email", adminSelectedWisata?.email);
    setFieldValue("instagram", adminSelectedWisata?.instagram);
    setFieldValue("nomorTelepon", adminSelectedWisata?.phoneNumber);
    setFieldValue("paketID", adminSelectedWisata?.paketWisataId);
    setFieldValue("jumlahPeserta", adminSelectedWisata?.jumlahPeserta);
    setFieldValue("tanggalReservasi", adminSelectedWisata?.tanggalMulai);
    setFieldValue("waktuJemput", adminSelectedWisata?.waktuJemput);
    setFieldValue("lokasiJemput", adminSelectedWisata?.lokasiJemput);
    setFieldValue("pesananTambahan", adminSelectedWisata?.pesananTambahan);
    setJumlahPesertaData(paxWisataSelected);
  }, [adminSelectedWisata, paxWisataSelected]);

  return (
    <Form className="">
      <div className="mb-4 flex flex-col gap-6">
        <Input
          variant="outlined"
          color="orange"
          disabled={admin}
          size="lg"
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
          value={values.email}
          disabled={admin}
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
          value={values.nomorTelepon}
          disabled={admin}
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
          value={values.instagram}
          disabled={admin}
          size="lg"
          label={`${
            errors.instagram && touched.instagram
              ? errors.instagram
              : "Instagram"
          }`}
          type="text"
          onChange={(e) => {
            setFieldValue("instagram", e.target.value);
          }}
          error={errors.instagram && touched.instagram ? true : false}
        />
        <Input
          variant="outlined"
          value={
            values.tanggalReservasi && values.tanggalReservasi.split("T")[0]
          }
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
          value={values.waktuJemput}
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
          disabled={admin}
          color="orange"
          size="lg"
          label={`${
            errors.paketID && touched.paketID ? errors.paketID : "Jenis Paket"
          }`}
          value={values.paketID}
          onChange={(value) => {
            setFieldValue("paketID", value);
            dispatch(setSelectedJumlahPeserta(""));
            setFieldValue("jumlahPeserta", undefined);
          }}
          selected={(data) => (!admin ? data?.props.children : values.paketID)}
          error={errors.paketID && touched.paketID ? true : false}
        >
          {!admin ? (
            jenisPaket.map((item: jenisPaket, i: number) => (
              <Option key={i} value={item._id}>
                Paket Wisata {i + 1}
              </Option>
            ))
          ) : (
            <Option>Tidak ada data yang dipilih</Option>
          )}
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
          value={admin ? values.jumlahPeserta : selectedJumlahPeserta}
          selected={() => values.jumlahPeserta}
          onChange={(value) => {
            dispatch(setSelectedJumlahPeserta(value));
            setFieldValue("jumlahPeserta", value);
          }}
          error={errors.jumlahPeserta && touched.jumlahPeserta ? true : false}
        >
          {values.paketID !== undefined && jumlahPesertaData.length !== 0 ? (
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
              {admin
                ? "Pilih data reservasi terlebih dahulu"
                : "Pilih Paket Wisata Terlebih Dahulu"}
            </Option>
          )}
        </Select>
        <Textarea
          variant="outlined"
          color="orange"
          size="lg"
          value={values.lokasiJemput}
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
          value={values.pesananTambahan}
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
      <div className="flex gap-4 mt-6 justify-end">
        {admin && (
          <Button
            onClick={() => {
              dispatch(setSelectedResWisata(null));
              dispatch(setPaxWisata([]));
              dispatch(setSelectedJumlahPeserta(""));
              setJumlahPesertaData([]);
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
          disabled={isSubmitting}
          onClick={(_) => {
            return false;
          }}
          color="orange"
          fullWidth={!admin}
        >
          {admin ? "Update Pesanan" : "Buat Pesanan"}
        </Button>
      </div>
    </Form>
  );
};

export default WisataForm;
