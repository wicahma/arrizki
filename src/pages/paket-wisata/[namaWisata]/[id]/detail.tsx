import React, { MouseEvent, useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import {
  Checkbox,
  Switch,
  Tooltip,
  Typography,
} from "@material-tailwind/react";
import WisataForm from "@/components/micros/forms/WisataForm";
import MiniCard from "@/components/HomeSection/MiniCard";
import PaketWisataCard from "@/components/micros/cards/PaketWisataCard";
import { wrapper } from "@/store/store";
import axios from "axios";

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, res, ...etc }) => {
      const { dispatch, getState } = store;
      const { params } = etc;
      const id = params?.id;
      console.log(id);
      if (getState().produk.tableMobil.length === 0) {
        await axios
          .get(`${process.env.API_URL}/api/v1/wisata/${id}`)
          .then((datas) => {
            const { data } = datas.data;
            dispatch({ type: "produk/setPaketWisata", payload: data });
          })
          .catch((err) => {
            console.log(err);
          });
      }
      return { props: {} };
    }
);

const DetailWisata = (props: any) => {
  const { query } = useRouter();
  const [formOpener, setForm] = useState<Boolean>(true);
  const [onTop, setOnTop] = useState<Boolean>(false);
  const headerRef = React.useRef<HTMLDivElement>(null);

  console.log(query);

  useEffect(() => {
    window.addEventListener("resize", () => {
      window.innerWidth > 960 && setForm(true);
    });
    console.log(formOpener);
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

  return (
    <Layout>
      <div
        ref={headerRef}
        className="pt-16 container bottom-0 mx-auto text-center bg-white"
      >
        <Typography variant="h4" className="text-4xl mt-8">
          Judul wisata
        </Typography>
        <div className="flex mb-10 mt-3 flex-row flex-wrap gap-3 columns-4 justify-center">
          <MiniCard
            onClick={(e) => console.log(e)}
            className="py-1"
            teks="Wisata 1"
          />
        </div>
      </div>

      <div className="divide-x divide-gray-400 container gap-3 grid grid-cols-6 mx-auto">
        <div className="sm:col-span-4 relative col-span-6 px-2 sm:px-0 space-y-14">
          <div
            className={`sticky border-b py-4 border-gray-300 duration-300 transition-all w-full text-center z-50 bg-white ${
              onTop ? "opacity-100 top-14 h-fit" : "opacity-0 top-0 h-0"
            }`}
          >
            <div className="flex flex-row flex-wrap gap-3 columns-4 justify-center">
              <MiniCard
                onClick={(e) => console.log(e)}
                className="py-1"
                teks="Wisata 1"
              />
            </div>
          </div>
          {[1, 1, 1, 1, 1, 1].map((item, i) => {
            return <PaketWisataCard />;
          })}
        </div>

        <div
          className={`fixed right-0 overflow-y-auto lg:px-5 shadow-2xl lg:rounded-none lg:shadow-none lg:col-span-2 z-50 duration-500 transition-all lg:w-full lg:max-h-max lg:sticky lg:top-20 ${
            formOpener
              ? "rounded-tl-xl w-[100vw] h-[88vh] rounded-tr-xl bottom-0 bg-white"
              : "h-11 -bottom-full w-[10px] bg-red-500"
          }`}
        >
          <div className={`p-5 lg:p-0 pb-16`}>
            <h3 className="text-2xl mb-3 font-medium">Pesan Sekarang</h3>
            <WisataForm />
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
                label="Pesan sekarang?"
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
