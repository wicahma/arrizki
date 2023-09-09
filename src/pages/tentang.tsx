import Layout from "../components/Layout";
import TextHeader from "@/components/TextHeader/main";

const Tentang = () => {
  return (
    <Layout pageTitle="Tentang">
      <div className="pt-14 container mx-auto min-h-[80vh ] text-justify px-2 ">
        <TextHeader className="mt-10" title="Profil Arrizki Tour" />
        <div className="indent-5 lg:w-[80%] w-full mx-auto">
          <p>
            ARRIZKI Tour adalah perusahaan yang bergerak di bawah naungan CV.
            Arrrizki Danajaya Tour dibidang jasa pelayanan pariwisata yang
            memiliki slogan “live your travel dream” yang sesuai dengan harapan
            kami yaitu, layanan biro pariwisata yang akan mewujudkan perjalanan
            impian Anda.
          </p>
          <p>
            Bersama ARRIZKI TOUR, kemudahan dan kenyamanan liburan Anda menjadi
            yang paling utama. Perjalanan wisata bersama keluarga, sekolah,
            perusahaan, atau dengan pasangan dan rombongan akan lebih berkesan.
            Didukung dengan akomodasi transportasi terbaru dan tim yang
            berpengalaman serta professional, kami siap mengantarkan Anda ke
            berbagai destinasi menarik di Indonesia.
          </p>
          <h2 className="font-medium text-xl text-center">Tentang Kami</h2>
          <ul className="w-full space-y-1 mt-5">
            <li>
              <span className="text-base font-medium">Nama perusahaan :</span> CV. Arrizki Danajaya Tour
            </li>
            <li>
              <span className="text-base font-medium">Brand Usaha :</span> Arrizki Tour
            </li>
            <li>
              <span className="text-base font-medium">Jenis usaha :</span> Biro perjalanan wisata
            </li>
            <li>
              <span className="text-base font-medium">Telepon :</span> 0878-223-66660
            </li>
            <li>
              <span className="text-base font-medium">Email :</span> arrizkitour@gmail.com
            </li>
            <li>
              <span className="text-base font-medium">Lokasi :</span> Jl. Pringgodani GK 178, Demangan, Gondokusuman,
              Yogyakarta, 55221
            </li>
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default Tentang;
