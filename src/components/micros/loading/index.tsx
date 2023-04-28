import loadingStyle from "./loading.module.css";

interface LoadingProps {
  isActive: boolean;
}

const Loading = ({ isActive }: LoadingProps) => {
  return (
    <div
      className={`${
        isActive ? "opacity-100 w-screen h-screen" : "opacity-0 w-0 h-0"
      } fixed z-[2000] flex top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 justify-center items-center bg-transparent transition-all duration-200 aspect-square`}
    >
      <div className="bg-white/5 shadow-lg backdrop-blur-lg rounded-xl p-3">
        <svg className={loadingStyle.svg} viewBox="0 0 50 50">
          <circle className={loadingStyle.ring} cx="25" cy="25" r="20"></circle>
          <circle className={loadingStyle.ball} cx="25" cy="5" r="4.5"></circle>
        </svg>
      </div>
    </div>
  );
};

export default Loading;
