import Layout from "@/components/Layout/index";
import TextHeader from "@/components/TextHeader/main";

const KetentuanTour = () => {
  return (
    <Layout pageTitle="Ketentuan Tour">
      <div className="pt-14 container mx-auto">
        <TextHeader className="mt-10" title="Ketentuan tour" />
        <div className="space-y-5 mx-auto lg:w-[80%] w-full">
          <div>
            <h2 className="text-xl font-medium">Ketentuan Umum</h2>
            <ul className="list-item list-disc ml-7">
              <li>
                Paket Wisata yang kami tawarkan adalah bersifat private tour
                (tidak digabungkan dengan peserta lain).
              </li>
              <li>
                Harga paket wisata berlaku untuk orang Indonesia, untuk wisata
                manca negara bisa menghubungi kami agar diberikan harga terbaik.
              </li>
              <li>
                Harga paket wisata sewaktu waktu bisa berubah, berkaitan
                perubahan HTM, Kenaikan BBM dan yang berhubungan dengan
                pariwisata.
              </li>
              <li>
                Trip start pukul 08.00 WIB, dengan durasi sekitar 10-12 jam.
                Untuk trip sunrise start pukul 04.00 WIB.
              </li>
              <li>
                Untuk high season akan dikenakan charge sebesar 10% dari harga
                normal (libur sekolah, long weekend, libur umum).
              </li>
              <li>
                Untuk peak season akan dikenakan charge sebesar 30% dari harga
                normal (libur idul fitri, natal dan tahun baru).
              </li>
              <li>
                Itinerary (jadwal perjalanan) dapat berubah sewaktu waktu untuk
                menyesuaikan situasi dan kondisi yang ada.
              </li>
              <li>
                Armada yang kami sediakan mulai dari City Car, Avanza, Innova
                Reborn, ELF Short, ELF Long, Hiace Commuter, Hiace Premio,
                Medium Bus, dan Big Bus.
              </li>
              <li>
                Request/custom paket wisata dapat disesuai dengan rencana wisata
                Anda atau budget yang sesuai.
              </li>
              <li>
                Anak kecil dibawah 2 tahun Free, lebih dari 2 tahun sudah
                membayar sesuai harga paket wisata
              </li>
              <li>
                Apabila peserta tour memiliki penyakit, disarankan membawa obat
                pribadi.
              </li>
              <li>
                Dalam satu rombongan tour harus ada yang berperan sebagai
                koordinator.
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-medium">Fasilitas Selama Tour</h2>
            <h2 className="text-base font-medium">Include</h2>
            <ul className="list-item list-disc ml-7">
              <li>Private tour</li>
              <li>Antar Jemput area DIY</li>
              <li>Transport AC Dingin dan Nyaman</li>
              <li>Driver as Guide Super Seru</li>
              <li>Makan/Snack Sesuai Program Paket</li>
              <li>Tiket Masuk Wisata / Retribusi</li>
              <li>Biaya parkir</li>
              <li>Air Mineral 600 ml</li>
              <li>P3K Ringan</li>
              <li>Souvenir</li>
              <li>Banner Wisata {`( >20 Pax)`}</li>
              <li>Dokumentasi foto {`( >20 Pax)`}</li>
              <li>Guide {`( >20 Pax)`}</li>
            </ul>
            <h2 className="text-base font-medium">Exclude</h2>
            <ul className="list-item list-disc ml-7">
              <li>Tiket Transport dari Kota Asal ke Jogja PP</li>
              <li>Biaya Pengeluaran Pribadi</li>
              <li>Biaya Tambahan Periode High Season</li>
              <li>Akomodasi Hotel/Penginapan</li>
              <li>Spot foto berbayar</li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default KetentuanTour;
