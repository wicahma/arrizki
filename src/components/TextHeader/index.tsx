import React from "react";

interface TextHeaderProps {
  title: string;
  subtitle?: string;
}

const index = (props: TextHeaderProps) => {
  const { title, subtitle } = props;
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold font-serif">{title}</h1>
      <p className="text-xl font-normal">{subtitle}</p>
    </div>
  );
};

export default index;
