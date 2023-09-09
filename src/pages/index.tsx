import { Button } from "@material-tailwind/react";
import Image from "next/image";
import Link from "next/link";
import loadingStyle from "@/components/micros/loading/loading.module.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import homeStyle from "@/styles/Home.module.css";
import FAQ from "../components/FAQ";
import HomeSection from "../components/HomeSection";
import MiniCard from "../components/HomeSection/MiniCard";
import ReasonCards from "../components/HomeSection/ReasonCards";
import Layout from "../components/Layout";
import axios from "axios";
import { setOutbondState, setWisataState } from "@/store/produkSlice";
import { reduxState } from "@/interfaces/reduxInterface";
import { useDispatch, useSelector } from "react-redux";
import WisataCard from "@/components/micros/cards/WisataCard";
import { useEffect, useMemo } from "react";
import OutbondCard from "@/components/micros/cards/OutbondCard";

export default function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/wisata`)
      .then((datas) => {
        const { data } = datas.data;
        dispatch(setWisataState(data));
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/outbond`)
      .then((datas) => {
        const { data } = datas.data;
        dispatch(setOutbondState(data));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const { tableOutbond: outbond, tableWisata: wisata } = useSelector(
      (state: reduxState) => state.produk
    ),
    penawaran: string[] = [
      "Penyewaan / Reservasi Kendaraan",
      "Paket tour domestik",
      "Paket MICE (Meeting, Incentive, Convention, Exhibition)",
      "Paket Outbond",
      "Paket Wisata Edukasi (Study Tour)",
      "Paket Family Gathering",
    ],
    rupiah = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }),
    responsive = {
      desktop: {
        breakpoint: { max: 3000, min: 0 },
        items: 1,
        slidesToSlide: 1,
      },
    },
    responsiveWisataRekomendasi = {
      desktop: {
        breakpoint: { max: 3000, min: 0 },
        items: 3,
        slidesToSlide: 2,
      },
      tablet: {
        breakpoint: { max: 1024, min: 768 },
        items: 2,
        slidesToSlide: 2,
      },
      mobile: {
        breakpoint: { max: 767, min: 0 },
        items: 1,
        slidesToSlide: 1,
      },
    };

  const wisataTerbaik = useMemo(() => {
    if (wisata.length !== 0) {
      return (
        <div className="grid grid-cols-12 gap-5 relative z-10 container mx-auto">
          {wisata
            .filter((data: any) => data.status === "aktif")
            .map((wisataData: any, i: number) => (
              <WisataCard
                key={i}
                image={wisataData.image}
                price={wisataData.hargaMinimum}
                title={wisataData.namaPaket}
                listWisata={wisataData.tempatWisata}
                rupiah={rupiah}
                id={wisataData._id}
                className="shadow-xl"
              />
            ))}
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
                className="shadow-xl"
              />
            ))}
        </div>
      );
    } else {
      return (
        <div
          className={
            "transition-all duration-200 w-full h-[300px] flex justify-center items-center"
          }
        >
          <div className="bg-white/70 aspect-square w-min rounded-xl p-3">
            <svg className={loadingStyle.svg} viewBox="0 0 50 50">
              <circle
                className={loadingStyle.ring}
                cx="25"
                cy="25"
                r="20"
              ></circle>
              <circle
                className={loadingStyle.ball}
                cx="25"
                cy="5"
                r="4.5"
              ></circle>
            </svg>
          </div>
        </div>
      );
    }
  }, [wisata, outbond]);

  return (
    <Layout className="pt-10" pageTitle="Home">
      <div className="-z-10 h-[90vh] flex justify-center items-center w-full">
        <div className="text-white w-full text-start z-10 pl-10 pt-32 p-2">
          <h1 className="text-5xl mb-2 font-semibold">
            Temukan tempat tempat indah di Jogja bersama kami.
          </h1>
          <p className="text-xl font-light">
            Layanan biro pariwisata yang akan mewujudkan perjalanan impian Anda.
          </p>
          <div className="flex gap-5 justify-start mt-10">
            <Link href={"/tentang"}>
              <Button color="red">Tentang Kami</Button>
            </Link>
            <Link href={"/paket-tour/private"}>
              <Button color="red">Cari Wisata</Button>
            </Link>
          </div>
        </div>
        <div className="w-full fixed -z-10 object-cover h-screen bg-black">
          <Image
            src="/assets/images/bg-home.jpg"
            alt="tugu-jogja"
            width={1200}
            height={1000}
            className="w-full fixed top-[3rem] -z-10 object-cover opacity-70 h-screen"
          />
        </div>
      </div>
      <div
        className={`rounded-t-[60px] before:rounded-t-[60px] rounded-br-[12vw] relative before:absolute before:inset-0 before:bg-gray-900 before:-z-10 bg-white pb-10 space-y-16`}
      >
        <div className="bg-red-500 z-[2] rounded-full aspect-square h-16 top-0 right-1/2 -translate-y-1/2 translate-x-1/2 absolute">
          <Image
            src={"assets/icons/arrow-down.svg"}
            className="absolute right-1/2 translate-x-1/2 top-1/2 -translate-y-1/2"
            width={22}
            height={22}
            alt="arrow-down"
          />
        </div>
        <HomeSection
          title="Apa yang kami tawarkan?"
          subtitle="Temukan tawaran tawaran terbaik yang disediakan oleh Arrizki Tour"
          className="pt-16 pb-20 px-5 relative overflow-hidden rounded-t-[60px] bg-white"
        >
          {wisataTerbaik}
          <Image
            src="/assets/images/alam.jpg"
            alt="tugu-jogja"
            width={1200}
            height={1000}
            className="w-full z-[1] absolute top-0 left-0 h-full object-cover opacity-25"
          />
        </HomeSection>
        <HomeSection
          container
          title="Mengapa memilih Arrizki Tour?"
          subtitle="Alasan kenapa Arrizki Tour dapat menjadi jasa Tour terbaik untuk kalian"
          className="px-5"
        >
          <div className="w-full">
            <ReasonCards
              side={true}
              image={
                <svg
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 384 512"
                >
                  <path d="M48 0C21.5 0 0 21.5 0 48V464c0 26.5 21.5 48 48 48h96V432c0-26.5 21.5-48 48-48s48 21.5 48 48v80h96c26.5 0 48-21.5 48-48V48c0-26.5-21.5-48-48-48H48zM64 240c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V240zm112-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H176c-8.8 0-16-7.2-16-16V240c0-8.8 7.2-16 16-16zm80 16c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H272c-8.8 0-16-7.2-16-16V240zM80 96h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16zm80 16c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H176c-8.8 0-16-7.2-16-16V112zM272 96h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H272c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16z" />
                </svg>
              }
              title="Legalitas Resmi"
              subtitle="Berada di bawah naungan CV.ARRIZKI DANAJAYA TOUR, Arrizki Tour sudah memiliki izin resmi untuk mendirikan usaha sehingga Anda bisa melakukan perjalanan wisata dengan lebih percaya tanpa khawatir terkena tipu."
            />

            <ReasonCards
              side={false}
              image={
                <svg
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 576 512"
                >
                  <path d="M346.3 271.8l-60.1-21.9L214 448H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H544c17.7 0 32-14.3 32-32s-14.3-32-32-32H282.1l64.1-176.2zm121.1-.2l-3.3 9.1 67.7 24.6c18.1 6.6 38-4.2 39.6-23.4c6.5-78.5-23.9-155.5-80.8-208.5c2 8 3.2 16.3 3.4 24.8l.2 6c1.8 57-7.3 113.8-26.8 167.4zM462 99.1c-1.1-34.4-22.5-64.8-54.4-77.4c-.9-.4-1.9-.7-2.8-1.1c-33-11.7-69.8-2.4-93.1 23.8l-4 4.5C272.4 88.3 245 134.2 226.8 184l-3.3 9.1L434 269.7l3.3-9.1c18.1-49.8 26.6-102.5 24.9-155.5l-.2-6zM107.2 112.9c-11.1 15.7-2.8 36.8 15.3 43.4l71 25.8 3.3-9.1c19.5-53.6 49.1-103 87.1-145.5l4-4.5c6.2-6.9 13.1-13 20.5-18.2c-79.6 2.5-154.7 42.2-201.2 108z" />
                </svg>
              }
              title="Paket Wisata Bervariasi"
              subtitle="Untuk memenuhi kebutuhan liburan Anda kami menghadirkan berbagai pilihan paket sesuai kebutuhan liburan Anda. Mulai dari paket wisata untuk family, group maupun honeymoon dengan durasi dan destinasi yang bervariatif maupun custom trip sesuai keinginan Anda."
            />

            <ReasonCards
              side={true}
              image={
                <svg
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 576 512"
                >
                  <path d="M0 112.5V422.3c0 18 10.1 35 27 41.3c87 32.5 174 10.3 261-11.9c79.8-20.3 159.6-40.7 239.3-18.9c23 6.3 48.7-9.5 48.7-33.4V89.7c0-18-10.1-35-27-41.3C462 15.9 375 38.1 288 60.3C208.2 80.6 128.4 100.9 48.7 79.1C25.6 72.8 0 88.6 0 112.5zM288 352c-44.2 0-80-43-80-96s35.8-96 80-96s80 43 80 96s-35.8 96-80 96zM64 352c35.3 0 64 28.7 64 64H64V352zm64-208c0 35.3-28.7 64-64 64V144h64zM512 304v64H448c0-35.3 28.7-64 64-64zM448 96h64v64c-35.3 0-64-28.7-64-64z" />
                </svg>
              }
              title="Harga Murah dan Terbaik"
              subtitle="Kami memberikan harga yang murah dan terjangkau. Sehingga anda akan lebih hemat dalam kegiatan wisata. Kami juga memberikan harga sesuai dengan budget custom trip sesuai keinginan Anda."
            />

            <ReasonCards
              side={false}
              image={
                <svg
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 384 512"
                >
                  <path d="M173.8 5.5c11-7.3 25.4-7.3 36.4 0L228 17.2c6 3.9 13 5.8 20.1 5.4l21.3-1.3c13.2-.8 25.6 6.4 31.5 18.2l9.6 19.1c3.2 6.4 8.4 11.5 14.7 14.7L344.5 83c11.8 5.9 19 18.3 18.2 31.5l-1.3 21.3c-.4 7.1 1.5 14.2 5.4 20.1l11.8 17.8c7.3 11 7.3 25.4 0 36.4L366.8 228c-3.9 6-5.8 13-5.4 20.1l1.3 21.3c.8 13.2-6.4 25.6-18.2 31.5l-19.1 9.6c-6.4 3.2-11.5 8.4-14.7 14.7L301 344.5c-5.9 11.8-18.3 19-31.5 18.2l-21.3-1.3c-7.1-.4-14.2 1.5-20.1 5.4l-17.8 11.8c-11 7.3-25.4 7.3-36.4 0L156 366.8c-6-3.9-13-5.8-20.1-5.4l-21.3 1.3c-13.2 .8-25.6-6.4-31.5-18.2l-9.6-19.1c-3.2-6.4-8.4-11.5-14.7-14.7L39.5 301c-11.8-5.9-19-18.3-18.2-31.5l1.3-21.3c.4-7.1-1.5-14.2-5.4-20.1L5.5 210.2c-7.3-11-7.3-25.4 0-36.4L17.2 156c3.9-6 5.8-13 5.4-20.1l-1.3-21.3c-.8-13.2 6.4-25.6 18.2-31.5l19.1-9.6C65 70.2 70.2 65 73.4 58.6L83 39.5c5.9-11.8 18.3-19 31.5-18.2l21.3 1.3c7.1 .4 14.2-1.5 20.1-5.4L173.8 5.5zM272 192a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM1.3 441.8L44.4 339.3c.2 .1 .3 .2 .4 .4l9.6 19.1c11.7 23.2 36 37.3 62 35.8l21.3-1.3c.2 0 .5 0 .7 .2l17.8 11.8c5.1 3.3 10.5 5.9 16.1 7.7l-37.6 89.3c-2.3 5.5-7.4 9.2-13.3 9.7s-11.6-2.2-14.8-7.2L74.4 455.5l-56.1 8.3c-5.7 .8-11.4-1.5-15-6s-4.3-10.7-2.1-16zm248 60.4L211.7 413c5.6-1.8 11-4.3 16.1-7.7l17.8-11.8c.2-.1 .4-.2 .7-.2l21.3 1.3c26 1.5 50.3-12.6 62-35.8l9.6-19.1c.1-.2 .2-.3 .4-.4l43.2 102.5c2.2 5.3 1.4 11.4-2.1 16s-9.3 6.9-15 6l-56.1-8.3-32.2 49.2c-3.2 5-8.9 7.7-14.8 7.2s-11-4.3-13.3-9.7z" />
                </svg>
              }
              title="Layanan Terbaik"
              subtitle="Perjalanan Anda semakin berkesan dengan berbagai layanan terbaik mulai dari rumah makan dengan menu yang enak, Armada Terbaik, Terawat, Nyaman dan Aman hingga driver yang Berpengalaman, Ramah dan Profesional."
            />

            <ReasonCards
              side={true}
              image={
                <svg
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 384 512"
                >
                  <path d="M64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V64c0-35.3-28.7-64-64-64H64zm96 320h64c44.2 0 80 35.8 80 80c0 8.8-7.2 16-16 16H96c-8.8 0-16-7.2-16-16c0-44.2 35.8-80 80-80zm-32-96a64 64 0 1 1 128 0 64 64 0 1 1 -128 0zM144 64h96c8.8 0 16 7.2 16 16s-7.2 16-16 16H144c-8.8 0-16-7.2-16-16s7.2-16 16-16z" />
                </svg>
              }
              title="Berpengalaman"
              subtitle="Berpengalaman dari 2017 dalam melayani paket wisata seperti, paket wisata instansi, perusahaan, serta rombongan, maupun costum trip."
            />

            <ReasonCards
              side={false}
              image={
                <svg
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 640 512"
                >
                  <path d="M323.4 85.2l-96.8 78.4c-16.1 13-19.2 36.4-7 53.1c12.9 17.8 38 21.3 55.3 7.8l99.3-77.2c7-5.4 17-4.2 22.5 2.8s4.2 17-2.8 22.5l-20.9 16.2L550.2 352H592c26.5 0 48-21.5 48-48V176c0-26.5-21.5-48-48-48H516h-4-.7l-3.9-2.5L434.8 79c-15.3-9.8-33.2-15-51.4-15c-21.8 0-43 7.5-60 21.2zm22.8 124.4l-51.7 40.2C263 274.4 217.3 268 193.7 235.6c-22.2-30.5-16.6-73.1 12.7-96.8l83.2-67.3c-11.6-4.9-24.1-7.4-36.8-7.4C234 64 215.7 69.6 200 80l-72 48H48c-26.5 0-48 21.5-48 48V304c0 26.5 21.5 48 48 48H156.2l91.4 83.4c19.6 17.9 49.9 16.5 67.8-3.1c5.5-6.1 9.2-13.2 11.1-20.6l17 15.6c19.5 17.9 49.9 16.6 67.8-2.9c4.5-4.9 7.8-10.6 9.9-16.5c19.4 13 45.8 10.3 62.1-7.5c17.9-19.5 16.6-49.9-2.9-67.8l-134.2-123z" />
                </svg>
              }
              title="Terpercaya"
              subtitle="Sudah dipercaya melayani berbagai instansi, perusahaan, serta rombongan yang ingin liburan."
            />
          </div>
        </HomeSection>
        <HomeSection
          container
          title="FAQ"
          subtitle="Pertanyaan pertanyaan yang sering ditanyakan oleh para pelanggan Arrizki Tour."
          className="px-5"
        >
          <div className="w-full overflow-visible flex flex-col space-y-5 divide-y-2 divide-gray-400 justify-center">
            <FAQ question={"Meeting pointnya dimana?"}>
              <h3 className="font-normal text-lg mb-3">
                Di Jogja, bisa antar jemput di:
              </h3>
              <ol className="list-decimal text-lg ml-10">
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
              <ol className="list-decimal text-lg ml-10">
                <li>
                  Internet Banking/Tranfer Bank A.N Wiga Nugraheni
                  <ul className="list-disc ml-10">
                    <li>BRI 0987-0102-2402-539</li>
                    <li>BSI 301-1022-50</li>
                  </ul>
                </li>
              </ol>
            </FAQ>
          </div>
        </HomeSection>
      </div>
      <div className="bg-gray-900 overflow-hidden relative">
        <div className="px-20 container md:h-[150px] gap-5 flex items-center h-max mx-auto md:my-0 my-10 text-white">
          <p className="text-3xl font-normal">
            Perlu{" "}
            <span className="bg-white text-gray-900 font-semibold rounded-lg px-2">
              Konsultasi
            </span>{" "}
            atau ingin{" "}
            <span className="bg-white text-gray-900 font-semibold rounded-lg px-2">
              Custom Paket Tour
            </span>{" "}
            ? Klik disini
          </p>
          <Link
            href={"/paket-tour/custom"}
            className="border-2 hover:border-red-400 transition-color duration-200 border-gray-900 bg-red-400 hover:bg-gray-900 text-gray-900 hover:text-red-400 px-3 py-1 rounded-full text-xl"
          >
            Custom Paket
          </Link>
          {/* <div className="md:col-span-2 col-span-6 z-10 flex flex-col justify-center">
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
          </div> */}
        </div>
      </div>
    </Layout>
  );
}
