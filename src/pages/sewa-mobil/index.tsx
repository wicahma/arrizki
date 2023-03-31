import React, { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import TextHeader from "@/components/TextHeader";
import MobilCard from "@/components/micros/cards/MobilCard";
import "@/styles/Sewa.module.css";
import MobilForm from "@/components/micros/forms/MobilForm";
import { Switch, Tooltip } from "@material-tailwind/react";

const index = (props: any) => {
  const [formOpener, setForm] = useState<Boolean>(true);

  useEffect(() => {
    window.addEventListener("resize", () => {
      window.innerWidth > 960 && setForm(true);
    });
    console.log(formOpener);
  }, [formOpener]);
  return (
    <Layout pageTitle="Sewa Mobil">
      <div className="pt-14 container mx-auto">
        <TextHeader
          className="mt-10"
          title="Pilih Mobil untuk anda sewa."
          subtitle="Arrizki Tour menyediakan layanan sewa mobil untuk para wisatawan atau kalian yang sedang membuutuhkan mobil untuk akomodasi dll."
        />
        <div className="divide-x divide-gray-400 gap-3 grid grid-cols-6 mx-auto">
          <div className="flex col-span-4 flex-col full mb-10 w-full sm:mx-auto px-5">
            <MobilCard
              facility={[
                "makan",
                "Minum",
                "Sholat",
                "Puasa",
                "Sedekah jariah dunia akhirat",
              ]}
              id="123j12h3jk1h"
              image=""
              price={20000}
              title="Toyota Avanza"
            />
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
              <MobilForm />
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
      </div>
    </Layout>
  );
};

export default index;
