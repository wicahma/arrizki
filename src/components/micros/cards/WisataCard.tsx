import Image from "next/image";
import Link from "next/link";

interface WisataCardProps {
  id: string;
  title: string;
  price: number;
  rupiah: Intl.NumberFormat;
  image: string;
  className?: string;
  listWisata?: string[];
}

const WisataCard = (props: WisataCardProps) => {
  const { id, title, price, image, listWisata, rupiah } = props;

  return (
    <Link
      key={id}
      href={`/paket-tour/private/${title}/${id}/detail`}
      className="bg-white group hover:shadow-xl transition-all col-span-12 md:col-span-4 lg:col-span-3 sm:col-span-6 w-full text-center relative rounded-3xl"
    >
      <div className="bg-black flex flex-col text-left z-10 group-hover:bottom-10 bottom-0 h-full transition-all text-white p-5 relative overflow-hidden w-full rounded-[20px]">
        <h3 className="text-xl z-10 font-semibold mb-1">{title}</h3>
        <p className="bg-red-500 z-10 rounded-md px-3 max-w-max">
          {rupiah.format(price)}
        </p>
        <div className="z-10 my-10">
          <ul className="list-disc list-inside">
            {listWisata?.map((item, i) => {
              if (i < 4) return <li key={i}>{item}</li>;
            })}
            <li>Dll</li>
          </ul>
        </div>
        <Image
          src={
            image === "https://via.placeholder.com/150"
              ? image
              : `${process.env.API_URL}/images/${image}`
          }
          alt={`wisata-${image}`}
          className="absolute opacity-50 top-0 w-full h-full object-cover left-0"
          width={300}
          height={200}
        />
      </div>
      <p className="absolute bottom-0 right-1/2 translate-x-1/2 py-2">
        Lihat Paket
      </p>
    </Link>
  );
};

export default WisataCard;
