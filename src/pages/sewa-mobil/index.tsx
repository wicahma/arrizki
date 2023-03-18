import React from "react";
import Layout from "@/components/Layout";
import TextHeader from "@/components/TextHeader";
const index = (props: any) => {
  return (
    <Layout pageTitle="Sewa Mobil">
      <div className="pt-14 container mx-auto">
        <TextHeader
          className="mt-10"
          title="Pilih Mobil untuk anda sewa."
          subtitle="Arrizki Tour menyediakan layanan sewa mobil untuk para wisatawan atau kalian yang sedang membuutuhkan mobil untuk akomodasi dll."
        />
      </div>
    </Layout>
  );
};

export default index;
