import React from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import Image from "next/image";

const PaketWisataCard = ({ paketData, index }: any) => {
  const rupiah = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  });
  const data = [
    {
      label: "Harga",
      value: "harga",
      icon: "UserCircleIcon",
      desc: (
        <ul>
          {paketData.pax.map((item: any, index: number) => (
            <li key={index}>
              {item.jumlah} Orang: {rupiah.format(item.harga)}
            </li>
          ))}
          <li className="text-sm my-2">
            <span className="text-red-400">*</span> Apabila jumlah orang
            melebihi data diatas, mohon untuk menghubungi admin pada Whatsapp
          </li>
        </ul>
      ),
    },
    {
      label: "Rundown",
      value: "rundown",
      icon: "Cog6ToothIcon",
      desc: (
        <ul className="space-y-2">
          {paketData.rundown.map((item: any, index: number) => (
            <li className="list-inside list-disc" key={index}>
              {item}
            </li>
          ))}
        </ul>
      ),
    },
  ];
  return (
    <Card id={`wisata-${index}`} className="w-full shadow-none border-l border-gray-300">
      <CardHeader color="red" className="relative h-56">
        <Image
          src="/"
          alt="img-blur-shadow"
          width={300}
          height={300}
          className="h-full w-full"
        />
      </CardHeader>
      <CardBody className="text-center flex flex-col sm:flex-row sm:divide-x divide-gray-300">
        <div className="px-3">
          <Typography variant="h5" className="mb-2">
            Paket Wisata {index}
          </Typography>
          <Typography>
            {paketData.tempatWisata.map((item: any, index: number) => (
              <span key={index}>
                {" "}
                {item} {index < paketData.tempatWisata.length - 1 && "-"}
              </span>
            ))}
          </Typography>
        </div>
        <div className="w-[100%] px-3">
          <Tabs value="harga">
            <TabsHeader
              className="rounded-xl bg-gray-200"
              indicatorProps={{
                className: "bg-white rounded-xl",
              }}
            >
              {data.map(({ label, value, icon }) => (
                <Tab key={value} value={value}>
                  <div className="items-center  gap-2">
                    {React.createElement(icon, { className: "w-5 h-5" })}
                    {label}
                  </div>
                </Tab>
              ))}
            </TabsHeader>
            <TabsBody
              animate={{
                initial: { opacity: 0, y: 125 },
                mount: { opacity: 1, y: 0 },
                unmount: { opacity: 0, y: 125 },
              }}
              className="min-h-[300px] bg-white rounded-xl mt-3 text-left"
            >
              {data.map(({ value, desc }) => (
                <TabPanel key={value} value={value}>
                  {desc}
                </TabPanel>
              ))}
            </TabsBody>
          </Tabs>
        </div>
      </CardBody>
    </Card>
  );
};

export default PaketWisataCard;
