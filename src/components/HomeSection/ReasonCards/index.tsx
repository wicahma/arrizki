import React from "react";
import Image from "next/image";

interface card {
  title: string;
  subtitle: string;
  image: React.ReactNode;
  className?: string;
}

const index = (props: card) => {
  const { title, subtitle, image, className } = props;
  return (
    <div className="ml-10 flex justify-center">
      <div
        className={`flex relative w-[600px] rounded-3xl antialiased z-0 min-h-[210px] text-white bg-red-500 ${className}`}
      >
        <div className="mr-10 pr-5">
          <div className="absolute bg-white h-[60%] aspect-square overflow-hidden z-10 rounded-xl drop-shadow-xl top-1/2 -translate-y-1/2 -translate-x-1/2">
            <div className="text-red-200 h-[100px] m-4">{image}</div>
          </div>
        </div>
        <div className="col-span-2 flex flex-col justify-start m-5 bg-white text-red-500 px-4 py-1 rounded-xl">
          <h1 className="text-2xl font-bold mb-3">{title}</h1>
          <p className="font-light leading-[17px] indent-10">{subtitle}</p>
        </div>
      </div>
    </div>
  );
};

export default index;
