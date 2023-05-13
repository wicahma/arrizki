import Layout from "@/components/Layout";
import TextHeader from "@/components/TextHeader/main";
import TourList from "@/components/TextHeader/TourList";
import { useRouter } from "next/router";

const index = (props: any) => {
  const { pathname } = useRouter();
  return (
    <Layout pageTitle="Custom Tour">
      <div className="pt-14 container mx-auto">
        <TourList pathname={pathname} />
        <TextHeader
          className="mt-10"
          title="Buat Custom Tour sesuai dengan keinginan anda."
        />
        <div className="grid grid-cols-12 gap-4 w-full p-5">Custom tour</div>
      </div>
    </Layout>
  );
};

export default index;
