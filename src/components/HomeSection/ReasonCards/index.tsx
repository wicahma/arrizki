import React from "react";

interface card {
  title: string;
  subtitle: string;
  image: React.ReactNode;
  className?: string;
  side: boolean;
}

const index = (props: card) => {
  const { title, subtitle, image, className, side } = props;
  return (
    <div className="flex items-center justify-center">
      <div
        className={`flex relative max-w-[1100px] rounded-3xl antialiased z-0 min-h-[210px] text-black ${
          side ? "flex-row" : "flex-row-reverse"
        } ${className}`}
      >
        <div className="flex items-center">
          <div className="text-red-200 h-[100px] aspect-square m-4">
            {image}
          </div>
        </div>
        <div
          className={`col-span-2 flex flex-col justify-center m-5 bg-white text-black px-4 py-1 rounded-xl ${
            side ? "text-left" : "text-right"
          }`}
        >
          <h1 className="text-2xl font-bold mb-3">{title}</h1>
          <p className="font-light leading-[17px]">{subtitle}</p>
        </div>
      </div>
    </div>
  );
};

export default index;
