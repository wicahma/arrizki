import React, { useEffect } from "react";
import Layout from "@/components/Layout";
import TextHeader from "@/components/TextHeader/main";
import TourList from "@/components/TextHeader/TourList";
import { connect, useDispatch, useSelector } from "react-redux";
import { wrapper } from "@/store/store";
import axios from "axios";
import { setOutbondState } from "@/store/produkSlice";
import { useRouter } from "next/router";
import { reduxState } from "@/interfaces/reduxInterface";
import OutbondCard from "@/components/micros/cards/OutbondCard";

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, res, ...etc }) => {
      const { dispatch, getState } = store;
      await axios
        .get(`${process.env.API_URL}/api/v1/outbond`)
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

const index = (props: any) => {
  const outbond = useSelector((state: reduxState) => state.produk.tableOutbond),
    rupiah = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }),
    { pathname } = useRouter();

  return (
    <Layout pageTitle="Paket Outbond">
      <div className="pt-14 container mx-auto">
        <TourList pathname={pathname} />
        <TextHeader
          className="mt-10"
          title="Pilih Paket Outbond terbaik anda"
        />
        <div className="grid grid-cols-12 gap-4 w-full p-5">
          {outbond
            .filter((data: any) => data.status === "aktif")
            .map((wisataData: any, i: number) => (
              <OutbondCard
                key={i}
                image={wisataData.image}
                minimumPrice={wisataData.hargaMinimum}
                title={wisataData.namaTempat}
                keterangan={wisataData.keterangan}
                rupiah={rupiah}
                id={wisataData._id}
              />
            ))}
        </div>
      </div>
    </Layout>
  );
};

export default connect((state) => state)(index);
