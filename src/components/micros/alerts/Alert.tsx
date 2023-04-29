import React, { useEffect } from "react";
import { Alert as Peringatan } from "@material-tailwind/react";
import { colors } from "@material-tailwind/react/types/generic";

interface AlertProps {
  show: boolean;
  message: string;
  type: "success" | "error" | "warning" | "info";
}

const Alert = (props: AlertProps) => {
  const { show, message, type } = props;
  const [color, setColor] = React.useState<colors | undefined>();

  useEffect(() => {
    switch (type) {
      case "success":
        setColor("green");
        break;
      case "error":
        setColor("red");
        break;
      case "warning":
        setColor("yellow");
        break;
      case "info":
        setColor("blue");
        break;
      default:
        break;
    }
  }, [type]);

  return (
    <Peringatan
      className="fixed lg:container w-[90%] top-16 left-1/2 !z-[2000]"
      color={color}
      variant="gradient"
      icon={
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      }
      show={show}
      animate={{
        mount: { y: 0, x: "-50%" },
        unmount: { y: -100, x: "-50%" },
      }}
    >
      {message}
    </Peringatan>
  );
};

export type { AlertProps };

export default Alert;
