import React from "react";
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
  reduxState,
  wisataValidationSchema,
} from "./produkInterface";
import { wrapper } from "@/store/store";
import axios from "axios";
import { setMobilState, setWisataState } from "@/store/produkSlice";
import { useSelector } from "react-redux";
import { Form, Formik } from "formik";
import WisataForm from "@/components/micros/forms/admin/WisataForm";
import MobilForm from "@/components/micros/forms/admin/MobilForm";
import Loading from "@/components/micros/loading";

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, res, ...etc }) => {
      const { dispatch, getState } = store;
      if (getState().produk.tableWisata.length === 0) {
        await axios
          .get(`${process.env.API_URL}/api/v1/wisata`)
          .then((datas) => {
            const { data } = datas.data;
            dispatch(setWisataState(data));
          })
          .catch((err) => {
            console.log(err);
          });
      }
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

const fetchProduk = async (
  identifier: String,
  data: createMobil | createWisata
): Promise<any> => {
  let method;
  switch (data.fetchType) {
    case "create":
      method = "POST";
      break;
    case "update":
      method = "PUT";
    default:
      break;
  }
  return await axios({
    method: method,
    url: `${process.env.API_URL}/api/v1/${identifier}/${
      method === "POST" ? "" : data._id
    }`,
    data,
  })
    .then((res) => {
      console.log(res);
      const { data } = res.data;
      return data;
    })
    .catch((err) => {
      console.log(err);
    });
};

const index = (props: Produk) => {
  const wisata = useSelector((state: reduxState) => state.produk.tableWisata),
    mobil = useSelector((state: reduxState) => state.produk.tableMobil),
    [formOpener, setForm] = React.useState<boolean>(true),
    [isLoading, setLoading] = React.useState<boolean>(false),
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

              alert(JSON.stringify(values, null, 2));

              console.log({ values });
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
                    "ID Jenis Paket",
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
              setSubmitting(true);
              setLoading(true);
              await fetchProduk("mobil", values);
              setLoading(false);
              // alert(JSON.stringify(values, null, 2));
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
                  identifier="mobil"
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
      <Loading isActive={isLoading} />
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
