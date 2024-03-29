import { Typography } from "@material-tailwind/react";
import Link from "next/link";
import { useRouter } from "next/router";

const NavList = (props: any) => {
  const { pathname } = useRouter();

  return (
    <ul className="mb-4 mt-2 w-fit mx-auto text-black flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className={`p-1 font-normal relative after:absolute hover:after:w-full ${
          pathname === "/"
            ? "after:w-full after:bg-red-500"
            : "after:w-0 after:bg-red-300"
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
          pathname.includes("paket-tour")
            ? "after:w-full after:bg-red-500 "
            : "after:w-0 after:bg-red-300"
        } after:h-[2px] after:bottom-1 after:left-0 after:transition-all after:duration-300`}
      >
        <Link href="/paket-tour/private" className="flex items-center">
          Paket Tour
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className={`p-1 font-normal relative after:absolute hover:after:w-full ${
          pathname.includes("paket-outbond")
            ? "after:w-full after:bg-red-500 "
            : "after:w-0 after:bg-red-300"
        } after:h-[2px] after:bottom-1 after:left-0 after:transition-all after:duration-300`}
      >
        <Link href="/paket-outbond" className="flex items-center">
          Paket Outbond
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className={`p-1 font-normal relative after:absolute hover:after:w-full ${
          pathname.includes("sewa-mobil")
            ? "after:w-full after:bg-red-500"
            : "after:w-0 after:bg-red-300"
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
