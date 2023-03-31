import React, { MouseEvent, useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { Checkbox, Tooltip, Typography } from "@material-tailwind/react";
import WisataForm from "@/components/micros/forms/WisataForm";
import MiniCard from "@/components/HomeSection/MiniCard";
import PaketWisataCard from "@/components/micros/cards/PaketWisataCard";

const DetailWisata = (props: any) => {
  const { query } = useRouter();
  const [formOpener, setForm] = useState<Boolean>(true);
  console.log(query);

  useEffect(() => {
    console.log(formOpener);
  }, [formOpener]);

  return (
    <Layout>
      <div className="pt-16 container mx-auto text-center">
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
      <div className=" divide-x divide-gray-400 container gap-3 grid grid-cols-6 mx-auto">
        <div className="sm:col-span-4 col-span-6 px-2 sm:px-0 space-y-14">
          {[1, 1, 1, 1, 1, 1].map((item, i) => {
            return <PaketWisataCard />;
          })}
        </div>

        <div
          className={`fixed overflow-y-auto sm:px-5 shadow-2xl sm:rounded-none sm:shadow-none sm:col-span-2 z-50 w-[100vw] right-0 duration-500 transition-all sm:w-full sm:max-h-max sm:sticky sm:top-20 ${
            formOpener
              ? "rounded-tl-xl h-[88vh] rounded-tr-xl bottom-0 bg-white"
              : "h-11 -bottom-full bg-red-500 "
          }`}
        >
          <div className={`p-5 sm:p-0 pb-16`}>
            <h3 className="text-2xl mb-3 font-medium">Pesan Sekarang</h3>
            <WisataForm />
          </div>
          <div
            className={`items-center transition-all duration-500 flex w-full fixed shadow-2xl ${
              !formOpener
                ? "bg-red-500 rounded-tl-2xl rounded-tr-2xl"
                : "bg-white"
            } bottom-0 z-[110] sm:hidden`}
          >
            <Tooltip
              className="absolute bg-white text-black shadow-md"
              animate={{
                mount: { scale: 1, y: 0 },
                unmount: { scale: 0, y: 25 },
              }}
              content={`${!formOpener ? "Buka Form" : "Tutup Form"}`}
            >
              <Checkbox
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
            <div
              className={`grow relative before:absolute before:w-[80%] before:top-1/2 before:-translate-y-1/2 before:h-[2px] bg-red-100 before:rounded-full ${
                !formOpener ? "text-white before:bg-white" : "text-black before:bg-black"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 bg-red-500 aspect-square"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DetailWisata;
