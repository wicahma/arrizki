import { setSelectedCar } from "@/store/produkSlice";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { MobilCardProps } from "../../../interfaces/mobilCardInterface";

const MobilCard = (props: MobilCardProps) => {
  const { title, image, price, id, fasilitas, seat } = props;
  const dispatch = useDispatch();
  const rupiah = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  });
  return (
    <div
      key={id}
      onClick={() => {
        dispatch(setSelectedCar(id));
      }}
      className="flex cursor-pointer normal-case relative justify-between md:flex-row flex-col gap-5 p-3 transition-all group bg-white hover:text-white text-black/80 hover:shadow-xl shadow-none hover:bg-red-600 rounded-2xl "
    >
      <Image
        src={image}
        width={400}
        height={400}
        className="h-full w-full object-contain aspect-square z-10 md:w-[300px] bg-white overflow-hidden rounded-2xl"
        alt={`mobil-${image}`}
      />
      <div className="grow flex flex-col justify-start z-10">
        <div className="text-left mb-2 flex justify-start flex-col">
          <h3 className="md:text-3xl text-2xl font-semibold">{title}</h3>
          <p>{rupiah.format(price)}/Hari</p>
          <p>{seat} Seat</p>
        </div>
        <div className="border-l-2 border-l-black/40 mb-5 grow pl-4">
          <h3 className="text-lg font-semibold">Fasilitas</h3>
          <p>{fasilitas}</p>
        </div>
      </div>
    </div>
  );
};

export default MobilCard;
