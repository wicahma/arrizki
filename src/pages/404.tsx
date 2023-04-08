import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const NotFound = (props: any) => {
  const router = useRouter();
  const [countdown, setCountdown] = useState<Number>(5);

  useEffect(() => {
    const interval = setInterval(() => {
      if (countdown === 1) {
        return router.back();
      }
      setCountdown((prev: any) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [router, countdown]);

  return (
    <div className="w-screen h-screen bg-white text-center flex items-center gap-0 justify-center flex-col">
      <h1 className="text-4xl font-sans font-bold text-red-500 px-5">
        Hmm, kamu tersesat?
      </h1>
      <div className="relative">
        <Image
          src={"/assets/images/lost.svg"}
          alt="Not Found"
          height={300}
          width={600}
          className="bg-transparent relative z-20 drop-shadow-2xl"
        />
        <h3 className="absolute text-red-600 text-9xl font-serif font-bold left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          404
        </h3>
      </div>
      <div className="text-base text-center font-light px-5">
        <p>
          <span>Sinii, aku bantu kamu balik.</span> atau kamu juga bisa pergi ke{" "}
          <Link
            className="bg-red-500 px-3 py-1 rounded-lg text-white hover:bg-red-400 hover:shadow-lg transition-all"
            href={"/"}
          >
            Beranda
          </Link>
        </p>
        <p>
          Redirecting in{" "}
          <span className="text-red-500">{countdown.toString()}</span> seconds
        </p>
      </div>
    </div>
  );
};

export default NotFound;
