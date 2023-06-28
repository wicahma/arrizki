
interface teks {
  teks: string;
  className?: string;
  onClick?: (data: any) => void;
}

const index = (props: teks) => {
  const { teks, className, onClick } = props;
  return (
    <div
      className={`px-4 flex justify-center items-center border border-red-300 before:top-0 before:left-0 hover:text-white rounded-xl bg-transparent relative before:absolute before:inset before:hover:w-full before:h-full before:-z-10 z-10 before:w-0 before:duration-[400ms] before:bg-red-400 before:hover:border before:border-red-400 cursor-pointer before:rounded-lg ${className}`}
      onClick={onClick}
    >
      {teks}
    </div>
  );
};

export default index;
