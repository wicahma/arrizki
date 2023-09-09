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
  Step,
  Stepper,
  Switch,
  Tooltip,
  Typography,
} from "@material-tailwind/react";
import axios from "axios";
import { Formik } from "formik";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const index = (props: any) => {
  const [activeStep, setActiveStep] = useState(0);
  const [isLastStep, setIsLastStep] = useState(false);
  const [isFirstStep, setIsFirstStep] = useState(false);

  const handleNext = () => !isLastStep && setActiveStep((cur) => cur + 1);
  const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1);

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
      instagram: "",
      jumlahOrang: "",
      tanggalReservasi: "",
      waktuJemput: "",
      lokasiJemput: "",
      listWisata: "",
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
      <div className="pt-14 h-[40vh] relative z-10 bg-white">
        <TourList pathname={pathname} />
        <TextHeader
          className="mt-10 text-white"
          title="Custom Tour"
          subtitle="Buat Custom Tour sesuai dengan keinginan anda."
        />
        <Image
          src={"/assets/images/candi.jpg"}
          alt="wisata"
          width={1000}
          height={1000}
          className="absolute top-0 w-full h-full -z-10 object-cover left-0"
        />
      </div>
      <div className="pt-10 container mx-auto">
        <div className="space-y-10 divide-gray-400 mx-auto">
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
          </div>

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
                      <span className="font-semibold">Instagram</span> :{" "}
                      {customFormData.instagram}
                    </li>
                    <li>
                      <span className="font-semibold">Jumlah Orang</span> :{" "}
                      {customFormData.jumlahOrang}
                    </li>
                    <li>
                      <span className="font-semibold">Tanggal Reservasi</span> :{" "}
                      {customFormData.tanggalReservasi}
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
                      <span className="font-semibold">List Wisata</span> :{" "}
                      {customFormData.listWisata}
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
                      <span className="font-semibold">Pesanan Tambahan</span> :{" "}
                      {customFormData.pesananTambahan}
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
      </div>
    </Layout>
  );
};

export default index;
