import React, { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import ProductTable from "@/components/tables/ProductTable";
import {
  Button,
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
} from "@material-tailwind/react";
import Produk, {
  createMobil,
  createMobilData,
  createWisata,
  createWisataData,
  mobilValidationSchema,
  wisataValidationSchema,
} from "../../../interfaces/produkInterface";
import { wrapper } from "@/store/store";
import axios from "axios";
import { setMobilState, setWisataState } from "@/store/produkSlice";
import { useDispatch, useSelector } from "react-redux";
import { Form, Formik } from "formik";
import WisataForm from "@/components/micros/forms/admin/WisataForm";
import MobilForm from "@/components/micros/forms/admin/MobilForm";
import Loading from "@/components/micros/loading";
import { reduxState } from "@/interfaces/reduxInterface";

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, res, ...etc }) => {
      const { dispatch, getState } = store;
      await axios
        .get(`${process.env.API_URL}/api/v1/wisata`)
        .then((datas) => {
          const { data } = datas.data;
          dispatch(setWisataState(data));
        })
        .catch((err) => {
          console.log(err);
        });
      await axios
        .get(`${process.env.API_URL}/api/v1/car`)
        .then((datas) => {
          const { data } = datas.data;
          dispatch(setMobilState(data));
        })
        .catch((err) => {
          console.log(err);
        });

      return { props: {} };
    }
);

const index = (props: Produk) => {
  const dispatch = useDispatch(),
    fetchProduk = async (
      identifier: String,
      data: createMobil | createWisata | any,
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
      console.log({ methods });
      return await axios({
        method: methods,
        url: `${process.env.API_URL}/api/v1/${identifier}${
          methods === "POST" ? "" : `/${id}`
        }`,
        data: data,
        headers: {
          Authorization: `Bearer ${
            (localStorage.getItem("token") ||
              sessionStorage.getItem("token")) ??
            ""
          }`,
        },
      })
        .then((response) => {
          dispatch({
            type: "main/setLoading",
            payload: false,
          });
          dispatch({
            type: "main/setAlert",
            payload: {
              type: "success",
              message: `${response.data.message}, status ${response.status}`,
              show: true,
            },
          });
          console.log({ response });
          console.log({ identifier });

          axios
            .get(`${process.env.API_URL}/api/v1/${identifier}`)
            .then((datas) => {
              const { data } = datas.data;
              console.log({ data });
              if (identifier === "wisata")
                dispatch({ type: "produk/setWisataState", payload: data });
              else if (identifier === "mobil")
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
            type: "main/setLoading",
            payload: false,
          });
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

  const wisata = useSelector((state: reduxState) => state.produk.tableWisata),
    mobil = useSelector((state: reduxState) => state.produk.tableMobil),
    [formOpener, setForm] = React.useState<boolean>(true),
    data = [
      {
        label: "Wisata",
        value: "wisata",
        desc: (
          <Formik
            initialValues={createWisataData}
            validationSchema={wisataValidationSchema}
            validateOnChange
            validateOnMount
            onSubmit={async (values, { setSubmitting }) => {
              setSubmitting(true);
              dispatch({
                type: "main/setLoading",
                payload: true,
              });
              setSubmitting(true);
              fetchProduk("wisata", values, values._id);
              return false;
            }}
          >
            <Form>
              <Button
                onClick={() => setForm(!formOpener)}
                color="red"
                fullWidth
                className="mb-10"
              >{`${!formOpener ? "Buka form" : "Tutup form"}`}</Button>
              <div
                className={`${
                  formOpener
                    ? "block border-y-2 border-y-gray-600 py-10 mb-10"
                    : "hidden"
                }`}
              >
                <WisataForm />
              </div>
              <div className="w-full overflow-x-auto">
                <ProductTable
                  identifier="wisata"
                  tableTitle={[
                    "ID",
                    "Nama Paket",
                    "List Wisata",
                    "Harga Minimum",
                    "Status",
                    "Gambar",
                  ]}
                  tableData={wisata}
                />
              </div>
            </Form>
          </Formik>
        ),
      },
      {
        label: "Mobil",
        value: "mobil",
        desc: (
          <Formik
            initialValues={createMobilData}
            validationSchema={mobilValidationSchema}
            validateOnChange
            validateOnMount
            onSubmit={async (values, { setSubmitting }) => {
              dispatch({
                type: "main/setLoading",
                payload: true,
              });
              setSubmitting(true);
              let mobil: FormData | createMobil | any;
              if (values.fetchType === "create") {
                mobil = new FormData();
                Object.entries(values).map(([key, value]) => {
                  mobil.append(key, value);
                });
                fetchProduk("car", mobil, values._id);
              } else {
                console.log(values);
                fetchProduk("car", values, values._id);
              }
              return false;
            }}
          >
            <Form>
              <Button
                onClick={() => setForm(!formOpener)}
                color="red"
                fullWidth
                className="mb-10"
              >{`${!formOpener ? "Buka form" : "Tutup form"}`}</Button>
              <div
                className={`${
                  formOpener
                    ? "block border-y-2 border-y-gray-600 py-10 mb-10"
                    : "hidden"
                }`}
              >
                <MobilForm />
              </div>
              <div className="w-full overflow-x-auto">
                <ProductTable
                  identifier="car"
                  tableTitle={[
                    "ID",
                    "Nama Mobil",
                    "Seat",
                    "Harga",
                    "Gambar",
                    "Status",
                  ]}
                  tableData={mobil}
                />
              </div>
            </Form>
          </Formik>
        ),
      },
    ];
  return (
    <Layout className="flex" pageTitle="Produk">
      <div className="max-w-full w-full block md:p-10 py-10 px-2">
        <Tabs value="wisata" className="max-w-full">
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
