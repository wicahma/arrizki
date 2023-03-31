import {
  Button,
  Checkbox,
  Input,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import { Formik } from "formik";
import React from "react";

const WisataForm = (props: any) => {
  return (
    <Formik
      initialValues={{
        nama: "",
        email: "",
        mulaiReservasi: "",
        selesaiReservasi: "",
        noHp: "",
        jumlahPeserta: "",
        waktuJemput: "",
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
        console.log(values);
      }}
    >
      <form className="">
        <div className="mb-4 flex flex-col gap-6">
          <Input variant="outlined" color="orange" size="lg" label="Nama" />
          <Input variant="outlined" color="orange" size="lg" label="Email" />
          <Input
            variant="outlined"
            color="orange"
            size="lg"
            label="Nomor Telepon (+62)"
            type="number"
          />
          <Input
            variant="outlined"
            color="orange"
            size="lg"
            label="Mulai Reservasi"
            type="date"
          />
          <Input
            variant="outlined"
            color="orange"
            size="lg"
            label="Waktu Jemput"
            type="time"
          />
          <Input
            variant="outlined"
            color="orange"
            size="lg"
            label="Jumlah Peserta"
            type="number"
          />
          <Input
            variant="outlined"
            color="orange"
            size="lg"
            label="Lokasi Jemput"
            type="date"
          />
          <Textarea
            variant="outlined"
            color="orange"
            size="lg"
            label="Pesanan Tambahan"
          />
        </div>
        
        <Button className="mt-6" color="orange" fullWidth>
          Buat Pesanan
        </Button>
      </form>
    </Formik>
  );
};

export default WisataForm;
