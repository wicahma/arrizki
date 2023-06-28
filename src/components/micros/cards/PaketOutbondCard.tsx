import { jenisPaketOutbond } from "@/interfaces/produkInterface";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import Image from "next/image";
import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

interface PaketOutbondCardProps {
  paketData: jenisPaketOutbond;
  index: number;
}

const PaketOutbondCard = ({ paketData, index }: PaketOutbondCardProps) => {
  const responsive = {
      desktop: {
        breakpoint: { max: 3000, min: 0 },
        items: 1,
        slidesToSlide: 1,
      },
    },
    rupiah = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }),
    { fasilitas, harga, minimumPerson, namaPaket, _id, images } = paketData;

  return (
    <Card
      id={`wisata-${index}`}
      className="w-full shadow-none border-l border-gray-300"
    >
      <CardHeader color="transparent" className=" h-[500px]">
        <Carousel
          swipeable
          draggable
          ssr={false}
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
          {images.map((item: string, key: number) => (
            <Image
              src={`${process.env.API_URL}/images/${item}`}
              alt={`Gambar ${item}`}
              key={key}
              height={220}
              width={850}
              className="h-full w-full object-cover"
            />
          ))}
        </Carousel>
      </CardHeader>
      <CardBody className="text-center flex flex-col sm:flex-row sm:divide-x divide-gray-300">
        <div className="md:pr-7 min-w-[300px]">
          <Typography variant="h5" className="mb-2">
            {namaPaket}
          </Typography>
          <div className="bg-red-400 text-white rounded-xl py-2 px-3 shadow-xl shadow-red-900/30">
            <p>{rupiah.format(harga)} / 1 Orang</p>
            <p>
              Minimal pemesanan{" "}
              <span className="font-semibold">{minimumPerson} Orang</span>
            </p>
          </div>
        </div>
        <div className="md:pl-7 md:mt-0 mt-5 text-start">
          <Typography variant="h6" className="mb-2 text-xl">
            Fasilitas
          </Typography>
          <ul className="list-outside list-disc ml-5">
            {fasilitas.map((item: any, i: number) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      </CardBody>
    </Card>
  );
};

export default PaketOutbondCard;
