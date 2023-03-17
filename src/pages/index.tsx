import Layout from "../components/Layout";
import HomeSection from "../components/HomeSection";
import Image from "next/image";
import MiniCard from "../components/HomeSection/MiniCard";
import ReasonCards from "../components/HomeSection/ReasonCards";
import { Button } from "@material-tailwind/react";
import FAQ from "../components/FAQ";

export default function Home() {
  return (
    <Layout className="pt-10" pageTitle="Home">
      <div className="-z-10 h-screen w-full">
        <Image
          src="/assets/images/tugu-jogja.jpg"
          alt="tugu-jogja"
          width={1200}
          height={1000}
          style={{ filter: "brightness(0.5)" }}
          className="w-full fixed -z-10 object-cover h-screen"
        />
      </div>
      <div className="rounded-t-[60px] before:rounded-t-[60px] rounded-br-[200px] relative before:absolute before:inset-0 before:bg-gray-900 before:-z-10 bg-white p-10 space-y-10">
        <div className="bg-red-500 rounded-full aspect-square h-16 top-0 right-1/2 -translate-y-1/2 translate-x-1/2 absolute">
          <Image
            src={"assets/icons/arrow-down.svg"}
            className="absolute right-1/2 translate-x-1/2 top-1/2 -translate-y-1/2"
            width={22}
            height={22}
            alt="arrow-down"
          />
        </div>
        <HomeSection
          title="Temukan Liburan Terbaik Kamu"
          subtitle="Arrizki Tour menyediakan Paket Wisata terbaik dengan falilitas yang lengkap"
          className=""
        >
          <div className="w-full h-[400px] border border-red-500 rounded-3xl"></div>
        </HomeSection>
        <HomeSection
          title="Apa yang kami tawarkan?"
          subtitle="Temukan tawaran tawaran terbaik yang disediakan oleh Arrizki Tour"
          className=""
        >
          <div className="flex flex-row flex-wrap gap-3 columns-4 justify-center">
            <MiniCard teks="Reservasi dan penjualan tiketing" />
            <MiniCard teks="Reservasi dan penjualan voucher Hotel" />
            <MiniCard teks="Penyewaan / Reservasi Kendaraan" />
            <MiniCard teks="Paket tour domestik" />
            <MiniCard teks="Paket MICE (Meeting, Incentive, Convention, Exhibition)" />
            <MiniCard teks="Paket Outbond" />
            <MiniCard teks="Paket Wisata Edukasi (Study Tour)" />
            <MiniCard teks="Paket Family Gathering" />
          </div>
        </HomeSection>
        <HomeSection
          title="Mengapa memilih Arrizki Tour?"
          subtitle="Alasan kenapa Arrizki Tour dapat menjadi jasa Tour terbaik untuk kalian"
          className=""
        >
          <div className="w-full overflow-visible flex justify-center">
            <ReasonCards
              image=""
              title="Legalitas Resmi"
              subtitle="Untuk memenuhi kebutuhan liburan Anda kami menghadirkan berbagai pilihan paket sesuai kebutuhan liburan Anda. Mulai dari paket wisata untuk family, group maupun honeymoon dengan durasi dan destinasi yang bervariatif maupun custom trip sesuai keinginan Anda."
            />
          </div>
        </HomeSection>
        <HomeSection
          title="FAQ"
          subtitle="Pertanyaan pertanyaan yang sering ditanyakan oleh para pelanggan Arrizki Tour."
          className=""
        >
          <div className="w-full overflow-visible flex justify-center">
            <FAQ question={"Meeting pointnya dimana?"}>
              <h3 className="font-semibold text-lg mb-3">Di Jogja, bisa antar jemput di:</h3>
              <ol className="list-decimal">
                <li>Hotel (untuk dihotel gunungkidul dan kulonprogo dikenakan charge)</li>
                <li>Stasiun Yogyakarta/Lempuyangan</li>
                <li>Bandara Adi Sutjipto</li>
                <li>Bandara YIA (dikenakan charger penjemputan/pengantaran)</li>
              </ol>
            </FAQ>
          </div>
        </HomeSection>
      </div>
      <div className="bg-gray-900 overflow-hidden relative">
        <div className="grid grid-cols-6 px-20 container md:h-[330px] h-max md:m-0 my-10 mx-auto text-white">
          <div className="md:col-span-2 col-span-6 z-10 flex flex-col justify-center">
            <h1 className="text-4xl font-semibold mb-3">
              Mulai perjalananmu bersama kami
            </h1>
            <Button
              color="red"
              className="normal-case max-w-max font-normal text-sm py-2 text-white"
            >
              Cari wisata
            </Button>
          </div>
          <div className="md:col-span-4 col-span-6">
            <div className="flex flex-col h-full max-w-max ml-auto">
              <div className="flex-grow md:flex hidden items-center z-10 self-center justify-center">
                <p className="font-extralight italic text-white/50">
                  Jangan lewatkan momen momen indah bersama Arrizki Tour
                </p>
              </div>
              <div className="flex md:relative absolute bottom-0 opacity-25 right-1/2 translate-x-1/2 shrink gap-3 justify-center mx-auto">
                <Image
                  src={"/assets/images/ocean.png"}
                  alt="ocean"
                  className="rounded-t-[30px]"
                  height={200}
                  width={200}
                />
                <Image
                  src={"/assets/images/java.png"}
                  alt="ocean"
                  className="rounded-t-[30px]"
                  height={200}
                  width={200}
                />
                <Image
                  src={"/assets/images/telaga.png"}
                  alt="ocean"
                  className="rounded-t-[30px]"
                  height={200}
                  width={200}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
