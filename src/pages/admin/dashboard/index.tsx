import Layout from "@/components/Layout";
import UnderConstruction from "@/components/micros/UnderConstruction";

const index = (props: any) => {
  return (
    <Layout className="flex" pageTitle="Admin Dashboard">
      <div className="grow w-full p-10">
        <UnderConstruction />
      </div>
    </Layout>
  );
};

export default index;
