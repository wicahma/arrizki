import Layout from "../components/Layout";
import HomeSection from "../components/HomeSection";
import Image from "next/image";
export default function Home() {
  return (
    <Layout className="pt-10">
      <div className="bg-black">
        <Image
          src="/assets/images/tugu-jogja.jpg"
          alt="tugu-jogja"
          width={1200}
          height={1000}
          style={{ filter: "brightness(0.5)" }}
          className="w-full -z-10 object-cover h-screen"
        />
      </div>
      <div>
        <HomeSection title="Ilham" subtitle="rehan" className="">
          anjasasdasd
        </HomeSection>
      </div>
    </Layout>
  );
}
