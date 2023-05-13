import Layout from "../components/Layout";
import HomeSection from "../components/HomeSection";
import Image from "next/image";
import MiniCard from "../components/HomeSection/MiniCard";
import ReasonCards from "../components/HomeSection/ReasonCards";
import { Button } from "@material-tailwind/react";
import FAQ from "../components/FAQ";
import Link from "next/link";

export default function Home() {
  const penawaran: string[] = [
    "Reservasi dan penjualan tiketing",
    "Reservasi dan penjualan voucher Hotel",
    "Penyewaan / Reservasi Kendaraan",
    "Paket tour domestik",
    "Paket MICE (Meeting, Incentive, Convention, Exhibition)",
    "Paket Outbond",
    "Paket Wisata Edukasi (Study Tour)",
    "Paket Family Gathering",
  ];

  return (
    <Layout className="pt-10" pageTitle="Home">
      <div className="-z-10 h-[90vh] flex justify-center items-center w-full">
        <div className="text-white text-center p-2">
          <h1 className="text-5xl mb-2 font-semibold">
            Temukan tempat tempat indah di Jogja bersama kami.
          </h1>
          <p className="text-xl font-light">
            Layanan biro pariwisata yang akan mewujudkan perjalanan impian Anda.
          </p>
          <div className="flex gap-5 justify-center mt-10">
            <Link href={""}>
              <Button color="red">Tentang Kami</Button>
            </Link>
            <Link href={"/paket-tour/private"}>
              <Button color="red">Cari Wisata</Button>
            </Link>
          </div>
        </div>
        <Image
          src="/assets/images/tugu-jogja.jpg"
          alt="tugu-jogja"
          width={1200}
          height={1000}
          style={{ filter: "brightness(0.5)" }}
          className="w-full fixed -z-10 object-cover h-screen"
        />
      </div>
      <div className="rounded-t-[60px] before:rounded-t-[60px] rounded-br-[12vw] relative before:absolute before:inset-0 before:bg-gray-900 before:-z-10 bg-white p-10 space-y-10">
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
            {penawaran.map((item, i) => {
              return <MiniCard teks={item} className="py-2" key={i} />;
            })}
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
          <div className="w-full overflow-visible flex flex-col justify-center">
            <FAQ question={"Meeting pointnya dimana?"}>
              <h3 className="font-normal text-lg mb-3">
                Di Jogja, bisa antar jemput di:
              </h3>
              <ol className="list-decimal ml-10">
                <li>
                  Hotel (untuk dihotel gunungkidul dan kulonprogo dikenakan
                  charge)
                </li>
                <li>Stasiun Yogyakarta/Lempuyangan</li>
                <li>Bandara Adi Sutjipto</li>
                <li>Bandara YIA (dikenakan charger penjemputan/pengantaran)</li>
              </ol>
            </FAQ>
            <FAQ question={"Paket tournya digabung sama penumpang lain tidak?"}>
              <p className="font-normal text-lg mb-3">
                Tidak. Paket Wisata yang kami tawarkan adalah bersifat private
                tour.
              </p>
            </FAQ>
            <FAQ question={"Bisa minta tolong driver untuk ngambilin foto?"}>
              <p className="font-normal text-lg mb-3">
                Bisa, nanti bisa minta tolong ke driver kita ya. Kalau mau make
                jasa fotografer professional, kita juga ada.
              </p>
            </FAQ>
            <FAQ question={"Trip start jam berapa?"}>
              <p className="font-normal text-lg mb-3">
                Menyesuaikan dengan intenary, biasanya start jam 07.30 atau jam
                8 pagi dengan durasi 12 jam.
              </p>
            </FAQ>
            <FAQ
              question={"Bagaimana Cara Pembayaran Pemesanan di Arrizki Tour?"}
            >
              <p className="font-normal text-lg mb-3">
                Arrizki Tour menyediakan berbagai macam cara pembayaran, yaitu:
              </p>
              <ol className="list-decimal ml-10">
                <li>
                  Internet Banking/Tranfer Bank A.N Wiga Nugraheni
                  <ul className="list-disc ml-10">
                    <li>BRI 0987-0102-2402-539</li>
                    <li>BSI 301-1022-50</li>
                  </ul>
                </li>
                <li>
                  Shopee Pay{" "}
                  <span className="font-semibold">A.N Arrizki_tour09</span>
                </li>
              </ol>
            </FAQ>
          </div>
        </HomeSection>
      </div>
      <div className="bg-gray-900 overflow-hidden relative">
        <div className="grid grid-cols-6 px-20 container md:h-[330px] h-max mx-auto md:my-0 my-10 text-white">
          <div className="md:col-span-2 col-span-6 z-10 flex flex-col justify-center">
            <h1 className="text-4xl font-semibold mb-3">
              Mulai perjalananmu bersama kami
            </h1>
            <Link href={"/paket-tour/private"}>
              <Button
                color="red"
                className="normal-case max-w-max font-normal text-sm py-2 text-white"
              >
                Cari wisata
              </Button>
            </Link>
          </div>
          <div className="md:col-span-4 col-span-6">
            <div className="flex flex-col h-full max-w-max ml-auto">
              <div className="flex-grow md:flex hidden items-center z-10 self-center justify-center">
                <p className="font-extralight italic text-white/50">
                  Jangan lewatkan momen momen indah bersama Arrizki Tour
                </p>
              </div>
              <div className="flex md:relative absolute bottom-0 opacity-25 md:opacity-100 right-1/2 translate-x-1/2 shrink gap-3 justify-center mx-auto">
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
