import React, { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import TextHeader from "@/components/TextHeader/main";
import MobilCard from "@/components/micros/cards/MobilCard";
import "@/styles/Sewa.module.css";
import MobilForm from "@/components/micros/forms/MobilForm";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Switch,
  Tooltip,
} from "@material-tailwind/react";
import { wrapper } from "@/store/store";
import axios from "axios";
import { setMobilState } from "@/store/produkSlice";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import { MobilFormProps, carValidation } from "@/interfaces/carProps";
import Loading from "@/components/micros/loading";

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, res, ...etc }) => {
      const { dispatch, getState } = store;
      if (getState().produk.tableMobil.length === 0) {
        await axios
          .get(`${process.env.API_URL}/api/v1/car`)
          .then((datas) => {
            const { data } = datas.data;
            dispatch(setMobilState(data));
          })
          .catch((err) => {
            console.log(err);
          });
      }
      return { props: {} };
    }
);

const index = (props: any) => {
  const mobil = useSelector((state: any) => state.produk.tableMobil),
    selectedCar = useSelector((state: any) => state.produk.selectedCar),
    dispatch = useDispatch(),
    [mobilFormData, setMobilFormData] = useState<MobilFormProps>(),
    [formOpener, setForm] = useState<Boolean>(true),
    [handleOpenDialog, setHandleOpenDialog] = useState<boolean>(false),
    rupiah = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }),
    initialValues: MobilFormProps = {
      nama: undefined,
      email: undefined,
      nomorTelepon: undefined,
      jenisMobil: selectedCar,
      tanggalReservasi: undefined,
      waktuAntar: undefined,
      lokasiAntar: undefined,
      pesananTambahan: "",
    };

  useEffect(() => {
    window.addEventListener("resize", () => {
      window.innerWidth > 960 && setForm(true);
    });
    console.log(formOpener);
  }, [formOpener]);

  const handleCreateReservasi = async (values: MobilFormProps | undefined) => {
    dispatch({
      type: "main/setLoading",
      payload: true,
    });
    setHandleOpenDialog(false);
    axios
      .post(`${process.env.API_URL}/api/v1/res-car`, values)
      .then((_) => {
        dispatch({
          type: "main/setLoading",
          payload: false,
        });
        dispatch({
          type: "main/setAlert",
          payload: {
            show: true,
            message: "Berhasil membuat reservasi, Silahkan cek email anda!",
            type: "success",
          },
        });
      })
      .catch((_) => {
        dispatch({
          type: "main/setLoading",
          payload: false,
        });
        dispatch({
          type: "main/setAlert",
          payload: {
            show: true,
            message: "Gagal membuat reservasi!",
            type: "error",
          },
        });
        console.log(_);
      });
  };

  return (
    <Layout pageTitle="Sewa Mobil">
      <div className="pt-14 container mx-auto">
        <TextHeader
          className="mt-10"
          title="Pilih Mobil untuk anda sewa."
          subtitle="Arrizki Tour menyediakan layanan sewa mobil untuk para wisatawan atau kalian yang sedang membuutuhkan mobil untuk akomodasi dll."
        />
        <div className="divide-x divide-gray-400 gap-3 grid grid-cols-6 mx-auto">
          <div className="lg:col-span-4 col-span-6 mb-10 w-full space-y-10 sm:mx-auto px-5">
            <div className="col-span-2 bg-red-400 p-5 rounded-lg text-white">
              <h2 className="text-xl font-semibold">Fasilitas</h2>
              <p>
                Berikut beberapa fasilitas yang akan kamu dapatkan ketika
                memesan mobil di Arrizki Tour
              </p>
              <ul className="list-disc list-inside ml-5">
                <li>6 Seat</li>
                <li>BBM</li>
                <li>Driver</li>
                <li>Air Mineral</li>
                <li>AC Charger</li>
              </ul>
            </div>
            <div className="grid grid-cols-2">
              {mobil
                .filter((data: any) => data.status === "aktif")
                .map((item: any, i: number): React.ReactNode => {
                  return (
                    <MobilCard
                      key={i}
                      id={item._id}
                      image={`${process.env.API_URL}/images/${item.imageId}`}
                      price={item.pricePerDay}
                      title={item.unitName}
                    />
                  );
                })}
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
              <h3 className="text-2xl mb-3 font-medium">Pesan Sekarang</h3>
              <Formik
                initialValues={initialValues}
                validationSchema={carValidation}
                validateOnChange
                validateOnMount
                onSubmit={async (values, { setSubmitting }) => {
                  setHandleOpenDialog(true);
                  setMobilFormData(values);
                  setSubmitting(true);
                  return false;
                }}
              >
                <MobilForm mobilData={mobil} />
              </Formik>
              <Dialog
                size="xl"
                open={handleOpenDialog}
                handler={() => setHandleOpenDialog(!handleOpenDialog)}
              >
                <DialogHeader>Ayo cek lagi pesanan kamu 😊</DialogHeader>
                <DialogBody divider>
                  {mobilFormData && (
                    <ul>
                      <li className="bg-red-400 font-semibold text-white p-3 rounded-lg">
                        <h3 className="text-xl font-bold">Data Mobil</h3>
                        {mobil
                          .filter(
                            (data: any) => data._id === mobilFormData.jenisMobil
                          )
                          .map(
                            (item: any, i: number): React.ReactNode => (
                              <>
                                <p>
                                  Nama unit:{" "}
                                  <span className="font-normal">
                                    {item.unitName}
                                  </span>
                                </p>
                                <p>
                                  Seat:{" "}
                                  <span className="font-normal">
                                    {item.seat}
                                  </span>
                                </p>
                                <p>
                                  Harga:{" "}
                                  <span className="font-normal">
                                    {rupiah.format(item.pricePerDay)}
                                  </span>
                                </p>
                              </>
                            )
                          )}
                      </li>
                      <li className="mt-5">
                        <span className="font-semibold">Nama</span> :{" "}
                        {mobilFormData.nama}
                      </li>
                      <li>
                        <span className="font-semibold">Email</span> :{" "}
                        {mobilFormData.email}
                      </li>
                      <li>
                        <span className="font-semibold">Nomor Telepon</span> :{" "}
                        {mobilFormData.nomorTelepon}
                      </li>
                      <li>
                        <span className="font-semibold">Tanggal Reservasi</span>{" "}
                        : {mobilFormData.tanggalReservasi}
                      </li>
                      <li>
                        <span className="font-semibold">Waktu Antar</span> :{" "}
                        {mobilFormData.waktuAntar}
                      </li>
                      <li>
                        <span className="font-semibold">Lokasi Antar</span> :{" "}
                        {mobilFormData.lokasiAntar}
                      </li>
                      <li>
                        <span className="font-semibold">Pesanan Tambahan</span>{" "}
                        :{" "}
                        {mobilFormData.pesananTambahan === ""
                          ? "Tidak ada"
                          : mobilFormData.pesananTambahan}
                      </li>
                    </ul>
                  )}
                  <p className="mt-5">Apakah data diatas ini sudah benar?</p>
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
                    onClick={() => handleCreateReservasi(mobilFormData)}
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
                  defaultChecked={true}
                  className=""
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
