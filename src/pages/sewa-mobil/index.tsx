import React from "react";
import Layout from "@/components/Layout";
import TextHeader from "@/components/TextHeader";
import MobilCard from "@/components/micros/cards/MobilCard";
import "@/styles/Sewa.module.css";

const index = (props: any) => {
  return (
    <Layout pageTitle="Sewa Mobil">
      <div className="pt-14 container mx-auto">
        <TextHeader
          className="mt-10"
          title="Pilih Mobil untuk anda sewa."
          subtitle="Arrizki Tour menyediakan layanan sewa mobil untuk para wisatawan atau kalian yang sedang membuutuhkan mobil untuk akomodasi dll."
        />
        <div className="flex flex-col md:w-[700px] w-full sm:mx-auto px-5">
          <MobilCard
            facility={[
              "makan",
              "Minum",
              "Sholat",
              "Puasa",
              "Sedekah jariah dunia akhirat",
            ]}
            id="123j12h3jk1h"
            image=""
            price={20000}
            title="Toyota Avanza"
          />
        </div>
      </div>
    </Layout>
  );
};

export default index;
