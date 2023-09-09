import Layout from "@/components/Layout/index";
import TextHeader from "@/components/TextHeader/main";

const KetentuanSewaMobil = () => {
  return (
    <Layout pageTitle="Ketentuan Sewa Mobil">
      <div className="pt-14 container mx-auto text-gray-900">
        <TextHeader className="mt-10" title="Ketentuan Sewa" />
        <div className="space-y-5">
          <div>
            <h2 className="font-medium text-xl">Rental Mobil Jogja</h2>
            <p className="indent-5">
              Arizki Tour selain menyediakan paket wisata juga memberikan
              pelayanan sewa mobil dengan armada Terbaik, Terawat, Nyaman dan
              Aman serta memberikan banyak pilihan armada sesuai kebutuhan Anda.
              Arrizki tour menyediakan rental mobil untuk keperluan perjalanan
              dinas, wisuda, pernikahan, dan perjalanan wisata.{" "}
            </p>
          </div>
          <div>
            <h2 className="font-medium text-xl">Ketentuan Sewa Mobil</h2>
            <ul className="list-item list-decimal ml-8">
              <li>
                Harga sewa mobil diatas sudah include : sewa mobil, driver, bbm
                dan air mineral.
              </li>
              <li>
                Harga sewa mobil diatas belum termasuk : HTM tempat wisata,
                biaya parkir, biaya makan driver dan biaya penginapan driver
                apabila menginap di luar kota Jogja.
              </li>
              <li>
                Harga sewa mobil diatas untuk tujuan dalam wilayah DIY termasuk
                Borobudur. Untuk tujuan luar wilayah DIY akan dikenakan tarif
                berbeda, silahkan hubungi kami untuk informasi harga terbaik.
              </li>
              <li>Pemakaian sewa mobil full day maximal pukul 22.00 WIB.</li>
              <li>Biaya overtime adalah 10% / Jam dari harga sewa mobil.</li>
              <li>
                Harga sewa mobil diatas tidak termasuk dalam Periode High
                Season.
              </li>
              <li>
                Melayani penjemputan di Hotel, Penginapan, Stasiun, Terminal dan
                Bandara.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-medium text-xl">
              Mengapa Memilih Arrizkitour Untuk Sewa Mobil?
            </h2>
            <p className="indent-5">
              Arrizki tour mempermudah pemesanan sewa mobil di yogyakarta dengan
              booking secara online dan dapat melakukan pembayaran dengan mudah
              dan aman. Kami menyediakan sewa mobil untuk keperluan perjalanan
              bisnis, liburan, wisuda, atau acara pernikahan. Selain itu kami
              memberikan pelayanan dan kemudahan terhadap Anda, yaitu:
            </p>
            <ul className="list-item list-disc ml-8">
              <li> Banyak pilihan armada sesuai kebutuhan Anda</li>
              <li> Armada Terbaik, Terawat, Nyaman dan Aman</li>
              <li> Driver Berpengalaman, Ramah dan Profesional</li>
              <li> Respon Cepat</li>
              <li> Booking 24 Jam</li>
              <li> Mobil Pengganti</li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default KetentuanSewaMobil;
