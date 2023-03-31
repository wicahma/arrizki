import Image from "next/image";
import React from "react";
import { MobilCardProps } from "./mobilCard";
import {
  Button,
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
} from "@material-tailwind/react";
import type { TabsProps } from "@material-tailwind/react";
import Link from "next/link";

const MobilCard = (props: MobilCardProps) => {
  const { title, image, price, facility, id } = props;

  return (
    <div
      className="flex cursor-pointer normal-case relative justify-between md:flex-row flex-col gap-5 p-3 transition-all group bg-white hover:text-white text-black/80 hover:shadow-xl shadow-none hover:bg-red-600 rounded-2xl"
    >
      <div className="aspect-square z-10 w-full md:w-10 grow overflow-hidden bg-black/50 rounded-2xl">
        <Image
          src={image}
          width={200}
          height={200}
          className="h-full w-full object-cover"
          alt={`mobil-${image}`}
        />
      </div>
      <div className="flex grow sm:flex-row flex-col z-10">
        <div className="text-left sm:m-0 mb-4 basis-1/2 flex justify-center flex-col">
          <h3 className="text-2xl font-semibold">{title}</h3>
          <p>{price}</p>
        </div>
        <div className="grid grid-cols-1 w-full basis-1/2 md:w-[250px] mx-auto">
          <Tabs value="Fasilitas">
            <TabsHeader className="w-full mb-1" >
              <Tab
                onClick={(a) => {
                  a.stopPropagation();
                  a.preventDefault();
                }}
                value={"Fasilitas"}
              >
                Fasilitas
              </Tab>
              <Tab onClick={(a) => {
                  a.stopPropagation();
                  a.preventDefault();
                }} value={"Harga"}>Harga</Tab>
            </TabsHeader>
            <TabsBody className="w-full bg-white rounded-xl">
              <TabPanel
                className="w-full px-3 py-2 h-[130px] overflow-y-auto cards"
                value={"Fasilitas"}
              >
                <ul className="list-disc">
                  {facility.map((item, i) => {
                    return <li key={i}>{item}</li>;
                  })}
                </ul>
              </TabPanel>
              <TabPanel
                className="w-full px-3 py-2 h-[130px] overflow-y-auto"
                value={"Harga"}
              >
                <p>asdasdsdf{price}</p>
              </TabPanel>
            </TabsBody>
          </Tabs>
        </div>
      </div>
      {/* <div className="absolute -z-[10] group-hover:-bottom-6 px-5 bottom-0 transition-all text-white right-4 bg-red-600"> 
        <p>Pesan mobil ini</p>
      </div> */}
    </div>
  );
};

export default MobilCard;
