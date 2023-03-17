import { Typography } from "@material-tailwind/react";
import Link from "next/link";
import React from "react";

export const navList: React.ReactNode = (
  <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
    <Typography
      as="li"
      variant="small"
      color="blue-gray"
      className="p-1 font-normal"
    >
      <Link href="/" className="flex items-center">
        Home
      </Link>
    </Typography>
    <Typography
      as="li"
      variant="small"
      color="blue-gray"
      className="p-1 font-normal"
    >
      <Link href="#" className="flex items-center">
        Paket Wisata
      </Link>
    </Typography>
    <Typography
      as="li"
      variant="small"
      color="blue-gray"
      className="p-1 font-normal"
    >
      <Link href="#" className="flex items-center">
        Sewa Mobil
      </Link>
    </Typography>
  </ul>
);
