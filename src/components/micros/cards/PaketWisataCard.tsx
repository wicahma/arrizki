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
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const PaketWisataCard = ({ paketData, index }: any) => {
  const responsive = {
      desktop: {
        breakpoint: { max: 3000, min: 0 },
        items: 1,
        slidesToSlide: 1, // optional, default to 1.
      },
    },
    rupiah = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }),
    { pax, rundown, tempatWisata, images } = paketData,
    data = [
      {
        label: "Harga",
        value: "harga",
        icon: "UserCircleIcon",
        desc: (
          <ul>
            {pax.map((item: any, index: number) => (
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
            {rundown.map((item: any, index: number) => (
              <li className="list-inside list-disc" key={index}>
                {item}
              </li>
            ))}
          </ul>
        ),
      },
    ];
  return (
    <Card
      id={`wisata-${index}`}
      className="w-full shadow-none border-l border-gray-300"
    >
      <CardHeader color="white" className="relative h-56">
        <Carousel
          swipeable
          draggable
          ssr
          infinite
          autoPlay
          showDots
          arrows
          keyBoardControl
          responsive={responsive}
          autoPlaySpeed={1500}
          transitionDuration={300}
          containerClass="carousel-container w-full h-full z-[10]"
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-40-px"
        >
          {[
            "/assets/images/telaga.png",
            "/assets/images/telaga.png",
            "/assets/images/telaga.png",
          ].map((item: string, index: number) => {
            return (
              <Image
                src={item}
                alt={`Gambar ${index}`}
                height={220}
                width={850}
                className="h-full w-full object-cover"
              />
            );
          })}
        </Carousel>
      </CardHeader>
      <CardBody className="text-center flex flex-col sm:flex-row sm:divide-x divide-gray-300">
        <div className="px-3">
          <Typography variant="h5" className="mb-2">
            Paket Wisata {index}
          </Typography>
          <Typography>
            {tempatWisata.map((item: any, index: number) => (
              <span key={index}>
                {" "}
                {item} {index < tempatWisata.length - 1 && "-"}
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
