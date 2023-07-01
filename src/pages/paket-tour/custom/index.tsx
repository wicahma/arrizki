import Layout from "@/components/Layout";
import CustomForm from "@/components/micros/forms/CustomForm";
import TextHeader from "@/components/TextHeader/main";
import TourList from "@/components/TextHeader/TourList";
import {
  customFormProps,
  customValidation,
} from "@/interfaces/customWisataProps";
import { setAlert, setLoading } from "@/store/mainSlice";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Switch,
  Tooltip,
} from "@material-tailwind/react";
import axios from "axios";
import { Formik } from "formik";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const index = (props: any) => {
  const { pathname } = useRouter(),
    dispatch = useDispatch(),
    [formOpener, setForm] = useState<boolean>(false),
    [handleOpenDialog, setHandleOpenDialog] = useState<boolean>(false),
    [dialogSize, setDialogSize] = useState<"xl" | "xxl">("xxl"),
    [customFormData, setCustomFormData] = useState<customFormProps>(),
    initialValues: customFormProps = {
      nama: "",
      nomorTelepon: "",
      email: "",
      jumlahOrang: "",
      tanggalReservasi: "",
      waktuJemput: "",
      lokasiJemput: "",
      lokasiAntar: "",
      armada: "",
      fasilitas: "",
      pesananTambahan: "",
      type: "user",
    };

  const handleCreateReservasi = async (values: customFormProps | undefined) => {
    dispatch(setLoading(true));
    setHandleOpenDialog(false);
    await axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/res-custom`, values)
      .then((res) => {
        dispatch(
          setAlert({
            message: "Berhasil membuat reservasi!",
            type: "success",
            show: true,
          })
        );
      })
      .catch((err) => {
        dispatch(
          setAlert({
            message: "Terjadi kesalahan, silahkan coba lagi nanti!",
            type: "error",
            show: true,
          })
        );
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };

  useEffect(() => {
    if (window) {
      if (window.innerWidth > 960) {
        setForm(true);
        setDialogSize("xl");
      }
      window.addEventListener("resize", () => {
        if (window.innerWidth > 960) {
          setForm(true);
          setDialogSize("xl");
        }
      });
    }
  }, [formOpener]);

  return (
    <Layout pageTitle="Custom Tour">
      <div className="pt-14 container mx-auto">
        <TourList pathname={pathname} />
        <TextHeader
          className="mt-10"
          title="Custom Tour"
          subtitle="Buat Custom Tour sesuai dengan keinginan anda."
        />
        <div className="divide-x divide-gray-400 gap-3 grid grid-cols-6 mx-auto">
          <div className="lg:col-span-4 col-span-6 mb-10 w-full space-y-10 sm:mx-auto px-5 text-justify text-lg">
            <p>
              Custum paket tour merupakan sebuah pelayanan dari Arrizki Tour
              yang ingin berwisata di jogja dengan bebas memilih tempat wisata
              dan fasilitas yang diinginkan seperti (Home Stay, Hotel, Villa,
              Restoran, Jenis Kendaraan, dan Dokumentasi) dengan menyesuaikan
              budget yang diinginkan.
            </p>
            <p>
              Arrizki Tour memberikan layanan Konsultasi Gratis untuk
              merencanakan Liburan Anda. Pastikan Anda Benar Memilih Biro
              Perjalanan Yang Sesuai Kebutuhan Anda. Karena Kami Mengedepankan
              pelayanan dan Kualitas tour dengan Harga Terbaik.
            </p>
            <div>
              <h3 className="font-semibold text-xl">Syarat & Ketentuan</h3>
              <ul className="list-decimal m-8 my-0">
                <li>Anda bisa memilih 3 – 4 tempat wisata yang diinginkan.</li>
                <li>
                  Menginformasikan jumlah peserta yang ingin mengikuti tour.
                </li>
                <li>Rencana penjemputan dan pengantaran.</li>
                <li>
                  Akomodasi dan fasilitas yang diinginkan (Home stay, Hotel,
                  Villa, Restoran, Jenis kendaraan, dan Dokumentasi)
                </li>
                <li>
                  Custom paket tour Jogja dapat menyesuaikan dengan budget atau
                  rencana wisata anda.
                </li>
              </ul>
            </div>
          </div>
          <div
            className={`fixed right-0 overflow-y-auto lg:px-5 shadow-2xl lg:rounded-none lg:shadow-none lg:col-span-2 z-50 duration-500 transition-all lg:w-full lg:max-h-max lg:sticky lg:top-20 ${
              formOpener
                ? "rounded-tl-xl w-[100vw] h-[88vh] rounded-tr-xl bottom-0 bg-white"
                : "h-11 -bottom-full w-[10px] bg-red-500"
            }`}
          >
            <div className={`p-5 lg:p-0 pb-16`}>
              <h3 className="text-2xl mb-3 font-medium">Buat Pesanan</h3>
              <Formik
                initialValues={initialValues}
                validationSchema={customValidation}
                validateOnChange
                validateOnMount
                onSubmit={async (values, { setSubmitting }) => {
                  setHandleOpenDialog(true);
                  setCustomFormData(values);
                  setSubmitting(true);
                  return false;
                }}
              >
                <CustomForm />
              </Formik>
              <Dialog
                size={dialogSize}
                open={handleOpenDialog}
                handler={() => setHandleOpenDialog(!handleOpenDialog)}
              >
                <DialogHeader>Ayo cek lagi pesanan kamu 😊</DialogHeader>
                <DialogBody className="max-h-[75vh] overflow-y-auto" divider>
                  {customFormData && (
                    <ul>
                      <li>
                        <span className="font-semibold">Nama</span> :{" "}
                        {customFormData.nama}
                      </li>
                      <li>
                        <span className="font-semibold">Nomor Telepon</span> :{" "}
                        {customFormData.nomorTelepon}
                      </li>
                      <li>
                        <span className="font-semibold">Email</span> :{" "}
                        {customFormData.email}
                      </li>
                      <li>
                        <span className="font-semibold">Jumlah Orang</span> :{" "}
                        {customFormData.jumlahOrang}
                      </li>
                      <li>
                        <span className="font-semibold">Tanggal Reservasi</span>{" "}
                        : {customFormData.tanggalReservasi}
                      </li>
                      <li>
                        <span className="font-semibold">Waktu Jemput</span> :{" "}
                        {customFormData.waktuJemput}
                      </li>
                      <li>
                        <span className="font-semibold">Lokasi Jemput</span> :{" "}
                        {customFormData.lokasiJemput}
                      </li>
                      <li>
                        <span className="font-semibold">Lokasi Antar</span> :{" "}
                        {customFormData.lokasiAntar}
                      </li>
                      <li>
                        <span className="font-semibold">Armada</span> :{" "}
                        {customFormData.armada}
                      </li>
                      <li>
                        <span className="font-semibold">Fasilitas</span> :{" "}
                        {customFormData.fasilitas}
                      </li>
                      <li>
                        <span className="font-semibold">Pesanan Tambahan</span>{" "}
                        : {customFormData.pesananTambahan}
                      </li>
                    </ul>
                  )}
                  <p className="mt-5">Apakah data diatas ini sudah benar?</p>
                  <p>
                    Admin akan mengkontak kamu secepatnya melalui whatsapp atau
                    email untuk konfirmasi pemesanan dan juga pembayaran.
                  </p>
                </DialogBody>
                <DialogFooter>
                  <Button
                    variant="text"
                    color="red"
                    onClick={() => setHandleOpenDialog(!handleOpenDialog)}
                    className="mr-1"
                  >
                    <span>Batal</span>
                  </Button>
                  <Button
                    variant="gradient"
                    color="green"
                    onClick={() => handleCreateReservasi(customFormData)}
                  >
                    <span>Selesaikan Pesanan</span>
                  </Button>
                </DialogFooter>
              </Dialog>
            </div>
            <div
              className={`items-center px-4 py-2 flex justify-end transition-all right-5 duration-500 fixed shadow-2xl ${
                !formOpener
                  ? "bg-red-500 rounded-tl-2xl rounded-tr-2xl w-[215px]"
                  : "bg-white w-full"
              } bottom-0 z-[110] lg:hidden`}
            >
              <Tooltip
                className="absolute bg-white text-black shadow-md"
                animate={{
                  mount: { scale: 1, y: 0 },
                  unmount: { scale: 0, y: 25 },
                }}
                content={`${!formOpener ? "Buka Form" : "Tutup Form"}`}
              >
                <Switch
                  labelProps={{
                    className: `${!formOpener ? "text-white" : "text-black"}`,
                  }}
                  checked={formOpener}
                  color="red"
                  label={!formOpener ? "Pesan Sekarang" : "Tutup form"}
                  onClick={(e: any) => setForm(e.target.checked)}
                />
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default index;
