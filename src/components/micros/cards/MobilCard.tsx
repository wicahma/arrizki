import Image from "next/image";
import React from "react";
import { MobilCardProps } from "./mobilCard";
import {
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
} from "@material-tailwind/react";
import type { TabsProps } from "@material-tailwind/react";

const MobilCard = (props: MobilCardProps) => {
  const { title, image, price, facility, id } = props;

  return (
    <div className="flex md:flex-row flex-col gap-5 p-3 transition-all group bg-white hover:text-white hover:shadow-xl hover:bg-red-600 rounded-2xl">
      <div className="aspect-square h-full grow overflow-hidden bg-black/50 rounded-2xl">
        <Image src={image} width={200} height={200} className="h-full w-full object-cover" alt={`mobil-${image}`} />
      </div>
      <div className="flex sm:flex-row flex-col">
        <div className="text-left sm:m-0 mb-4 basis-1/2 flex justify-center flex-col">
          <h3 className="text-2xl font-semibold">{title}</h3>
          <p>{price}</p>
        </div>
        <div className="grid grid-cols-1 basis-1/2 w-full md:w-[250px] mx-auto ">
          <Tabs value="Fasilitas">
            <TabsHeader className="w-full mb-1">
              <Tab value={"Fasilitas"}>Fasilitas</Tab>
              <Tab value={"Harga"}>Harga</Tab>
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
    </div>
  );
};

export default MobilCard;
