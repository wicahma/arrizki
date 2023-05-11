import React from "react";
import Layout from "@/components/Layout";
import {
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
} from "@material-tailwind/react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import PesananTable from "@/components/tables/PesananTable";
import { wrapper } from "@/store/store";
import { setReservasiMobil, setReservasiWisata } from "@/store/pesananSlice";

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, res, ...etc }) => {
      const { dispatch, getState } = store;
      await axios
        .get(`${process.env.API_URL}/api/v1/res-wisata`)
        .then((datas) => {
          const { data } = datas.data;
          dispatch(setReservasiWisata(data));
        })
        .catch((err) => {
          console.log(err);
        });
      await axios
        .get(`${process.env.API_URL}/api/v1/res-car`)
        .then((datas) => {
          const { data } = datas.data;
          dispatch(setReservasiMobil(data));
        })
        .catch((err) => {
          console.log(err);
        });

      return { props: {} };
    }
);

const index = (props: any) => {
  const { reservasiMobil, reservasiWisata } = useSelector(
      (state: any) => state.pesanan
    ),
    data = [
      {
        label: "Reservasi Wisata",
        value: "reservasi_wisata",
        desc: (
          <>
            <PesananTable
              identifier="res-wisata"
              tableTitle={[
                "Nama Pemesan",
                "Nomor Telepon",
                "Email",
                "Tanggal Mulai",
                "Waktu Jemput",
                "Lokasi Jemput",
                "Pesanan Tambahan",
              ]}
              tableData={reservasiWisata}
            />
          </>
        ),
      },
      {
        label: "Reservasi Mobil",
        value: "reservasi_mobil",
        desc: (
          <>
            <PesananTable
              identifier="res-car"
              tableTitle={[
                "Nama Pemesan",
                "Nomor Telepon",
                "Email",
                "Tanggal Pesan",
                "Waktu Antar",
                "Lokasi Antar",
                "Pesanan Tambahan",
              ]}
              tableData={reservasiMobil}
            />
          </>
        ),
      },
    ];

  const dispatch = useDispatch(),
    fetchProduk = async (
      identifier: String,
      data: any,
      id: string | undefined
    ): Promise<any> => {
      let methods;
      switch (data.fetchType || data.get("fetchType")) {
        case "create":
          methods = "POST";
          break;
        case "update":
          methods = "PUT";
        default:
          break;
      }
      return await axios({
        method: methods,
        url: `${process.env.API_URL}/api/v1/${identifier}${
          methods === "POST" ? "" : `/${id}`
        }`,
        data: data,
        headers: {
          Authorization: `Bearer ${JSON.parse(
            (localStorage.getItem("token") ||
              sessionStorage.getItem("token")) ??
              ""
          )}`,
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
            .get(`${process.env.API_URL}/api/v1/${identifier}`)
            .then((datas) => {
              const { data } = datas.data;
              dispatch({ type: "produk/setMobilState", payload: data });
            })
            .catch((err) => {
              console.log(err);
            });
          return data;
        })
        .catch((err) => {
          console.log(err);
          dispatch({
            type: "main/setAlert",
            payload: {
              type: "error",
              message: `${err.response.status} - ${err.response.data.message}`,
              show: true,
            },
          });
        });
    };

  return (
    <Layout className="flex" pageTitle="Pesanan">
      <div className="max-w-full w-full block md:p-10 py-10 px-2">
        <Tabs value="reservasi_wisata" className="max-w-full">
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
