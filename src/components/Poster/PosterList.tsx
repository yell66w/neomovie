import { IImage } from "@/interfaces/Image";
import React, { ReactNode } from "react";
import ScrollContainer from "react-indiana-drag-scroll";

interface Props
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  children: ReactNode;
  title?: string;
  scrollable?: boolean;
}

const PosterList = ({ children, title, scrollable = true }: Props) => {
  return (
    <div className={`flex flex-col gap-6 `}>
      {title && <h1 className={`text-lg lg:text-2xl font-bold`}>{title}</h1>}
      {scrollable ? (
        <ScrollContainer className="w-full flex gap-5 h-30">
          {children}
          <div className="mr-10" />
        </ScrollContainer>
      ) : (
        <div className="grid-flow-row w-full grid xxs:grid-cols-3  md:grid-cols-4  xl:grid-cols-6 gap-3 md:gap-6 ">
          {children}
        </div>
      )}
    </div>
  );
};

export default PosterList;
