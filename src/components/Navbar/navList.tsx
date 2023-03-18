import { Typography } from "@material-tailwind/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const NavList = (props: any) => {
  const { pathname } = useRouter();

  return (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className={`p-1 font-normal relative after:absolute hover:after:w-full ${
          pathname === "/" ? "after:w-full after:bg-red-500" : "after:w-0 after:bg-red-300"
        } after:h-[2px] after:bottom-1 after:left-0 after:transition-all after:duration-300`}
      >
        <Link href="/" className="flex items-center">
          Home
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className={`p-1 font-normal relative after:absolute hover:after:w-full ${
          pathname.includes("paket-wisata") ? "after:w-full after:bg-red-500 " : "after:w-0 after:bg-red-300"
        } after:h-[2px] after:bottom-1 after:left-0 after:transition-all after:duration-300`}
      >
        <Link href="/paket-wisata" className="flex items-center">
          Paket Wisata
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className={`p-1 font-normal relative after:absolute hover:after:w-full ${
          pathname.includes("sewa-mobil") ? "after:w-full after:bg-red-500" : "after:w-0 after:bg-red-300"
        } after:h-[2px] after:bottom-1 after:left-0 after:transition-all after:duration-300`}
      >
        <Link href="/sewa-mobil" className="flex items-center">
          Sewa Mobil
        </Link>
      </Typography>
    </ul>
  );
};

export default NavList;
