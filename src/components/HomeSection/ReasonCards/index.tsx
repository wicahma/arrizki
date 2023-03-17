import React from "react";
import Image from "next/image";

interface card {
  title: string;
  subtitle: string;
  image: string;
  className?: string;
}

const index = (props: card) => {
  const { title, subtitle, image, className } = props;
  return (
    <div
      className={`grid grid-cols-3 w-[600px] rounded-3xl antialiased min-h-[210px] px-10 text-white bg-red-500 ${className}`}
    >
      <div className="col-span-1 flex items-center justify-center">
        <Image src={image} alt={`alasan-${image}`} />
      </div>
      <div className="col-span-2 flex flex-col justify-center">
        <h1 className="text-2xl font-bold mb-3">{title}</h1>
        <p className="font-light leading-[17px] indent-10">{subtitle}</p>
      </div>
    </div>
  );
};

export default index;
