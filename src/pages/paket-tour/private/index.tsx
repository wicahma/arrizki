import React, { useEffect } from "react";
import Layout from "@/components/Layout";
import TextHeader from "@/components/TextHeader/main";
import TourList from "@/components/TextHeader/TourList";
import WisataCard from "@/components/micros/cards/WisataCard";
import { connect, useDispatch, useSelector } from "react-redux";
import { wrapper } from "@/store/store";
import axios from "axios";
import { setWisataState } from "@/store/produkSlice";
import { useRouter } from "next/router";

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
      return { props: {} };
    }
);

const index = (props: any) => {
  const wisata = useSelector((state: any) => state.produk.tableWisata),
    rupiah = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }),
    { pathname } = useRouter();

  return (
    <Layout pageTitle="Paket Wisata">
      <div className="pt-14 container mx-auto">
        <TourList pathname={pathname} />
        <TextHeader className="mt-10" title="Pilih Paket Wisata terbaik anda" />
        <div className="grid grid-cols-12 gap-4 w-full p-5">
          {wisata
            .filter((data: any) => data.status === "aktif")
            .map((wisataData: any, i: number) => (
              <WisataCard
                key={i}
                image={wisataData.image}
                price={wisataData.hargaMinimum}
                title={wisataData.namaPaket}
                listWisata={wisataData.tempatWisata}
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
