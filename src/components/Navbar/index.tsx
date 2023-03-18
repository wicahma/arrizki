import React, { useEffect, useState } from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import Image from "next/image";
import NavList from "./navList";

const Navbars = (props: any) => {
  const [openNav, setOpenNav] = useState(false);

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);
  return (
    <div className="bg-white drop-shadow-xl fixed top-0 w-screen z-[1000]">
      <Navbar
        shadow={false}
        className="mx-auto py-2 mt-0 rounded-none border-0 px-4 lg:px-8 lg:py-2 bg-transparent"
      >
        <div className="mx-auto flex items-center justify-between text-blue-gray-900">
          <Typography
            as="a"
            href="#"
            variant="small"
            className="mr-4 cursor-pointer font-normal"
          >
            <Image
              src="/assets/images/arrizki-logo.png"
              alt="arrizki-logo"
              width={50}
              height={40}
            />
          </Typography>
          <div className="hidden lg:block">
            <NavList />
          </div>
          <div className="w-[165px] h-[39px] relative">
            <Button
              color="green"
              size="sm"
              className="hidden absolute overflow-hidden w-[48px] h-[39px] hover:w-full hover:gap-2 right-0 top-0 lg:flex px-3 py-1 gap-5 font-normal normal-case items-center"
            >
              <Image
                src="/assets/icons/whatsapp.svg"
                alt="whatsapp-images"
                width={30}
                height={30}
              />
              <p className="break-keep">Whatsapp kami</p>
            </Button>
          </div>
          <IconButton
            variant="text"
            className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
            ripple={false}
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                className="h-6 w-6"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </IconButton>
        </div>
        <MobileNav open={openNav}>
          <div className="container mx-auto">
            <NavList />
            <Button
              color="green"
              size="sm"
              fullWidth
              className="mb-2 normal-case font-normal"
            >
              Whatsapp
            </Button>
          </div>
        </MobileNav>
      </Navbar>
    </div>
  );
};

export default Navbars;
