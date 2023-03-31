import React from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import Image from "next/image";

const PaketWisataCard = (props: any) => {
  const data = [
    {
      label: "Harga",
      value: "harga",
      icon: "UserCircleIcon",
      desc: `Because it's about motivating the doers. Because I'm here
      to follow my dreams and inspire other people to follow their dreams, too.`,
    },
    {
      label: "Rundown",
      value: "rundown",
      icon: "Cog6ToothIcon",
      desc: `We're not always in the position that we want to be at.
      We're constantly growing. We're constantly making mistakes. We're
      constantly trying to express ourselves and actualize our dreams.`,
    },
  ];
  return (
    <Card className="w-full shadow-none border-l border-gray-300">
      <CardHeader color="red" className="relative h-56">
        <Image
          src="/"
          alt="img-blur-shadow"
          width={300}
          height={300}
          className="h-full w-full"
        />
      </CardHeader>
      <CardBody className="text-center flex flex-col sm:flex-row sm:divide-x divide-gray-300">
        <div className="px-3">
          <Typography variant="h5" className="mb-2">
            Cozy 5 Stars Apartment
          </Typography>
          <div className="flex justify-center"></div>
          <Typography>
            The place is close to Barceloneta Beach and bus stop just 2 min by
            walk and near to "Naviglio" where you can enjoy the main night life
            in Barcelona.
          </Typography>
        </div>
        <div className="w-[100%] px-3">
          <Tabs value="harga">
            <TabsHeader
              className="rounded-xl bg-gray-200"
              indicatorProps={{
                className: "bg-white rounded-xl",
              }}
            >
              {data.map(({ label, value, icon }) => (
                <Tab key={value} value={value}>
                  <div className="items-center  gap-2">
                    {React.createElement(icon, { className: "w-5 h-5" })}
                    {label}
                  </div>
                </Tab>
              ))}
            </TabsHeader>
            <TabsBody
              animate={{
                initial: { opacity: 0, y: 125 },
                mount: { opacity: 1, y: 0 },
                unmount: { opacity: 0, y: 125 },
              }}
              className="min-h-[300px] bg-white rounded-xl mt-3 text-left"
            >
              {data.map(({ value, desc }) => (
                <TabPanel key={value} value={value}>
                  {desc}
                </TabPanel>
              ))}
            </TabsBody>
          </Tabs>
        </div>
      </CardBody>
    </Card>
  );
};

export default PaketWisataCard;
