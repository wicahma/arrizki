import React from "react";
import Layout from "@/components/Layout";
import ProductTable from "@/components/tables/ProductTable";
import {
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
} from "@material-tailwind/react";
import Produk from "./produkInterface";
import { wrapper } from "@/store/store";
import axios from "axios";
import { setWisataState } from "@/store/produkSlice";
import { useSelector } from "react-redux";

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, res, ...etc }) => {
      const { dispatch, getState } = store;
      if (getState().produk.tableWisata.length === 0) {
        await axios
          .get(`${process.env.API_POINT}/wisata`)
          .then((datas) => {
            const { data } = datas.data;
            dispatch(setWisataState(data));
          })
          .catch((err) => {
            console.log(err);
          });
      }
      return { props: {} };
    }
);

const index = (props: Produk) => {
  const wisata = useSelector((state: any) => state.produk.tableWisata);

  const { tableMobil, tableWisata } = props;
  const data = [
    {
      label: "Wisata",
      value: "wisata",
      desc: (
        <ProductTable
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
      ),
    },
    // {
    //   label: "Mobil",
    //   value: "mobil",
    //   desc: (
    //     <ProductTable
    //       tableTitle={["ID", "Nama Mobil", "Seat", "Harga"]}
    //       tableData={tableMobil}
    //     />
    //   ),
    // },
  ];
  return (
    <Layout className="flex" pageTitle="Produk">
      <div className="grow w-full p-10">
        <Tabs value="wisata">
          <TabsHeader>
            {data.map(({ label, value }) => (
              <Tab key={value} value={value}>
                {label}
              </Tab>
            ))}
          </TabsHeader>
          <TabsBody>
            {data.map(({ value, desc }) => (
              <TabPanel key={value} value={value}>
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
