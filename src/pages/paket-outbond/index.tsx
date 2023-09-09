import Layout from "@/components/Layout";
import TourList from "@/components/TextHeader/TourList";
import TextHeader from "@/components/TextHeader/main";
import OutbondCard from "@/components/micros/cards/OutbondCard";
import { reduxState } from "@/interfaces/reduxInterface";
import { setOutbondState } from "@/store/produkSlice";
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

const index = (props: any) => {
  const outbond = useSelector((state: reduxState) => state.produk.tableOutbond),
    rupiah = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    });

  return (
    <Layout pageTitle="Paket Outbond">
      <div className="pt-14 h-[40vh] relative z-10 bg-white">
        <TextHeader
          className="mt-10 text-white"
          title="Pilih Paket Outbond terbaik anda"
        />
        <Image
          src={"/assets/images/pohon.jpg"}
          alt="wisata"
          width={1000}
          height={1000}
          className="absolute top-0 w-full h-full -z-10 object-cover left-0"
        />
      </div>
      <div className="pt-10 container mx-auto">
        <div className="text-lg indent-10 mb-5 text-justify leading-7 px-5">
          <p>
            Kegiatan Outbond sering menjadi pilihan bagi instansi sebagai bagian
            dari capacity building sebuah instansi. Dengan mengikuti outbound
            output yang diharapkan adalah makin kompaknya antar rekan kerja.
            Selain itu, kegiatan ini juga dapat menjadi sarana refreshing serta
            memberikan ruang bagi karyawan untuk melakukan introspeksi diri.
          </p>
          <p>
            Jogja memang kota dengan fasilitas lengkap yang membuat wisatawan
            merasa nyaman datang ke sana. Selain tempat wisata alam dan budaya.
            Ada banyak tempat yang bisa Anda jadikan sebagai lokasi outbound.
            Berikut ini rekomendasi tempat outbound di Jogja yang seru untuk
            Anda kunjungi bersama rombongan:
          </p>
        </div>
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
