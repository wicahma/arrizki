import React, { MouseEvent, useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Switch,
  Tooltip,
  Typography,
} from "@material-tailwind/react";
import WisataForm from "@/components/micros/forms/WisataForm";
import MiniCard from "@/components/HomeSection/MiniCard";
import PaketWisataCard from "@/components/micros/cards/PaketWisataCard";
import { wrapper } from "@/store/store";
import axios from "axios";
import { setPaketWisata } from "@/store/produkSlice";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import * as Yup from "yup";
import Loading from "@/components/micros/loading";
import { createWisata } from "@/interfaces/produkInterface";

//NOTE - Get data from server redux
export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, res, ...etc }) => {
      const { dispatch, getState } = store;
      const { params } = etc;
      const id = params?.id;
      console.log(id);
      await axios
        .get(`${process.env.API_URL}/api/v1/wisata/${id}`)
        .then((datas) => {
          const { data } = datas.data;
          dispatch(setPaketWisata(data));
        })
        .catch((err) => {
          console.log(err);
        });
      return { props: {} };
    }
);

interface wisata extends createWisata {
  namaPaket: string;
}

//NOTE - Wisata Form Interface
interface WisataFormProps {
  nama: string | undefined;
  email: string | undefined;
  nomorTelepon: string | undefined;
  paketID: string | undefined;
  jumlahPeserta: number | undefined;
  tanggalReservasi: Date | undefined;
  waktuJemput: string | undefined;
  lokasiJemput: string | undefined;
  pesananTambahan: string | undefined;
}

//NOTE - Wisata Validation Schema
const wisataValidator = Yup.object().shape({
  nama: Yup.string().required("Nama harus diisi !"),
  email: Yup.string()
    .email("Email tidak valid")
    .required("Email harus diisi !"),
  nomorTelepon: Yup.string()
    .required("Nomor telepon harus diisi !")
    .test(
      "must-start-with-08",
      "Nomor Telepon harus dimulai dengan 08",
      (value, context) => (value?.toString().startsWith("08") ? true : false)
    )
    .test("only-digits", "Masukan Nomor telepon yang valid !", (value) =>
      /^\d+$/g.test(value?.toString()) ? true : false
    )
    .min(9, "Nomor telepon harus nimimal 9 digit !"),
  paketID: Yup.string().required("Paket wisata harus diisi !"),
  jumlahPeserta: Yup.number()
    .typeError("Jumlah peserta harus diisi !")
    .required("Jumlah peserta harus diisi !"),
  tanggalReservasi: Yup.date()
    .typeError("Tanggal reservasi harus berupa tanggal !")
    .required("Tanggal reservasi harus diisi !")
    .min(new Date(), "Tanggal reservasi tidak boleh kurang dari hari ini !"),
  waktuJemput: Yup.string().required("Waktu jemput harus diisi !"),
  lokasiJemput: Yup.string().required("Lokasi jemput harus diisi !"),
});

