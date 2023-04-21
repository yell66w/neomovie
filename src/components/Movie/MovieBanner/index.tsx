import BoxImage from "@/components/BoxImage";
import { IMAGEDB_URL, PLACEHOLDER_BACKGROUND_IMAGE } from "@/constants";
import { ReactNode } from "react";
interface Props {
  background_url: string | null;
  title: string;
  overview: string;
  poster?: ReactNode;
  children?: ReactNode;
  actions?: ReactNode;
  subtitle?: ReactNode;
  imageOverlay?: ReactNode;
}

const MovieBanner = ({
  background_url = "",
  poster,
  title,
  overview,
  children,
  actions,
  subtitle,
  imageOverlay,
}: Props) => {
  return (
    <>
      <div className="relative">
        <BoxImage
          url={
            background_url
              ? `${IMAGEDB_URL}/${background_url}`
              : PLACEHOLDER_BACKGROUND_IMAGE
          }
          className="relative h-80 md:h-[500px] lg:h-[1000px]  w-full bg-center bg-cover duration-500 opacity-70 "
        >
          {imageOverlay}
        </BoxImage>

        <div className="lg:bg-gradient-to-t lg:from-black lg:via-transparent lg:to-transparent flex flex-col sm:flex-row lg:flex-row sm:gap-10 gap-20 sm:justify-center    lg:gap-40 lg:absolute lg:top-auto lg:bottom-0 lg:pb-16 w-full px-4 lg:px-10 ">
          <div className=" sm:order-2 lg:order-1 flex flex-col lg:w-6/12  justify-end">
            <div className="flex flex-col gap-6 mt-10">
              <h1 className="font-bold text-2xl lg:text-6xl">{title}</h1>
              <div className="flex flex-col lg:flex-row text-sm  gap-1 lg:items-center">
                {subtitle}
              </div>
            </div>
            {/* Overview */}
            <div className="flex flex-col gap-3 mt-10">
              <p className="text-xs lg:text-sm break-words">{overview}</p>
            </div>

            {/* Actions */}
            <div className=" mt-10 lg:mt-20 flex gap-5 flex-col sm:flex-row">
              {actions}
            </div>
          </div>
          <div className="sm:order-1 lg:order-2 sm:mt-5">{poster}</div>
        </div>
        {children}
      </div>
    </>
  );
};

export default MovieBanner;
