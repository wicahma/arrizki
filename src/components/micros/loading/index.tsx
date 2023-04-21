import loadingStyle from "./loading.module.css";

const Loading = ({ isActive }: any) => {
  return (
    <div
      className={`${
        isActive ? "opacity-100 w-screen h-screen" : "opacity-0 w-0 h-0"
      } fixed z-[1000] flex top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 justify-center items-center bg-black/20 transition-all duration-200 backdrop-blur-lg aspect-square`}
    >
      <svg className={loadingStyle.svg} viewBox="0 0 50 50">
        <circle className={loadingStyle.ring} cx="25" cy="25" r="20"></circle>
        <circle className={loadingStyle.ball} cx="25" cy="5" r="4.5"></circle>
      </svg>
    </div>
  );
};

export default Loading;
