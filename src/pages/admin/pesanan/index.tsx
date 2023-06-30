import Layout from "@/components/Layout";
import CustomForm from "@/components/micros/forms/CustomForm";
import MobilForm from "@/components/micros/forms/MobilForm";
import OutbondForm from "@/components/micros/forms/OutbondForm";
import WisataForm from "@/components/micros/forms/WisataForm";
import PesananTable from "@/components/tables/PesananTable";
import { MobilFormProps, carValidation } from "@/interfaces/carProps";
import {
  customFormProps,
  customValidation,
} from "@/interfaces/customWisataProps";
import {
  OutbondFormProps,
  WisataFormProps,
  outbondValidator,
  wisataValidator,
} from "@/interfaces/pesananInterface";
import { createWisata } from "@/interfaces/produkInterface";
import { reduxState } from "@/interfaces/reduxInterface";
import { setAlert, setLoading } from "@/store/mainSlice";
import {
  setReservasiCustom,
  setReservasiMobil,
  setReservasiOutbond,
  setReservasiWisata,
} from "@/store/pesananSlice";
import { wrapper } from "@/store/store";
import {
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
} from "@material-tailwind/react";
import axios from "axios";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, res, ...etc }) => {
      const { dispatch, getState } = store;
      await axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/res-wisata`, {
          headers: {
            Authorization: `Bearer ${getState().main.token ?? ""}`,
          },
        })
        .then((datas) => {
          const { data } = datas.data;
          dispatch(setReservasiWisata(data));
        })
        .catch((err) => {
          console.log(err);
        });
      await axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/res-car`)
        .then((datas) => {
          const { data } = datas.data;
          dispatch(setReservasiMobil(data));
        })
        .catch((err) => {
          console.log(err);
        });
      await axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/res-outbond`)
        .then((datas) => {
          const { data } = datas.data;
          dispatch(setReservasiOutbond(data));
        })
        .catch((err) => {
          console.log(err);
        });
      await axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/res-custom`)
        .then((datas) => {
          const { data } = datas.data;
          dispatch(setReservasiCustom(data));
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

const index = (props: any) => {
  const { reservasiMobil, reservasiWisata, reservasiOutbond, reservasiCustom } =
      useSelector((state: reduxState) => state.pesanan),
    paketWisata: wisata | any = useSelector(
      (state: reduxState) => state.produk.paketWisata
    ),
    privateInitialValues: WisataFormProps = {
      nama: "",
      email: "",
      nomorTelepon: "",
      paketID: "",
      jumlahPeserta: "",
      tanggalReservasi: "",
      waktuJemput: "",
      lokasiJemput: "",
      pesananTambahan: "",
      type: "admin",
    },
    carInitialValues: MobilFormProps = {
      nama: "",
      email: "",
      nomorTelepon: "",
      jenisMobil: "",
      tanggalReservasi: "",
      waktuAntar: "",
      lokasiAntar: "",
      pesananTambahan: "",
    },
    outbondInitialValues: OutbondFormProps = {
      nama: "",
      email: "",
      nomorTelepon: "",
      paketID: "",
      jumlahPeserta: "",
      tanggalReservasi: "",
      waktuJemput: "",
      lokasiJemput: "",
      pesananTambahan: "",
      type: "admin",
    },
    customInitialValues: customFormProps = {
      email: "",
      nama: "",
      nomorTelepon: "",
      tanggalReservasi: "",
      waktuJemput: "",
      lokasiJemput: "",
      pesananTambahan: "",
      fasilitas: "",
      jumlahOrang: "",
      lokasiAntar: "",
      armada: "",
      harga: "",
      type: "admin",
    },
    data = [
      {
        label: "Reservasi Private Wisata",
        value: "reservasi_wisata",
        desc: (
          <Formik
            initialValues={privateInitialValues}
            validationSchema={wisataValidator}
            validateOnChange
            validateOnMount
            onSubmit={async (values, { setSubmitting }) => {
              dispatch({
                type: "main/setLoading",
                payload: true,
              });
              setSubmitting(true);
              fetchPesanan("res-wisata", values, values.id);
              return false;
            }}
          >
            <>
              <WisataForm jenisPaket={paketWisata.jenisPaket} admin={true} />
              <div className="w-full overflow-x-auto">
                <PesananTable
                  identifier="res-wisata"
                  tableTitle={[
                    "ID",
                    "Nama Pemesan",
                    "Nomor Telepon",
                    "Email",
                    "Tanggal Mulai",
                    "Paket Wisata",
                    "Waktu Jemput",
                    "Lokasi Jemput",
                    "Pesanan Tambahan",
                    "Harga",
                    "Jumlah Peserta",
                    "Dibuat pada",
                  ]}
                  tableData={reservasiWisata}
                />
              </div>
            </>
          </Formik>
        ),
      },
      {
        label: "Reservasi Mobil",
        value: "reservasi_mobil",
        desc: (
          <Formik
            initialValues={carInitialValues}
            validationSchema={carValidation}
            validateOnChange
            validateOnMount
            onSubmit={async (values, { setSubmitting, resetForm }) => {
              dispatch({
                type: "main/setLoading",
                payload: true,
              });
              setSubmitting(true);
              fetchPesanan("res-car", values, values.id);
              resetForm();
              return false;
            }}
          >
            <>
              <MobilForm mobilData={[]} admin={true} />
              <div className="w-full overflow-x-auto">
                <PesananTable
                  identifier="res-car"
                  tableTitle={[
                    "ID",
                    "Nama Pemesan",
                    "Nomor Telepon",
                    "Email",
                    "Tanggal Antar",
                    "Waktu Antar",
                    "Lokasi Antar",
                    "Data Mobil",
                    "Pesanan Tambahan",
                    "Dibuat pada",
                  ]}
                  tableData={reservasiMobil}
                />
              </div>
            </>
          </Formik>
        ),
      },
      {
        label: "Reservasi Outbond",
        value: "reservasi_outbond",
        desc: (
          <Formik
            initialValues={outbondInitialValues}
            validationSchema={outbondValidator}
            validateOnChange
            validateOnMount
            onSubmit={async (values, { setSubmitting }) => {
              dispatch({
                type: "main/setLoading",
                payload: true,
              });
              setSubmitting(true);
              fetchPesanan("res-outbond", values, values.id);
              return false;
            }}
          >
            <>
              {/* //NOTE - Ngebuat pesanan table data, sama nyesuain form datanya */}
              <OutbondForm jenisPaket={[]} admin={true} />
              <div className="w-full overflow-x-auto">
                <PesananTable
                  identifier="res-outbond"
                  tableTitle={[
                    "ID",
                    "Nama Pemesan",
                    "Nomor Telepon",
                    "Email",
                    "Tanggal Mulai",
                    "Paket Wisata",
                    "Waktu Jemput",
                    "Lokasi Jemput",
                    "Pesanan Tambahan",
                    "Harga",
                    "Jumlah Peserta",
                    "Dibuat pada",
                  ]}
                  tableData={reservasiOutbond}
                />
              </div>
            </>
          </Formik>
        ),
      },
      {
        label: "Reservasi Custom",
        value: "reservasi_custom",
        desc: (
          <Formik
            initialValues={customInitialValues}
            validationSchema={customValidation}
            validateOnChange
            validateOnMount
            onSubmit={async (values, { setSubmitting }) => {
              dispatch({
                type: "main/setLoading",
                payload: true,
              });
              setSubmitting(true);
              fetchPesanan("res-custom", values, values.id);
              return false;
            }}
          >
            <>
              {/* //NOTE - Ngebuat pesanan table data, sama nyesuain form datanya */}
              <CustomForm admin={true} />
              <div className="w-full overflow-x-auto">
                <PesananTable
                  identifier="res-custom"
                  tableTitle={[
                    "ID",
                    "Nama Pemesan",
                    "Nomor Telepon",
                    "Email",
                    "Jumlah Peserta",
                    "Tanggal Mulai",
                    "Waktu Jemput",
                    "Lokasi Jemput",
                    "Lokasi Antar",
                    "Armada",
                    "Fasilitas Pilhan",
                    "Pesanan Tambahan",
                    "Harga",
                    "Dibuat pada",
                  ]}
                  tableData={reservasiCustom}
                />
              </div>
            </>
          </Formik>
        ),
      },
    ];

  const dispatch = useDispatch(),
    fetchPesanan = async (
      identifier: String,
      data: any,
      id: string | undefined
    ): Promise<any> => {
      let state: string;
      switch (identifier) {
        case "res-wisata":
          state = "pesanan/setReservasiWisata";
          break;
        case "res-car":
          state = "pesanan/setReservasiMobil";
          break;
        case "res-outbond":
          state = "pesanan/setReservasiOutbond";
          break;
        case "res-custom":
          state = "pesanan/setReservasiCustom";
          break;
        default:
          dispatch(setLoading(false));
          dispatch({
            type: "main/setAlert",
            payload: {
              type: "warning",
              message: "Tidak ada identifier yang cocok",
              show: true,
            },
          });
          return;
      }
      return await axios({
        method: "PUT",
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/${identifier}/${id}`,
        data: data,
        headers: {
          Authorization: `Bearer ${
            (localStorage.getItem("token") ||
              sessionStorage.getItem("token")) ??
            ""
          }`,
        },
      })
        .then(({ status, data }) => {
          dispatch({
            type: "main/setAlert",
            payload: {
              type: "success",
              message: `${data.message}, status ${status}`,
              show: true,
            },
          });
          axios
            .get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/${identifier}`)
            .then((datas) => {
              const { data } = datas.data;
              dispatch({
                type: "main/setLoading",
                payload: false,
              });
              dispatch({ type: state, payload: data });
            })
            .catch((err) => {
              dispatch({
                type: "main/setLoading",
                payload: false,
              });
              dispatch(
                setAlert({
                  type: "error",
                  message:
                    "Terjadi kesalahan pada server! Semua data gagal diambil!",
                  show: true,
                })
              );
            });
          return data;
        })
        .catch((err) => {
          dispatch({
            type: "main/setLoading",
            payload: false,
          });
          dispatch({
            type: "main/setAlert",
            payload: {
              type: "error",
              message: "Terjadi kesalahan, silahkan coba lagi!",
              show: true,
            },
          });
        });
    };

  return (
    <Layout className="flex" pageTitle="Pesanan">
      <div className="max-w-full w-full block md:p-10 py-10 px-2">
        <Tabs value="reservasi_outbond" className="max-w-full">
          <TabsHeader className="">
            {data.map(({ label, value }) => (
              <Tab key={value} value={value}>
                {label}
              </Tab>
            ))}
          </TabsHeader>
          <TabsBody>
            {data.map(({ value, desc }) => (
              <TabPanel className="" key={value} value={value}>
                {desc}
              </TabPanel>
            ))}
          </TabsBody>
        </Tabs>
      </div>
    </Layout>
  );
};

export default index;
