import React from "react";
import Layout from "@/components/Layout";
import UnderConstruction from "@/components/micros/UnderConstruction";

const index = (props: any) => {
  return (
    <Layout className="flex" pageTitle="Transaksi">
      <div className="grow w-full">
        <UnderConstruction />
      </div>
    </Layout>
  );
};

export default index;
