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
  const [open, setOpen] = useState(0);

  const handleOpen = (value: number) => {
    setOpen(open === value ? 0 : value);
  };
  return (
    <Accordion className="" open={open === 1}>
      <AccordionHeader
        className="font-normal border-b-black text-black"
        onClick={() => handleOpen(1)}
      >
        {question}
      </AccordionHeader>
      <AccordionBody>
        <div className="px-8">{children}</div>
      </AccordionBody>
    </Accordion>
  );
};

export default index;