//NOTE - Main page Function
const DetailWisata = (props: any) => {
  const { query } = useRouter(),
    dispatch = useDispatch(),
    [formOpener, setForm] = useState<Boolean>(true),
    [onTop, setOnTop] = useState<Boolean>(false),
    [wisataFormData, setWisataFormData] = useState<WisataFormProps>(),
    [handleOpenDialog, setHandleOpenDialog] = useState<boolean>(false),
    [isLoading, setIsLoading] = useState<boolean>(false),
    headerRef = React.useRef<HTMLDivElement>(null),
    paketWisata: wisata = useSelector((state: any) => state.produk.paketWisata),
    selectedJumlahPeserta = useSelector(
      (state: any) => state.produk.selectedJumlahPeserta
    ),
    rupiah = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }),
    initialValues: WisataFormProps = {
      nama: undefined,
      email: undefined,
      nomorTelepon: undefined,
      paketID: undefined,
      jumlahPeserta: selectedJumlahPeserta,
      tanggalReservasi: undefined,
      waktuJemput: undefined,
      lokasiJemput: undefined,
      pesananTambahan: "",
    },
    router = useRouter();

  useEffect(() => {
    window.addEventListener("resize", () => {
      window.innerWidth > 960 && setForm(true);
    });
    console.log(formOpener);
  }, [formOpener]);

  useEffect(() => {
    const onScroll = () => {
      if (headerRef.current) {
        const headerRect = headerRef.current.getBoundingClientRect();
        headerRect.top < -400 ? setOnTop(true) : setOnTop(false);
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [headerRef]);

  const handleCreateReservasi = (values: WisataFormProps | undefined): void => {
    setIsLoading(true);
    setHandleOpenDialog(false);
    axios
      .post(`${process.env.API_URL}/api/v1/res-wisata`, values)
      .then((_) => {
        setIsLoading(false);
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
        setIsLoading(false);
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
    <Layout>
      <div
        ref={headerRef}
        className="pt-16 container bottom-0 mx-auto text-center bg-white"
      >
        <Typography variant="h4" className="text-4xl mt-8">
          {paketWisata.namaPaket}
        </Typography>
        <div className="flex mb-10 mt-3 flex-row flex-wrap gap-3 columns-4 justify-center">
          {paketWisata &&
            paketWisata.jenisPaket &&
            paketWisata.jenisPaket.map((item, i: number) => (
              <MiniCard
                key={i}
                onClick={(e) => router.push(`#wisata-${i + 1}`)}
                className="py-1"
                teks={`Paket Wisata ${i + 1}`}
              />
            ))}
        </div>
      </div>

      <div className="divide-x divide-gray-400 container gap-3 grid grid-cols-6 mx-auto">
        <div className="md:col-span-4 relative col-span-6 px-2 md:px-0 space-y-14">
          <div
            className={`sticky border-b py-4 border-gray-300 duration-300 transition-all w-full text-center z-50 bg-white ${
              onTop ? "opacity-100 top-14 h-fit" : "opacity-0 top-0 h-0"
            }`}
          >
            <div className="flex flex-row flex-nowrap overflow-y-auto gap-3 columns-4 justify-center">
              {paketWisata &&
                paketWisata.jenisPaket &&
                paketWisata.jenisPaket.map((item, i: number) => (
                  <MiniCard
                    key={i}
                    onClick={(e) => router.push(`#wisata-${i + 1}`)}
                    className="py-1"
                    teks={`Paket Wisata ${i + 1}`}
                  />
                ))}
            </div>
          </div>
          {/* //NOTE - Paket Section */}
          {paketWisata &&
            paketWisata.jenisPaket &&
            paketWisata.jenisPaket.map((item, i: number) => {
              return <PaketWisataCard paketData={item} index={i + 1} key={i} />;
            })}
        </div>
        {/* //NOTE - Form Section */}
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
              validationSchema={wisataValidator}
              validateOnChange
              validateOnMount
              onSubmit={async (values, { setSubmitting }) => {
                setHandleOpenDialog(true);
                setWisataFormData(values);
                setSubmitting(true);
                return false;
              }}
            >
              {paketWisata && paketWisata.jenisPaket && (
                <WisataForm jenisPaket={paketWisata.jenisPaket} />
              )}
            </Formik>
            <Dialog
              size="xl"
              open={handleOpenDialog}
              handler={() => setHandleOpenDialog(!handleOpenDialog)}
            >
              <DialogHeader>Ayo cek lagi pesanan kamu 😊</DialogHeader>
              <DialogBody divider>
                {paketWisata && paketWisata.jenisPaket && wisataFormData && (
                  <div className="font-light text-lg text-black/60">
                    <p>
                      Atas nama{" "}
                      <span className="underline font-medium text-black/70">
                        {wisataFormData.nama}
                      </span>
                      , dengan email{" "}
                      <span className="underline font-medium text-black/70">
                        {wisataFormData.email}
                      </span>{" "}
                      & nomor Telepon{" "}
                      <span className="underline font-medium text-black/70">
                        {wisataFormData.nomorTelepon}
                      </span>{" "}
                      akan memesan{" "}
                      <span className="underline font-medium text-black/70">
                        Paket Wisata{" "}
                        {paketWisata.jenisPaket.findIndex(
                          (item) => item._id === wisataFormData.paketID
                        ) + 1}
                      </span>{" "}
                      dengan jumlah peserta{" "}
                      <span className="underline font-medium text-black/70">
                        {wisataFormData.jumlahPeserta} orang.
                      </span>
                    </p>
                    <p>
                      Pesanan akan dilakukan pada tanggal{" "}
                      <span className="underline font-medium text-black/70">
                        {wisataFormData.tanggalReservasi?.toString()}
                      </span>{" "}
                      dan jam{" "}
                      <span className="underline font-medium text-black/70">
                        {wisataFormData.waktuJemput}
                      </span>{" "}
                      dengan total harga{" "}
                      <span className="underline font-medium text-black/70">
                        {rupiah.format(
                          paketWisata.jenisPaket
                            .filter(
                              (item) => item._id === wisataFormData.paketID
                            )[0]
                            .pax.filter(
                              (item) =>
                                item.jumlah ===
                                Number(wisataFormData.jumlahPeserta)
                            )[0].harga
                        )}
                      </span>
                    </p>
                  </div>
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
                  onClick={() => handleCreateReservasi(wisataFormData)}
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
                label={`${!formOpener ? "Pesan sekarang?" : "Tutup Form"}`}
                onClick={(e: any) => setForm(e.target.checked)}
              />
            </Tooltip>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DetailWisata;
