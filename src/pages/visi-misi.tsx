import Layout from "../components/Layout";
import TextHeader from "@/components/TextHeader/main";

const VisiMisi = () => {
  return (
    <Layout pageTitle="Visi Misi">
      <div className="pt-14 container mx-auto h-[80vh] px-2">
        <TextHeader className="mt-10" title="Visi Misi Arrizki Tour" />
        <div className="space-y-5 text-center">
          <div>
            <h2 className="font-medium text-xl">VISI</h2>
            <p className="indent-5">
              Menjadi penyedia jasa dengan kualitas layanan terbaik agar
              terwujudnya impian perjalanan anda.
            </p>
          </div>
          <div>
            <h2 className="font-medium text-xl">MISI</h2>
            <ul className="list-item list-decimal text-start lg:w-[60%] w-full mx-auto ml-4 ">
              <li>
                Menyediakan paket perjalanan yang inovatif, kreatif dan
                fleksibel sesuai dengan kebutuhan konsumen.
              </li>
              <li>
                Memberikan pelayanan jasa di bidang pariwisata yang berkualitas.
              </li>
              <li>
                Mengedepankan kepuasan, kenyamanan, dan keamanan konsumen.
              </li>
              <li>
                Mewujudkan impian perjalanan Anda yang berkualitas dan menjadi
                lebih berkesan.
              </li>
              <li>
                Menjalin hubungan kerjasama dalam bidang pariwisata dan konsemen
                secara jangka pendek, menengah dan panjang.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default VisiMisi;
