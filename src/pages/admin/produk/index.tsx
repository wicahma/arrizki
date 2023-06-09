import Layout from "@/components/Layout";
import MobilForm from "@/components/micros/forms/admin/MobilForm";
import OutbondForm from "@/components/micros/forms/admin/OutbondForm";
import WisataForm from "@/components/micros/forms/admin/WisataForm";
import ProductTable from "@/components/tables/ProductTable";
import { reduxState } from "@/interfaces/reduxInterface";
import { setAlert } from "@/store/mainSlice";
import {
  setMobilState,
  setOutbondState,
  setWisataState,
} from "@/store/produkSlice";
import { wrapper } from "@/store/store";
import {
  Button,
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
} from "@material-tailwind/react";
import axios from "axios";
import { Form, Formik } from "formik";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Produk, {
  createMobil,
  createMobilData,
  createOubondData,
  createWisata,
  createWisataData,
  mobilValidationSchema,
  outbondValidationSchema,
  wisataValidationSchema,
} from "../../../interfaces/produkInterface";

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, res, ...etc }) => {
      const { dispatch, getState } = store;
      await axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/wisata`)
        .then((datas) => {
          const { data } = datas.data;
          dispatch(setWisataState(data));
        })
        .catch((err) => {
          console.log(err);
        });
      await axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/car`)
        .then((datas) => {
          const { data } = datas.data;
          dispatch(setMobilState(data));
        })
        .catch((err) => {
          console.log(err);
        });
      await axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/outbond`)
        .then((datas) => {
          const { data } = datas.data;
          dispatch(setOutbondState(data));
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
      return await axios({
        method: methods,
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/${identifier}${
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
            type: "main/setAlert",
            payload: {
              type: "success",
              message: `${response.data.message}, status ${response.status}`,
              show: true,
            },
          });

          axios
            .get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/${identifier}`)
            .then((datas) => {
              const { data } = datas.data;
              switch (identifier) {
                case "wisata":
                  dispatch({ type: "produk/setWisataState", payload: data });
                  break;
                case "car":
                  dispatch({ type: "produk/setMobilState", payload: data });
                  break;
                case "outbond":
                  dispatch({ type: "produk/setOutbondState", payload: data });
                default:
                  break;
              }
              dispatch({
                type: "main/setLoading",
                payload: false,
              });
            })
            .catch((err) => {
              dispatch({
                type: "main/setLoading",
                payload: false,
              });
              dispatch(
                setAlert({
                  type: "error",
                  message: "Terjadi kesalahan pada server! data gagal diambil!",
                  show: true,
                })
              );
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
    outbond = useSelector((state: reduxState) => state.produk.tableOutbond);

  const [formOpener, setForm] = React.useState<boolean>(true),
    data = [
      {
        label: "Private Wisata",
        value: "private-wisata",
        desc: (
          <Formik
            initialValues={createWisataData}
            validationSchema={wisataValidationSchema}
            validateOnChange
            validateOnMount
            onSubmit={async (values, { setSubmitting }) => {
              dispatch({
                type: "main/setLoading",
                payload: true,
              });
              setSubmitting(true);
              console.log(values);
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
                    "Fasilitas",
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
      {
        label: "Outbond",
        value: "outbond",
        desc: (
          <Formik
            initialValues={createOubondData}
            validationSchema={outbondValidationSchema}
            validateOnChange
            validateOnMount
            onSubmit={async (values, { setSubmitting }) => {
              setSubmitting(true);
              dispatch({
                type: "main/setLoading",
                payload: true,
              });
              setSubmitting(true);
              fetchProduk("outbond", values, values._id);
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
                <OutbondForm />
              </div>
              <div className="w-full overflow-x-auto">
                <ProductTable
                  identifier="outbond"
                  tableTitle={[
                    "ID",
                    "Nama Tempat",
                    "Keterangan",
                    "Harga Minimum",
                    "Status",
                    "Gambar",
                  ]}
                  tableData={outbond}
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
        <Tabs value="private-wisata" className="max-w-full">
          <TabsHeader>
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
