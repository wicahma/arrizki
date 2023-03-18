import {
  Accordion,
  AccordionBody,
  AccordionHeader,
} from "@material-tailwind/react";
import Link from "next/link";
import React, { useState } from "react";

interface footerList {
  title: string;
  list: Array<string>;
  className?: string;
}

const index = (props: footerList) => {
  const { title, list, className } = props;
  const [open, setOpen] = useState(0);

  const handleOpen = (value: number) => {
    setOpen(open === value ? 0 : value);
  };

  return (
    <div className={className}>
      <Accordion className="block sm:hidden" open={open === 1}>
        <AccordionHeader
          className="font-semibold mb-4 text-xl text-black"
          onClick={() => handleOpen(1)}
        >
          {title}
        </AccordionHeader>
        <AccordionBody>
          <ul className="text-lg font-normal text-black">
            {list.map((item, i) => {
              return (
                <li key={i}>
                  <Link
                    className="relative after:absolute after:hover:w-full after:left-0 after:bottom-0 after:w-0 after:duration-300 after:h-[2px] after:rounded-full after:bg-red-400"
                    href="#"
                  >
                    {item}
                  </Link>
                </li>
              );
            })}
          </ul>
        </AccordionBody>
      </Accordion>
      <h4 className="font-semibold mb-4 text-xl sm:block hidden">{title}</h4>
      <ul className="sm:block hidden">
        {list.map((item, i) => {
          return (
            <li key={i}>
              <Link
                className="relative after:absolute after:hover:w-full after:left-0 after:bottom-0 after:w-0 after:duration-300 after:h-[2px] after:rounded-full after:bg-red-400"
                href="#"
              >
                {item}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default index;
