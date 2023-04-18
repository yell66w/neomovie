import { IImage } from "@/interfaces/Image";
import React, { ReactNode } from "react";
import ScrollContainer from "react-indiana-drag-scroll";

interface Props
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  children: ReactNode;
  title: string;
}

const PosterList = ({ children, title = "Movies" }: Props) => {
  return (
    <div className={`flex flex-col gap-6 max-h-52 md:max-h-max`}>
      <h1 className={`text-lg lg:text-2xl font-bold`}>{title}</h1>
      <ScrollContainer className="w-full flex gap-5 h-30">
        {children}
        <div className="h-[380px] w-[100px] min-w-[100px] md:w-[100px] md:min-w-[100px] lg:w-[100px] lg:min-w-[100px]  bg-center bg-cover duration-500 rounded-xl" />
      </ScrollContainer>
    </div>
  );
};

export default PosterList;
