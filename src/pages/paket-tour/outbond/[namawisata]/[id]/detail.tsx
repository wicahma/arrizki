import { jenisPaketOutbond } from "@/interfaces/produkInterface";
import Layout from "@/components/Layout";
import { reduxState } from "@/interfaces/reduxInterface";
import { setPaketOutbond } from "@/store/produkSlice";
import { wrapper } from "@/store/store";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MiniCard from "@/components/HomeSection/MiniCard";
import { Typography } from "@material-tailwind/react";

//NOTE - Get data from server redux
export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, res, ...etc }) => {
      const { dispatch, getState } = store;
      const { params } = etc;
      const id = params?.id;
      console.log(id);
      await axios
        .get(`${process.env.API_URL}/api/v1/outbond/${id}`)
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

const DetailOutbond = () => {
  const { query } = useRouter(),
    dispatch = useDispatch(),
    [formOpener, setForm] = useState<Boolean>(true),
    [onTop, setOnTop] = useState<Boolean>(false),
    [wisataFormData, setWisataFormData] = useState<any>(),
    [handleOpenDialog, setHandleOpenDialog] = useState<boolean>(false),
    [isLoading, setIsLoading] = useState<boolean>(false),
    headerRef = React.useRef<HTMLDivElement>(null),
    paketOutbond: jenisPaketOutbond | any = useSelector(
      (state: reduxState) => state.produk.paketOutbond
    ),
    // selectedJumlahPeserta = useSelector(
    //   (state: any) => state.produk.selectedJumlahPeserta
    // ),
    rupiah = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }),
    router = useRouter();
  return (
    <Layout>
      <div
        ref={headerRef}
        className="pt-16 container bottom-0 mx-auto text-center bg-white"
      >
        <Typography variant="h4" className="text-4xl mt-8">
          {paketOutbond.namaTempat}
        </Typography>
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
    </Layout>
  );
};

export default DetailOutbond;
