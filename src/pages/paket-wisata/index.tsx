import React from "react";
import Layout from "@/components/Layout";
import TextHeader from "@/components/TextHeader";
import WisataCard from "@/components/micros/cards/WisataCard";

const index = (props: any) => {
  const rupiah = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  });
  return (
    <Layout pageTitle="Paket Wisata">
      <div className="pt-14 container mx-auto">
        <TextHeader className="mt-10" title="Pilih paket Wisata terbaik anda" />
        <div className="grid grid-cols-12 gap-4 w-full p-5">
          <WisataCard
            image="/assets/images/development/OBELIX HILLS 2.png"
            price={20000}
            title="Paket Jogja 1D1N"
            listWisata={["Ndepok", "Sleman City hall", "Bantul", "Gumuk Pasir"]}
            rupiah={rupiah}
          />
          <WisataCard
            image="/assets/images/development/OBELIX HILLS 2.png"
            price={20000}
            title="Paket Jogja 1D1N"
            listWisata={["Ndepok", "Sleman City hall", "Bantul", "Gumuk Pasir"]}
            rupiah={rupiah}
          />
          <WisataCard
            image="/assets/images/development/OBELIX HILLS 2.png"
            price={20000}
            title="Paket Jogja 1D1N"
            listWisata={["Ndepok", "Sleman City hall", "Bantul", "Gumuk Pasir"]}
            rupiah={rupiah}
          />
          <WisataCard
            image="/assets/images/development/OBELIX HILLS 2.png"
            price={20000}
            title="Paket Jogja 1D1N"
            listWisata={["Ndepok", "Sleman City hall", "Bantul", "Gumuk Pasir"]}
            rupiah={rupiah}
          />
          <WisataCard
            image="/assets/images/development/OBELIX HILLS 2.png"
            price={20000}
            title="Paket Jogja 1D1N"
            listWisata={["Ndepok", "Sleman City hall", "Bantul", "Gumuk Pasir"]}
            rupiah={rupiah}
          />
          <WisataCard
            image="/assets/images/development/OBELIX HILLS 2.png"
            price={20000}
            title="Paket Jogja 1D1N"
            listWisata={["Ndepok", "Sleman City hall", "Bantul", "Gumuk Pasir"]}
            rupiah={rupiah}
          />
        </div>
      </div>
    </Layout>
  );
};

export default index;
