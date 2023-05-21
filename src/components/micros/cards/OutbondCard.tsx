import Image from "next/image";
import Link from "next/link";
import React from "react";

const OutbondCard = (props: any) => {
  const { id, title, minimumPrice, image, rupiah, keterangan } = props;
  return (
    <Link
      key={id}
      href={`/paket-tour/outbond/${title}/${id}/detail`}
      className="bg-white group hover:shadow-xl transition-all col-span-12 md:col-span-4 lg:col-span-3 sm:col-span-6 w-full text-center relative rounded-3xl"
    >
      <div className="bg-black flex flex-col text-left z-10 h-full group-hover:bottom-10 bottom-0 transition-all text-white p-5 relative overflow-hidden w-full rounded-[20px]">
        <h3 className="text-xl z-10 font-semibold mb-1">{title}</h3>
        <p className="bg-red-500 z-10 rounded-md px-3 max-w-max">
          {rupiah.format(minimumPrice)}
        </p>
        <div className="z-10  mt-20">
          <p>{keterangan.slice(0,50)}...</p>
        </div>
        <Image
          src={
            image === "https://via.placeholder.com/150"
              ? image
              : `${process.env.API_URL}/public/images/${image}`
          }
          alt={`wisata-${image}`}
          className="absolute opacity-50 top-0 w-full h-full object-cover left-0"
          width={300}
          height={200}
        />
      </div>
      <p className="absolute bottom-0 right-1/2 translate-x-1/2 py-2">
        Lihat Paket
      </p>
    </Link>
  );
};

export default OutbondCard;
