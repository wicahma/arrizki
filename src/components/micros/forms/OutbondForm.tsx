import { jenisPaketOutbond } from "@/interfaces/produkInterface";
import { reduxState } from "@/interfaces/reduxInterface";
import { setSelectedResOutbond } from "@/store/pesananSlice";
import { setJumlahPesertaMinimum } from "@/store/produkSlice";
import {
  Button,
  Input,
  Option,
  Select,
  Textarea,
} from "@material-tailwind/react";
import { Form, useFormikContext } from "formik";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

interface OutbondFormProps {
  jenisPaket: jenisPaketOutbond[];
  admin?: boolean;
}

const OutbondForm = ({ jenisPaket, admin = false }: OutbondFormProps) => {
  const dispatch = useDispatch(),
    dataOutbond = useSelector(
      (state: reduxState) => state.pesanan.selectedResOutbond
    ),
    { setFieldValue, touched, isSubmitting, errors, values, resetForm }: any =
      useFormikContext(),
    jumlahPesertaMinimum: number | undefined | any = useSelector(
      (state: reduxState) => state.produk.jumlahPesertaMinimum
    ),
    jumlahPesertaMinimumAdmin: number | undefined | any = useSelector(
      (state: reduxState) => state.pesanan.minimumPersonSelectedOutbond
    );

  useEffect(() => {
    if (dataOutbond === null) return;
    setFieldValue("id", dataOutbond?._id);
    setFieldValue("nama", dataOutbond?.namaReservant);
    setFieldValue("email", dataOutbond.email);
    setFieldValue("instagram", dataOutbond.instagram);
    setFieldValue("nomorTelepon", dataOutbond.phoneNumber);
    setFieldValue("paketID", dataOutbond.paketWisataId);
    setFieldValue("jumlahPeserta", dataOutbond.jumlahPeserta);
    setFieldValue("tanggalReservasi", dataOutbond.tanggalMulai);
    setFieldValue("waktuJemput", dataOutbond.waktuJemput);
    setFieldValue("lokasiJemput", dataOutbond.lokasiJemput);
    setFieldValue("pesananTambahan", dataOutbond.pesananTambahan);
  }, [dataOutbond]);

  return (
    <Form>
      <div className="mb-4 flex flex-col gap-6">
        <Input
          variant="outlined"
          color="orange"
          size="lg"
          disabled={admin}
          label={`${errors.nama && touched.nama ? errors.nama : "Nama"}`}
          value={values.nama}
          onChange={(e) => setFieldValue("nama", e.target.value)}
          error={errors.nama && touched.nama ? true : false}
        />
        <Input
          variant="outlined"
          disabled={admin}
          value={values.email}
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
          disabled={admin}
          size="lg"
          value={values.nomorTelepon}
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
          disabled={admin}
          size="lg"
          value={values.instagram}
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
        <Select
          variant="outlined"
          color="orange"
          disabled={admin}
          size="lg"
          value={values.paketID}
          selected={(data) => (admin ? values.paketID : data?.props.children)}
          label={`${
            errors.paketID && touched.paketID ? errors.paketID : "Jenis Paket"
          }`}
          onChange={(value) => {
            setFieldValue("paketID", value);
            setFieldValue("jumlahPeserta", undefined);
            values.type.includes("admin")
              ? dispatch(setJumlahPesertaMinimum(0))
              : dispatch(
                  setJumlahPesertaMinimum(
                    jenisPaket.filter(
                      (item: jenisPaketOutbond) => item._id === value
                    )[0].minimumPerson
                  )
                );
          }}
          error={errors.paketID && touched.paketID ? true : false}
        >
          {jenisPaket.map((item: jenisPaketOutbond, i: number) => (
            <Option key={i} value={item._id}>
              {item.namaPaket}
            </Option>
          ))}
        </Select>
        <Input
          variant="outlined"
          color="orange"
          size="lg"
          value={values.jumlahPeserta}
          label={`${
            errors.jumlahPeserta && touched.jumlahPeserta
              ? errors.jumlahPeserta
              : "Jumlah Peserta"
          }`}
          type="number"
          min={admin ? jumlahPesertaMinimumAdmin : jumlahPesertaMinimum}
          minLength={admin ? jumlahPesertaMinimumAdmin : jumlahPesertaMinimum}
          onChange={(e) => {
            setFieldValue("jumlahPeserta", e.target.value);
          }}
          error={errors.jumlahPeserta && touched.jumlahPeserta ? true : false}
        />
        <Input
          variant="outlined"
          color="orange"
          size="lg"
          value={
            admin
              ? values.tanggalReservasi?.split("T")[0]
              : values.tanggalReservasi
          }
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
          value={values.waktuJemput}
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
            type="button"
            onClick={() => {
              dispatch(setSelectedResOutbond(null));
              dispatch(setJumlahPesertaMinimum(0));
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

export default OutbondForm;
