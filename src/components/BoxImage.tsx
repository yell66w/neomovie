import React from "react";

interface Props
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  url: string;
}

const BoxImage = ({ url, children, ...rest }: Props) => {
  return (
    <div
      style={{
        backgroundImage: `url(${url})`,
      }}
      {...rest}
    >
      {children}
    </div>
  );
};

export default BoxImage;
