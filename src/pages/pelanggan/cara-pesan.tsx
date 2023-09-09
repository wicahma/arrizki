import Layout from "@/components/Layout/index";
import TextHeader from "@/components/TextHeader/main";

const CaraPesan = () => {
  return (
    <Layout pageTitle="Cara Pesan">
      <div className="pt-14 container mx-auto">
        <TextHeader className="mt-10" title="Panduan pemesanan" />
        <div className="space-y-5 mx-auto lg:w-[80%] min-h-[60vh] w-full">
          <ul className="list-item list-disc">
            <li>
              Pemesanan dapat dilakukan melalui form pemesanan yang terdapat
              pada halaman website resmi kami atau melalui Whatsapp.
            </li>
            <li>
              Ketika melakukan pemesanan, pastikan semua data yang Anda isi form
              pemesanan benar dan akurat.
            </li>
            <li>
              Kesalahan dalam memberikan data dapat menyebabkan gagalnya rencana
              perjalanan tour, dan kami tidak bertanggung jawab setelah setelah
              kami mengirimkan Confirmasi latter kepada anda.
            </li>
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default CaraPesan;
