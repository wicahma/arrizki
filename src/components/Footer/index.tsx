import Image from "next/image";
import Link from "next/link";
import FooterList from "./FooterList";

const index = (props: any) => {
  return (
    <footer  className="bg-white pt-10 z-0">
      <div className="flex flex-col mx-auto container gap-10 divide-y-4 divide-red-400">
        <div className="grid grid-cols-5 gap-4 px-10">
          <div className="md:col-span-2 col-span-5 flex flex-col justify-center">
            <h2 className="text-4xl font-serif font-semibold">Arrizki Tour</h2>
            <p className="text-base font-serif font-medium italic">
              Live your travel dreams.
            </p>
          </div>
          <div className="sm:flex justify-around md:col-span-3 col-span-5">
            <FooterList
              title="Menu"
              list={[
                { title: "Home", url: "/" },
                { title: "Paket Wisata", url: "/paket-tour/private" },
                { title: "Paket Outbond", url: "/paket-outbond" },
                { title: "Sewa Mobil", url: "/sewa-mobil" },
              ]}
            />
            <FooterList
              title="Pelanggan"
              list={[
                { url: "/pelanggan/cara-pesan", title: "Cara Pesan" },
                { url: "/pelanggan/payment", title: "Metode Pembayaran" },
                { url: "/pelanggan/pembatalan", title: "Ketentuan Pembatalan" },
                { url: "/pelanggan/peraturan-tour", title: "Peraturan Tour" },
                { url: "/pelanggan/ketentuan-tour", title: "Ketentuan Tour" },
                {
                  url: "/pelanggan/ketentuan-sewa-mobil",
                  title: "Ketentuan Sewa Mobil",
                },
              ]}
            />
            <FooterList
              title="Perusahaan"
              list={[
                { title: "Tentang Kami", url: "/tentang" },
                { title: "Visi Misi", url: "/visi-misi" },
                { title: "Kontak Kami", url: "/kontak" },
              ]}
            />
          </div>
        </div>
        <div className="flex justify-between py-4">
          <div className="shrink flex items-center">
            <p className="">@2023 CV. Arrizki Tour, Seluruh Hak Cipta</p>
          </div>
          <div className="flex gap-3 justify-end">
            <Link
              href="https://wa.me/6287822366660"
              target="_blank"
              className="bg-red-400 w-10 h-10 relative p-6 rounded-full group"
            >
              <Image
                src="/assets/icons/whatsapp.svg"
                alt="whatsapp-images"
                width={30}
                height={30}
                className="group-hover:rotate-[35deg] group-hover:scale-110 duration-300 transition-all contrast-[300] absolute top-1/2 left-1/2 traxnsform -translate-x-1/2 -translate-y-1/2"
              />
            </Link>
            <Link
              href="https://www.facebook.com/profile.php?id=100054517086879"
              target="_blank"
              className="bg-red-400 group w-10 h-10 relative p-6 rounded-full"
            >
              <Image
                src="/assets/icons/facebook.svg"
                alt="whatsapp-images"
                width={30}
                height={30}
                className="contrast-[300] group-hover:rotate-[35deg] group-hover:scale-110 duration-300 transition-all  absolute top-1/2 left-1/2 traxnsform -translate-x-1/2 -translate-y-1/2"
              />
            </Link>
            <Link
              href="mailto:arrizkitour@gmail.com"
              target="_blank"
              className="bg-red-400 w-10 h-10 relative p-6 rounded-full group"
            >
              <Image
                src="/assets/icons/mail.svg"
                alt="whatsapp-images"
                width={30}
                height={30}
                className="group-hover:rotate-[35deg] group-hover:scale-110 duration-300 transition-all contrast-[300] absolute top-1/2 left-1/2 traxnsform -translate-x-1/2 -translate-y-1/2"
              />
            </Link>
            <Link
              href="https://www.instagram.com/arrizki_tour/"
              target="_blank"
              className="bg-red-400 w-10 h-10 relative p-6 rounded-full group"
            >
              <Image
                src="/assets/icons/instagram.svg"
                alt="whatsapp-images"
                width={30}
                height={30}
                className="group-hover:rotate-[35deg] group-hover:scale-110 duration-300 transition-all contrast-[300] absolute top-1/2 left-1/2 traxnsform -translate-x-1/2 -translate-y-1/2"
              />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default index;
