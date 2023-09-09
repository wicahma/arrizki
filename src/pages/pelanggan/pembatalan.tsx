import Layout from "@/components/Layout/index";
import TextHeader from "@/components/TextHeader/main";

const PembatalanTour = () => {
  return (
    <Layout pageTitle="Peraturan Tour">
      <div className="pt-14 container mx-auto">
        <TextHeader className="mt-10" title="Tentang Pembatalan" />
        <div className="space-y-5 mx-auto lg:w-[80%] w-full min-h-[60vh] px-2">
          <ul className="list-item list-disc ml-5">
            <li>
              Pembatalan pemesanan paket tour yang dilakukan 7 (tujuh) hari
              sebelum tanggal pelaksanaan tour akan di kenakan censelation fee
              sebesar 25% dari total biaya paket tour.
            </li>
            <li>
              Pembatalan pemesanan paket tour yang dilakukan 3 (tiga) hari
              sebelum tanggal pelaksanaan akan di kenakan censelation fee
              sebesar 50% dari total biaya paket tour.
            </li>
            <li>
              Semua perubahan atau pembatalan peserta tanpa adanya informasi
              tertulis via Email/WhatsApp/Telepon dianggap tidak berlaku.
            </li>
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default PembatalanTour;
