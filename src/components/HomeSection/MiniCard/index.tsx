import React from "react";

interface teks {
  teks: string;
}

const index = (props: teks) => {
  const { teks } = props;
  return (
    <div className="px-4 py-2 border border-red-300 before:top-0 before:left-0 hover:text-white rounded-xl bg-transparent relative before:absolute before:inset before:hover:w-full before:h-full before:-z-10 z-10 before:w-0 before:duration-[400ms] before:bg-red-400 before:hover:border before:border-red-400 cursor-pointer before:rounded-lg">
      {teks}
    </div>
  );
};

export default index;
