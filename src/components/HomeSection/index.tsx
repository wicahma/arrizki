import React from "react";
import TextHeader from "../TextHeader/main";
interface LayoutProps {
  children?: React.ReactNode;
  title: string;
  subtitle?: string;
  className?: string;
  container?: boolean;
}
const index = (props: LayoutProps) => {
  const { title, subtitle, children, className, container = false } = props;
  return (
    <div className={`${container ? "container" : ""} mx-auto ${className}`}>
      <TextHeader className="z-10 relative" title={title} subtitle={subtitle} />
      {children}
    </div>
  );
};

export default index;
