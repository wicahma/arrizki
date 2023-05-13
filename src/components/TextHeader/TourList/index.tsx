import Link from "next/link";

const index = (props: any) => {
  const { pathname } = props;
  return (
    <div className="text-center flex justify-center mt-5">
      <ul className="bg-red-500 w-fit p-1 text-white rounded-xl">
        <Link
          className={`hover:text-red-50 text-red-100 transition-colors inline-block px-3 py-1 rounded-lg ${
            pathname.includes("/paket-tour/private")
              ? "bg-red-50 !text-red-900"
              : ""
          }`}
          href={"/paket-tour/private"}
        >
          Private Tour
        </Link>
        <Link
          className={`hover:text-red-50 text-red-100 transition-colors inline-block px-3 py-1 rounded-lg ${
            pathname.includes("/paket-tour/group")
              ? "bg-red-50 !text-red-900"
              : ""
          }`}
          href={"/paket-tour/group"}
        >
          Group Tour
        </Link>
        <Link
          className={`hover:text-red-50 text-red-100 transition-colors inline-block px-3 py-1 rounded-lg ${
            pathname.includes("/paket-tour/custom")
              ? "bg-red-50 !text-red-900"
              : ""
          }`}
          href={"/paket-tour/custom"}
        >
          Custom Tour
        </Link>
      </ul>
    </div>
  );
};

export default index;
