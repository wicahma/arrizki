import Image from "next/image";
import React from "react";
import { MobilCardProps } from "./mobilCard";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { setSelectedCar } from "@/store/produkSlice";

const MobilCard = (props: MobilCardProps) => {
  const { title, image, price, id } = props;
  const dispatch = useDispatch();
  const rupiah = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  });
  return (
    <div
      key={id}
      onClick={() => {
        dispatch(setSelectedCar(id));
      }}
      className="flex cursor-pointer normal-case relative justify-between md:flex-row flex-col gap-5 p-3 transition-all group bg-white hover:text-white text-black/80 hover:shadow-xl shadow-none hover:bg-red-600 rounded-2xl col-span-1 md:h-[200px]"
    >
      <Image
        src={image}
        width={400}
        height={400}
        className="h-full w-full object-cover aspect-square z-10 md:w-[180px] overflow-hidden bg-black/50 rounded-2xl"
        alt={`mobil-${image}`}
      />
      <div className="flex grow md:flex-row flex-col z-10">
        <div className="text-left sm:m-0 mb-4 basis-1/2 flex justify-center flex-col">
          <h3 className="md:text-2xl text-xl font-semibold">{title}</h3>
          <p>{rupiah.format(price)}/Hari</p>
        </div>
      </div>
      {/* <div className="absolute -z-[10] group-hover:-bottom-6 px-5 bottom-0 transition-all text-white right-4 bg-red-600"> 
        <p>Pesan mobil ini</p>
      </div> */}
    </div>
  );
};

export default MobilCard;
