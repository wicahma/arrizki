import React from "react";
import Header from "../Header";
import Footer from "../Footer";
import Head from "next/head";

interface LayoutProps {
  children?: React.ReactNode;
  pageTitle?: string;
  className?: string;
}

const Index = (props: LayoutProps) => {
  const { pageTitle, children, className } = props;
  return (
    <>
      <Head>
        <title>{`Arrizki Tour | ${pageTitle}`}</title>
        <meta
          name="description"
          content="Tempat pemesanan dan juga persewaan Mobil, lengkap dengan paket Wisata."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={className}>
        <Header />
        {children}
        <Footer />
      </main>
    </>
  );
};

export default Index;
