import Layout from "@/components/Layout";
import TourList from "@/components/TextHeader/TourList";
import TextHeader from "@/components/TextHeader/main";
import WisataCard from "@/components/micros/cards/WisataCard";
import { setWisataState } from "@/store/produkSlice";
import { wrapper } from "@/store/store";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import { connect, useSelector } from "react-redux";

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
      <div className="pt-14 h-[40vh] relative z-10 bg-white">
        <TourList pathname={pathname} />
        <TextHeader
          className="mt-10 text-white"
          title="Pilih Paket Wisata terbaik anda"
        />
        <Image
          src={"/assets/images/candi.jpg"}
          alt="wisata"
          width={1000}
          height={1000}
          className="absolute top-0 w-full h-full -z-10 object-cover left-0"
        />
      </div>
      <div className="container mx-auto">
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
