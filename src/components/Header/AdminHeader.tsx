import React, { useEffect } from "react";
import navbar from "@/styles/AdminNavbar.module.css";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@material-tailwind/react";

const AdminHeader = (props: any) => {
  const { pathname } = useRouter(),
    activeStyle: string = "!bg-red-500 text-white",
    [openDialog, setOpenDialog] = React.useState<boolean>(false),
    [openNavbar, setOpenNavbar] = React.useState<boolean>(true),
    handleOpenDialog = () => setOpenDialog(!openDialog);

  const handleLogout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    router.replace("/admin/643559f95161557cf734e52f");
  };

  useEffect(() => {
    if (window) {
      window.addEventListener("resize", () => {
        console.log(window.innerWidth);
        window.innerWidth > 720 && setOpenNavbar(true);
      });
    }
  }, []);

  return (
    <nav
      className="md:p-3 md:w-[400px] min-w-[400px] w-screen bg-white shadow-lg md:shadow-none md:space-y-3 md:sticky md:self-start md:h-full md:top-0 fixed !z-[600]"
      id="navbar"
    >
      <div className="self-center bg-white md:shadow-lg rounded-xl w-screen md:w-full flex justify-between md:justify-center items-center md:py-5 md:px-0 px-3 py-2">
        <Image
          src={"/assets/images/arrizki-tour-text.png"}
          alt="logo-arrizki"
          height={130}
          width={230}
          className="h-10 object-cover"
        />
        <Button
          onClick={() => setOpenNavbar(!openNavbar)}
          color="red"
          className="!p-2 md:hidden"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25"
            />
          </svg>
        </Button>
      </div>
      <ul
        className={`space-y-2 md:border-t md:border-b md:py-2 px-3 md:px-0 w-full left-0 top-0 overflow-hidden ${
          openNavbar ? "my-2 h-full" : "my-0 h-0"
        }`}
      >
        <Link
          href={"/admin/dashboard"}
          className={`${navbar.navlist} ${
            pathname.includes("/admin/dashboard") && activeStyle
          }`}
        >
          Dashboard
        </Link>
        <Link
          href={"/admin/produk"}
          className={`${navbar.navlist} ${
            pathname.includes("/admin/produk") && activeStyle
          }`}
        >
          Produk
        </Link>
        <Link
          href={"/admin/pesanan"}
          className={`${navbar.navlist} ${
            pathname.includes("/admin/pesanan") && activeStyle
          }`}
        >
          Pesanan
        </Link>
        <Link
          href={"/admin/transaksi"}
          className={`${navbar.navlist} ${
            pathname.includes("/admin/transaksi") && activeStyle
          }`}
        >
          Transaksi
        </Link>
      </ul>
      <div>
        <button
          onClick={() => handleOpenDialog()}
          className={`${navbar.navlist} border w-full border-red-600 hover:!bg-red-600 text-red-600`}
        >
          Logout
        </button>
        <Dialog size="xs" open={openDialog} handler={handleOpenDialog}>
          <DialogBody className="text-xl border-b">
            Apakah anda yakin ingin keluar dari dashboard admin?, anda harus
            login kembali apabila anda logout.
          </DialogBody>
          <DialogFooter>
            <Button
              variant="text"
              color="red"
              onClick={handleOpenDialog}
              className="mr-1"
            >
              <span>Batal</span>
            </Button>
            <Button
              variant="gradient"
              color="green"
              onClick={() => {
                handleOpenDialog();
                handleLogout();
              }}
            >
              <span>Ya, logout sekarang</span>
            </Button>
          </DialogFooter>
        </Dialog>
      </div>
    </nav>
  );
};

export default AdminHeader;
