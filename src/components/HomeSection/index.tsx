import React from "react";
import TextHeader from "../TextHeader";
interface LayoutProps {
  children?: React.ReactNode;
  title: string;
  subtitle?: string;
  className?: string;
}
const index = (props: LayoutProps) => {
  const { title, subtitle, children, className } = props;
  return (
    <div className="">
      <TextHeader title={title} subtitle={subtitle} />
      <div className={className}>{children}</div>
    </div>
  );
};

export default index;
