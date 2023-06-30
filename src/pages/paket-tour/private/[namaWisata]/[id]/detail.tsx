import MiniCard from "@/components/HomeSection/MiniCard";
import Layout from "@/components/Layout";
import PaketWisataCard from "@/components/micros/cards/PaketWisataCard";
import WisataForm from "@/components/micros/forms/WisataForm";
import {
  WisataFormProps,
  wisataValidator,
} from "@/interfaces/pesananInterface";
import { createWisata } from "@/interfaces/produkInterface";
import { setPaketWisata } from "@/store/produkSlice";
import { wrapper } from "@/store/store";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Switch,
  Tooltip,
  Typography,
} from "@material-tailwind/react";
import axios from "axios";
import { Formik } from "formik";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//NOTE - Get data from server redux
export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, res, ...etc }) => {
      const { dispatch, getState } = store;
      const { params } = etc;
      const id = params?.id;
      await axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/wisata/${id}`)
        .then((datas) => {
          const { data } = datas.data;
          dispatch(setPaketWisata(data));
        })
        .catch((err) => {
          console.log(err);
        });
      return { props: {} };
    }
);

interface wisata extends createWisata {
  namaPaket: string;
}

//NOTE - Main page Function
const DetailWisata = (props: any) => {
  const [open, setOpen] = useState(0),
    handleOpen = (value: number) => {
      setOpen(open === value ? 0 : value);
    },
    dispatch = useDispatch(),
    [formOpener, setForm] = useState<Boolean>(true),
    [onTop, setOnTop] = useState<Boolean>(false),
    [wisataFormData, setWisataFormData] = useState<WisataFormProps>(),
    [handleOpenDialog, setHandleOpenDialog] = useState<boolean>(false),
    headerRef = React.useRef<HTMLDivElement>(null),
    paketWisata: wisata = useSelector((state: any) => state.produk.paketWisata),
    selectedJumlahPeserta = useSelector(
      (state: any) => state.produk.selectedJumlahPeserta
    ),
    rupiah = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }),
    initialValues: WisataFormProps = {
      nama: undefined,
      email: undefined,
      nomorTelepon: undefined,
      paketID: undefined,
      jumlahPeserta: selectedJumlahPeserta,
      tanggalReservasi: undefined,
      waktuJemput: undefined,
      lokasiJemput: undefined,
      pesananTambahan: "",
      type: "user",
    },
    router = useRouter();

  useEffect(() => {
    window.addEventListener("resize", () => {
      window.innerWidth > 960 && setForm(true);
    });
  }, [formOpener]);

  useEffect(() => {
    const onScroll = () => {
      if (headerRef.current) {
        const headerRect = headerRef.current.getBoundingClientRect();
        headerRect.top < -400 ? setOnTop(true) : setOnTop(false);
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [headerRef]);

  const handleCreateReservasi = (values: WisataFormProps | undefined): void => {
    dispatch({
      type: "main/setLoading",
      payload: true,
    });
    setHandleOpenDialog(false);
    axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/res-wisata`, values)
      .then((_) => {
        dispatch({
          type: "main/setAlert",
          payload: {
            show: true,
            message: "Berhasil membuat reservasi, Silahkan cek email anda!",
            type: "success",
          },
        });
      })
      .catch((_) => {
        dispatch({
          type: "main/setAlert",
          payload: {
            show: true,
            message: "Gagal membuat reservasi!",
            type: "error",
          },
        });
      })
      .finally(() => {
        dispatch({
          type: "main/setLoading",
          payload: false,
        });
      });
  };

  return (
    <Layout>
      <div
        ref={headerRef}
        className="pt-16 container bottom-0 mx-auto text-center bg-white"
      >
        <Typography variant="h4" className="text-4xl mt-8">
          {paketWisata.namaPaket}
        </Typography>
        <div className="flex mb-10 mt-3 flex-row flex-wrap gap-3 columns-4 justify-center">
          {paketWisata &&
            paketWisata.jenisPaket &&
            paketWisata.jenisPaket.map((item, i: number) => (
              <div key={i} className="snap-center">
                <MiniCard
                  onClick={(e) => router.push(`#wisata-${i + 1}`)}
                  className="py-1"
                  teks={`Paket Wisata ${i + 1}`}
                />
              </div>
            ))}
        </div>
      </div>

      <div className="divide-x divide-gray-400 container gap-3 grid grid-cols-6 mx-auto">
        <div className="md:col-span-4 relative col-span-6 px-2 md:px-0">
          <div
            className={`sticky border-b py-4 border-gray-300 duration-300 overflow-x-auto transition-all w-full text-center z-50 bg-white ${
              onTop ? "opacity-100 top-14 h-fit" : "opacity-0 top-0 h-0"
            }`}
          >
            <div className="flex flex-row flex-nowrap overflow-y-auto gap-3 min-w-max columns-4 justify-center">
              {paketWisata &&
                paketWisata.jenisPaket &&
                paketWisata.jenisPaket.map((item, i: number) => (
                  <MiniCard
                    key={i}
                    onClick={(e) => router.push(`#wisata-${i + 1}`)}
                    className="py-1"
                    teks={`Paket Wisata ${i + 1}`}
                  />
                ))}
            </div>
          </div>
          {/* //NOTE - Header Section */}
          <div>
            {/* //SECTION - Ketentuan Private Tour */}
            <Accordion open={open === 1}>
              <AccordionHeader onClick={() => handleOpen(1)}>
                Ketentuan Private Tour
              </AccordionHeader>
              <AccordionBody>
                <div>
                  <ul className="list-disc ml-8 list-outside text-base text-blue-gray-800">
                    <li>
                      Paket Wisata yang kami tawarkan adalah bersifat{" "}
                      <b className="font-semibold">private tour </b>
                      (tidak digabungkan dengan peserta lain).
                    </li>
                    <li>
                      Harga paket wisata berlaku untuk orang Indonesia, untuk
                      wisata manca negara bisa menghubungi kami agar diberikan
                      harga terbaik.
                    </li>
                    <li>
                      Harga paket wisata sewaktu waktu bisa berubah, berkaitan
                      perubahan HTM, Kenaikan BBM dan yang berhubungan dengan
                      pariwisata.
                    </li>
                    <li>
                      Trip start pukul 08.00 WIB, dengan durasi sekitar 10-12
                      jam. Untuk trip sunrise start pukul 04.00 WIB.
                    </li>
                    <li>
                      Untuk high season akan dikenakan charge sebesar 10% dari
                      harga normal (libur sekolah, long weekend, libur umum).
                    </li>
                    <li>
                      Untuk peak season akan dikenakan charge sebesar 30% dari
                      harga normal (libur idul fitri, natal dan tahun baru).
                    </li>
                    <li>
                      Itinerary (jadwal perjalanan) dapat berubah sewaktu waktu
                      untuk menyesuaikan situasi dan kondisi yang ada.
                    </li>
                    <li>
                      Armada yang kami sediakan mulai dari City Car, Avanza,
                      Innova Reborn, ELF Short, ELF Long, Hiace Commuter, Hiace
                      Premio, Medium Bus, dan Big Bus.
                    </li>
                    <li>
                      Request/custom paket wisata dapat disesuai dengan rencana
                      wisata Anda atau budget yang sesuai.
                    </li>
                    <li>
                      Anak kecil dibawah 2 tahun Free, lebih dari 2 tahun sudah
                      membayar sesuai harga paket wisata
                    </li>
                    <li>
                      Apabila peserta tour memiliki penyakit, disarankan membawa
                      obat pribadi.
                    </li>
                    <li>
                      Dalam satu rombongan tour harus ada yang berperan sebagai
                      koordinator.
                    </li>
                  </ul>
                </div>
              </AccordionBody>
            </Accordion>
            {/* //SECTION - Fasilitas Selama Tour*/}
            <Accordion open={open === 2}>
              <AccordionHeader onClick={() => handleOpen(2)}>
                Fasilitas Selama Tour
              </AccordionHeader>
              <AccordionBody>
                <div className="text-blue-gray-800">
                  <h3 className="text-lg font-medium">Include</h3>
                  <ul className="list-disc ml-8 list-outside text-base">
                    <li>Private tour</li>
                    <li>Antar Jemput area DIY</li>
                    <li>Transport AC Dingin dan Nyaman</li>
                    <li>Driver as Guide Super Seru</li>
                    <li>Makan/Snack Sesuai Program Paket</li>
                    <li>Tiket Masuk Wisata / Retribusi</li>
                    <li>Biaya parkir</li>
                    <li>Air Mineral 600 ml</li>
                    <li>P3K Ringan</li>
                    <li>Souvenir </li>
                    <li>Banner Wisata {`( >20 Pax)`}</li>
                    <li>Dokumentasi foto {`( >20 Pax)`}</li>
                    <li>Guide {`( >20 Pax)`}</li>
                  </ul>
                  <h3 className="text-lg font-medium">Exclude</h3>
                  <ul className="list-disc ml-8 list-outside text-base">
                    <li> Tiket Transport dari Kota Asal ke Jogja PP</li>
                    <li> Biaya Pengeluaran Pribadi</li>
                    <li> Biaya Tambahan Periode High Season</li>
                    <li> Akomodasi Hotel/Penginapan</li>
                    <li> Spot foto berbayar</li>
                  </ul>
                </div>
              </AccordionBody>
            </Accordion>
            {/* //SECTION - Pemesanan layanan */}
            <Accordion open={open === 3}>
              <AccordionHeader onClick={() => handleOpen(3)}>
                Pemesanan Layanan
              </AccordionHeader>
              <AccordionBody>
                <ul className="list-disc ml-8 list-outside text-base">
                  <li>
                    Pemesanan dapat dilakukan melalui form pemesanan yang
                    terdapat pada halaman website resmi kami atau melalui
                    Whatsapp.
                  </li>
                  <li>
                    Ketika melakukan pemesanan, pastikan semua data yang Anda
                    isi form pemesanan benar dan akurat.
                  </li>
                  <li>
                    Kesalahan dalam memberikan data dapat menyebabkan gagalnya
                    rencana perjalanan tour, dan kami tidak bertanggung jawab
                    setelah setelah kami mengirimkan Confirmasi latter kepada
                    anda.
                  </li>
                </ul>
              </AccordionBody>
            </Accordion>
            {/* //SECTION - Metode Pembayaran */}
            <Accordion open={open === 4}>
              <AccordionHeader onClick={() => handleOpen(4)}>
                Metode Pembayaran
              </AccordionHeader>
              <AccordionBody>
                <ul className="list-disc ml-8 list-outside text-base">
                  <li>
                    Uang muka (Down Payment) sebesar 35% dari total biaya untuk
                    setiap reservasi atau pemesanan.
                  </li>
                  <li>
                    Pembayaran uang muka dilakukan melalui transfer Bank,
                    Internet Banking, Mobile Banking ke rekening BRI :
                    0987-0102-2402-539 atau BSI : 301-1022-50 A.N Wiga Nugraheni{" "}
                  </li>
                  <li>
                    Setelah melakukan pembayaran uang muka, silahkan melakukan
                    konfirmasi via chat WhatsApp/Telepon/Email dengan
                    menyertakan data booking serta bukti transfer.
                  </li>
                  <li>
                    Pelunasan biaya tour bisa dilunasi pada saat waktu
                    pelaksanaan.
                  </li>
                  <li>
                    Pemesanan yang dilakukan pada masa tiga hari sebelum tanggal
                    pelaksanaan akan dikenakan biaya penuh tanpa proses
                    pembayaran uang muka.
                  </li>
                  <li>
                    Pihak Arrizki Tour akan memberikan bukti pembayaran berupa
                    invoice pada setiap tahap pembayaran yang sudah di lakukan.
                  </li>
                </ul>
              </AccordionBody>
            </Accordion>
            {/* //SECTION - Ketentuan pembatalan */}
            <Accordion open={open === 5}>
              <AccordionHeader onClick={() => handleOpen(5)}>
                Ketentuan Pembatalan
              </AccordionHeader>
              <AccordionBody>
                <ul className="list-disc ml-8 list-outside text-base">
                  <li>
                    Pembatalan pemesanan paket tour yang dilakukan 7 (tujuh)
                    hari sebelum tanggal pelaksanaan tour akan di kenakan
                    censelation fee sebesar 25% dari total biaya paket tour.
                  </li>
                  <li>
                    Pembatalan pemesanan paket tour yang dilakukan 3 (tiga) hari
                    sebelum tanggal pelaksanaan akan di kenakan censelation fee
                    sebesar 50% dari total biaya paket tour.
                  </li>
                  <li>
                    Semua perubahan atau pembatalan peserta tanpa adanya
                    informasi tertulis via Email/WhatsApp/Telepon dianggap tidak
                    berlaku.
                  </li>
                </ul>
              </AccordionBody>
            </Accordion>
            {/* //SECTION - Peraturan tour */}
            <Accordion open={open === 6}>
              <AccordionHeader onClick={() => handleOpen(6)}>
                Peraturan Tour
              </AccordionHeader>
              <AccordionBody>
                <ul className="list-disc ml-8 list-outside text-base">
                  <li>
                    Peserta tidak di perbolehkan membawa barang yang di anggap
                    melanggar hokum, seperti senjata tajam, senjata api, miras
                    atau narkoba.
                  </li>
                  <li>
                    Peserta tidak diperkenankan menggunakan fasilitas tour
                    seperti mobil untuk kegiatan yang melanggar hukum.
                  </li>
                  <li>
                    Peserta tidak di perkenankan mengambil property kelengkapan
                    yang tersedia dalam mobil.
                  </li>
                  <li>
                    Peserta tidak diperbolehkan mengambil benda cagar budaya,
                    tanaman serta hewan yang di lindungi selama tour
                    berlangsung.
                  </li>
                </ul>
              </AccordionBody>
            </Accordion>
            {/* //SECTION - Lain lain */}
            <Accordion open={open === 7}>
              <AccordionHeader onClick={() => handleOpen(7)}>
                Lain lain
              </AccordionHeader>
              <AccordionBody>
                <ul className="list-disc ml-8 list-outside text-base">
                  <li>
                    Semua syarat dan ketentuan yang telah kami buat bersifat
                    mengikat.
                  </li>
                  <li>
                    Peserta yang sudah melakukan reservasi kami anggap sudah
                    membaca serta menyetujui semua syarat serta ketentuan ini.
                  </li>
                </ul>
              </AccordionBody>
            </Accordion>
          </div>
          {/* //NOTE - Paket Section */}
          <div className="space-y-14 mt-14">
            {paketWisata &&
              paketWisata.jenisPaket &&
              paketWisata.jenisPaket.map((item, i: number) => {
                return (
                  <div key={i} className="pb-7 ">
                    <PaketWisataCard paketData={item} index={i + 1} />
                  </div>
                );
              })}
          </div>
        </div>
        {/* //NOTE - Form Section */}
        <div
          className={`fixed right-0 overflow-y-auto lg:px-5 shadow-2xl lg:rounded-none lg:shadow-none lg:col-span-2 z-50 duration-500 transition-all lg:w-full lg:max-h-max lg:sticky lg:top-20 ${
            formOpener
              ? "rounded-tl-xl w-[100vw] h-[88vh] rounded-tr-xl bottom-0 bg-white"
              : "h-11 -bottom-full w-[10px] bg-red-500"
          }`}
        >
          <div className={`p-5 lg:p-0 pb-16`}>
            <h3 className="text-2xl mb-3 font-medium">Pesan Sekarang</h3>
            <Formik
              initialValues={initialValues}
              validationSchema={wisataValidator}
              validateOnChange
              validateOnMount
              onSubmit={async (values, { setSubmitting }) => {
                setHandleOpenDialog(true);
                setWisataFormData(values);
                setSubmitting(true);
                return false;
              }}
            >
              {paketWisata && paketWisata.jenisPaket && (
                <WisataForm jenisPaket={paketWisata.jenisPaket} />
              )}
            </Formik>
            <Dialog
              size="xl"
              open={handleOpenDialog}
              handler={() => setHandleOpenDialog(!handleOpenDialog)}
            >
              <DialogHeader>Ayo cek lagi pesanan kamu 😊</DialogHeader>
              <DialogBody divider>
                {paketWisata && paketWisata.jenisPaket && wisataFormData && (
                  <div className="font-light text-lg text-black/60">
                    <p>
                      Atas nama{" "}
                      <span className="underline font-medium text-black/70">
                        {wisataFormData.nama}
                      </span>
                      , dengan email{" "}
                      <span className="underline font-medium text-black/70">
                        {wisataFormData.email}
                      </span>{" "}
                      & nomor Telepon{" "}
                      <span className="underline font-medium text-black/70">
                        {wisataFormData.nomorTelepon}
                      </span>{" "}
                      akan memesan{" "}
                      <span className="underline font-medium text-black/70">
                        Paket Wisata{" "}
                        {paketWisata.jenisPaket.findIndex(
                          (item) => item._id === wisataFormData.paketID
                        ) + 1}
                      </span>{" "}
                      dengan jumlah peserta{" "}
                      <span className="underline font-medium text-black/70">
                        {wisataFormData.jumlahPeserta} orang.
                      </span>
                    </p>
                    <p>
                      Pesanan akan dilakukan pada tanggal{" "}
                      <span className="underline font-medium text-black/70">
                        {wisataFormData.tanggalReservasi?.toString()}
                      </span>{" "}
                      dan jam{" "}
                      <span className="underline font-medium text-black/70">
                        {wisataFormData.waktuJemput}
                      </span>{" "}
                      dengan total harga{" "}
                      <span className="underline font-medium text-black/70">
                        {rupiah.format(
                          paketWisata.jenisPaket
                            .filter(
                              (item) => item._id === wisataFormData.paketID
                            )[0]
                            .pax.filter(
                              (item) =>
                                item.jumlah ===
                                Number(wisataFormData.jumlahPeserta)
                            )[0].harga
                        )}
                      </span>
                    </p>
                  </div>
                )}
                <p className="mt-5">Apakah data diatas ini sudah benar?</p>
              </DialogBody>
              <DialogFooter>
                <Button
                  variant="text"
                  color="red"
                  onClick={() => setHandleOpenDialog(!handleOpenDialog)}
                  className="mr-1"
                >
                  <span>Batal</span>
                </Button>
                <Button
                  variant="gradient"
                  color="green"
                  onClick={() => handleCreateReservasi(wisataFormData)}
                >
                  <span>Selesaikan Pesanan</span>
                </Button>
              </DialogFooter>
            </Dialog>
          </div>
          <div
            className={`items-center px-4 py-2 flex justify-end transition-all right-5 duration-500 fixed shadow-2xl ${
              !formOpener
                ? "bg-red-500 rounded-tl-2xl rounded-tr-2xl w-[215px]"
                : "bg-white w-full"
            } bottom-0 z-[110] lg:hidden`}
          >
            <Tooltip
              className="absolute bg-white text-black shadow-md"
              animate={{
                mount: { scale: 1, y: 0 },
                unmount: { scale: 0, y: 25 },
              }}
              content={`${!formOpener ? "Buka Form" : "Tutup Form"}`}
            >
              <Switch
                labelProps={{
                  className: `${!formOpener ? "text-white" : "text-black"}`,
                }}
                defaultChecked={true}
                className=""
                color="red"
                label={`${!formOpener ? "Pesan sekarang?" : "Tutup Form"}`}
                onClick={(e: any) => setForm(e.target.checked)}
              />
            </Tooltip>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DetailWisata;
