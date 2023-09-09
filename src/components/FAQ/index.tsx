import {
  Accordion,
  AccordionBody,
  AccordionHeader,
} from "@material-tailwind/react";
import React, { useState } from "react";

interface FAQ {
  question: String;
  children: React.ReactNode;
}

const index = (props: FAQ) => {
  const { question, children } = props;
  return (
    <div className="text-black py-5">
      <div className="text-xl bg-red-400 w-fit px-3 rounded-lg text-white font-medium">
        {question}
      </div>
      <div className="">{children}</div>
    </div>
  );
};

export default index;
