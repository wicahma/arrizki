import React from "react";
import TextHeader from "../TextHeader/main";
interface LayoutProps {
  children?: React.ReactNode;
  title: string;
  subtitle?: string;
  className?: string;
}
const index = (props: LayoutProps) => {
  const { title, subtitle, children, className } = props;
  return (
    <div className="container mx-auto">
      <TextHeader title={title} subtitle={subtitle} />
      {children}
    </div>
  );
};

export default index;
