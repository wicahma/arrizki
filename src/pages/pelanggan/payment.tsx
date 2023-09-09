import Layout from "@/components/Layout/index";
import TextHeader from "@/components/TextHeader/main";

const Payment = () => {
  return (
    <Layout pageTitle="Payment">
      <div className="pt-14 container mx-auto">
        <TextHeader className="mt-10" title="Panduan pembayaran" />
        <div className="space-y-5 mx-auto lg:w-[80%] min-h-[60vh] w-full px-2 text-lg">
          <ol className="list-item list-decimal ml-7">
            <li>
              Menyiapkan uang muka (Down Payment) sebesar 35% dari total biaya
              untuk setiap reservasi atau pemesanan.
            </li>
            <li>
              Melakukan transfer ke Internet Banking/Tranfer Bank A.N Wiga
              Nugraheni:
              <ul className="list-disc ml-10">
                <li>BRI 0987-0102-2402-539</li>
                <li>BSI 301-1022-50</li>
              </ul>
            </li>
            <li>
              Melakukan konfirmasi pembayaran melalui Whatsapp atau email dengan
              menyertakan bukti transfer, nomor telepon / nama pemesan / alamat
              email yang ditulis pada saat pemesanan (direkomendasikan untuk
              memasukkan ke-3 data agar lebih memudahkan admin dalam mengecek
              bukti transfer).
            </li>
            <li>
              Tungggu hingga admin merespon, apabila email invoice dari admin
              telah terbit, maka pembayaran anda sudah kami terima, dan
              reservasi anda telah aktif.
            </li>
          </ol>
        </div>
      </div>
    </Layout>
  );
};

export default Payment;
