import Layout from "@/components/Layout";
import TextHeader from "@/components/TextHeader/main";
import TourList from "@/components/TextHeader/TourList";
import { Button } from "@material-tailwind/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

const index = (props: any) => {
  const { pathname } = useRouter();
  return (
    <Layout pageTitle="Group Tour">
      <div className="pt-14 container mx-auto">
        <TourList pathname={pathname} />
        <TextHeader
          className="mt-10"
          title="Paket Group Tour dengan harga terbaik."
        />
        <div className="text-center text-lg px-4">
          <p>
            Paket Tour Group ditujukan untuk memfasilitasi keluarga besar,
            komunitas, instansi atau perusahaan pada waktu tertentu untuk
            melakukan kegiatan wisata, study tour, outing class, kunjungan
            industri maupun study banding ke suatu daerah yang telah disepakati
            bersama. Harga yang kami tawarkan sifatnya fleksibel tergantung
            keinginan atau kebutuhan serta fasilitas yang dikehendaki.
          </p>
          <div className="max-w-[600px] w-full mx-auto my-10">
            <h3 className="mb-5 text-2xl font-semibold">
              Apa fasilitas yang nantinya akan anda dapatkan?
            </h3>
            <ul className="list-decimal text-start list-outside space-y-2 ml-5">
              <li>
                Bus Pariwisata seat 30, 50, dan 60 dengan posisi seat 2-2 / 2-3
                (Fasilitas : AC, Rcl. Seat, Audio Video, karaoke, TV, Bantal,
                Selimut){" "}
              </li>
              <li>Konsumsi</li>
              <li>Air mineral 600 ml selama perjalanan</li>
              <li>Driver tip & Crew</li>
              <li>Tour Leader</li>
              <li>Guide Lokal</li>
              <li>Parkir & Tol </li>
              <li>HTM Objek Wisata </li>
              <li>P3k </li>
              <li>Banner</li>
              <li>Dokumentasi</li>
              <li>Vandel kunjungan</li>
              <li>Free gift </li>
              <li>Pengurusan Kunjungan</li>
            </ul>
          </div>
          <p>
            Tertarik dengan penawaran paket yang kami berikan?, ingin berbicara
            lebih jauh atau sekedar bertanya tanya?
          </p>
          <p>
            kalian bisa akses kontak Whatsapp kami di bawah ini, atau pada
            bagian di pojok kanan atas ya.
          </p>
          <Link
            href="https://wa.me/6287822366660"
            target="_blank"
            className="inline-block"
          >
            <Button
              color="green"
              size="sm"
              className="w-fit mx-auto mt-3 flex px-3 py-1 gap-3 font-normal normal-case items-center"
            >
              <Image
                src="/assets/icons/whatsapp.svg"
                alt="whatsapp-images"
                width={30}
                height={30}
              />
              <p className="break-keep text-sm">Whatsapp</p>
            </Button>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default index;
