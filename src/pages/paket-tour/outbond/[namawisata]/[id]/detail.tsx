import MiniCard from "@/components/HomeSection/MiniCard";
import Layout from "@/components/Layout";
import PaketOutbondCard from "@/components/micros/cards/PaketOutbondCard";
import OutbondForm from "@/components/micros/forms/OutbondForm";
import {
  OutbondFormProps,
  outbondValidator,
} from "@/interfaces/pesananInterface";
import { createOutbond, jenisPaketOutbond } from "@/interfaces/produkInterface";
import { reduxState } from "@/interfaces/reduxInterface";
import { setAlert, setLoading } from "@/store/mainSlice";
import { setPaketOutbond } from "@/store/produkSlice";
import { wrapper } from "@/store/store";
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
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//NOTE - Get data from server redux
export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, res, ...etc }) => {
      const { dispatch, getState } = store;
      const { params } = etc;
      const id = params?.id;
      await axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/outbond/${id}`)
        .then((datas) => {
          const { data } = datas.data;
          dispatch(setPaketOutbond(data));
        })
        .catch((err) => {
          console.log(err);
        });
      return { props: {} };
    }
);

interface outbond extends createOutbond {
  namaTempat: string;
}

const DetailOutbond = () => {
  const { query } = useRouter(),
    dispatch = useDispatch(),
    [formOpener, setForm] = useState<Boolean>(true),
    [onTop, setOnTop] = useState<Boolean>(false),
    [outbondFormData, setOutbondFormData] = useState<OutbondFormProps>(),
    [handleOpenDialog, setHandleOpenDialog] = useState<boolean>(false),
    headerRef = React.useRef<HTMLDivElement>(null),
    paketOutbond: outbond | any = useSelector(
      (state: reduxState) => state.produk.paketOutbond
    ),
    initialValues: OutbondFormProps = {
      nama: undefined,
      email: undefined,
      nomorTelepon: undefined,
      paketID: undefined,
      jumlahPeserta: undefined,
      tanggalReservasi: undefined,
      waktuJemput: undefined,
      lokasiJemput: undefined,
      pesananTambahan: "",
      type: "user",
    },
    router = useRouter();

  const handleCreateReservasi = async (
    values: OutbondFormProps | undefined
  ) => {
    dispatch(setLoading(true));
    await axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/res-outbond`, values)
      .then((res) => {
        dispatch(
          setAlert({
            type: "success",
            message: "Reservasi berhasil dibuat, silahkan cek email anda!",
            show: true,
          })
        );
      })
      .catch((err) => {
        dispatch(
          setAlert({
            type: "error",
            message: err.response.data.message,
            show: true,
          })
        );
      })
      .finally(() => {
        dispatch(setLoading(false));
        setHandleOpenDialog(false);
      });
  };

  useEffect(() => {
    const onScroll = () => {
      if (headerRef.current) {
        const headerRect = headerRef.current.getBoundingClientRect();
        headerRect.top < -200 ? setOnTop(true) : setOnTop(false);
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [headerRef]);
  return (
    <Layout>
      <div
        ref={headerRef}
        className="pt-16 container bottom-0 mx-auto text-center bg-white"
      >
        <p className="text-4xl mt-8">{paketOutbond.namaTempat}</p>
        <div className="flex mb-10 mt-3 flex-row flex-wrap gap-3 columns-4 justify-center">
          {paketOutbond &&
            paketOutbond.jenisPaket &&
            paketOutbond.jenisPaket.map((item: any, i: number) => (
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
        <div className="md:col-span-4 relative col-span-6 px-2 md:px-0">
          <div
            className={`sticky border-b py-4 border-gray-300 duration-300 transition-all overflow-x-auto w-full text-center z-50 bg-white ${
              onTop ? "opacity-100 top-14 h-fit" : "opacity-0 top-0 h-0"
            }`}
          >
            <div className="flex flex-row flex-nowrap snap-x overflow-y-auto gap-3 min-w-max columns-4 justify-center">
              {paketOutbond &&
                paketOutbond.jenisPaket &&
                paketOutbond.jenisPaket.map(
                  (item: jenisPaketOutbond, i: number) => (
                    <div className="snap-center" key={i}>
                      <MiniCard
                        onClick={(e) => router.push(`#wisata-${i + 1}`)}
                        className="py-1"
                        teks={`Paket Wisata ${i + 1}`}
                      />
                    </div>
                  )
                )}
            </div>
          </div>
          <div className="mb-10 px-2">{paketOutbond.keterangan}</div>
          <div className="space-y-14">
            {/* //NOTE - Paket Section */}
            {paketOutbond &&
              paketOutbond.jenisPaket &&
              paketOutbond.jenisPaket.map(
                (item: jenisPaketOutbond, i: number) => {
                  return (
                    <div key={i} className="pb-7">
                      <PaketOutbondCard paketData={item} index={i} />
                    </div>
                  );
                }
              )}
          </div>
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
              validationSchema={outbondValidator}
              validateOnChange
              validateOnMount
              onSubmit={async (values, { setSubmitting }) => {
                setHandleOpenDialog(true);
                setOutbondFormData(values);
                setSubmitting(true);
                return false;
              }}
            >
              {paketOutbond && paketOutbond.jenisPaket && (
                <OutbondForm jenisPaket={paketOutbond.jenisPaket} />
              )}
            </Formik>
            <Dialog
              size="xl"
              open={handleOpenDialog}
              handler={() => setHandleOpenDialog(!handleOpenDialog)}
            >
              <DialogHeader>Ayo cek lagi pesanan kamu 😊</DialogHeader>
              <DialogBody divider>
                {paketOutbond && paketOutbond.jenisPaket && outbondFormData && (
                  <div className="font-light text-lg text-black/60">
                    <p>
                      Atas nama{" "}
                      <span className="underline font-medium text-black/70">
                        {outbondFormData.nama}
                      </span>
                      , dengan email{" "}
                      <span className="underline font-medium text-black/70">
                        {outbondFormData.email}
                      </span>{" "}
                      & nomor Telepon{" "}
                      <span className="underline font-medium text-black/70">
                        {outbondFormData.nomorTelepon}
                      </span>{" "}
                      akan memesan{" "}
                      <span className="underline font-medium text-black/70">
                        Paket Wisata{" "}
                        {paketOutbond.jenisPaket.findIndex(
                          (item: jenisPaketOutbond) =>
                            item._id === outbondFormData.paketID
                        ) + 1}
                      </span>{" "}
                      dengan jumlah peserta{" "}
                      <span className="underline font-medium text-black/70">
                        {outbondFormData.jumlahPeserta} orang.
                      </span>
                    </p>
                    <p>
                      Pesanan akan dilakukan pada tanggal{" "}
                      <span className="underline font-medium text-black/70">
                        {outbondFormData.tanggalReservasi?.toString()}
                      </span>{" "}
                      dan jam{" "}
                      <span className="underline font-medium text-black/70">
                        {outbondFormData.waktuJemput}
                      </span>{" "}
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
                  onClick={() => handleCreateReservasi(outbondFormData)}
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

export default DetailOutbond;
