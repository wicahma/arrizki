import Image from "next/image";
import underConstruction from "../../../../public/assets/images/under-construction.svg";

const index = (props: any) => {
  return (
    <div className="flex justify-center flex-col items-center w-full h-full p-5">
      <Image
        src={underConstruction}
        alt="under construction image"
        className="md:w-[500px] w-full px-2"
      />
      <h3 className="text-3xl font-semibold text-red-300 mt-3">Under Construction</h3>
    </div>
  );
};

export default index;
