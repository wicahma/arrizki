import Layout from "@/components/Layout/index";
import TextHeader from "@/components/TextHeader/main";

const PeraturanTour = () => {
  return (
    <Layout pageTitle="Peraturan Tour">
      <div className="pt-14 container mx-auto">
        <TextHeader className="mt-10" title="Peraturan Tour" />
        <div className="space-y-5 mx-auto lg:w-[80%] w-full min-h-[60vh] px-2">
          <ul className="list-item list-disc ml-5">
            <li>
              Peserta tidak di perbolehkan membawa barang yang di anggap
              melanggar hokum, seperti senjata tajam, senjata api, miras atau
              narkoba.
            </li>
            <li>
              Peserta tidak diperkenankan menggunakan fasilitas tour seperti
              mobil untuk kegiatan yang melanggar hukum.
            </li>
            <li>
              Peserta tidak di perkenankan mengambil property kelengkapan yang
              tersedia dalam mobil.
            </li>
            <li>
              Peserta tidak diperbolehkan mengambil benda cagar budaya, tanaman
              serta hewan yang di lindungi selama tour berlangsung.
            </li>
            <li>
              Semua syarat dan ketentuan yang telah kami buat bersifat mengikat.
            </li>
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default PeraturanTour;
