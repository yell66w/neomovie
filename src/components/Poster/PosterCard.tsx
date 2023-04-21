/* eslint-disable @next/next/no-img-element */
import { IMAGEDB_URL, PLACEHOLDER_BACKGROUND_IMAGE } from "@/constants";
import React from "react";

type Props = {
  image_url: string | null;
  onClick?: () => void;
  caption?: string;
  scrollable?: boolean;
};

const PosterCard = ({
  image_url = "",
  onClick,
  caption,
  scrollable = true,
}: Props) => {
  return (
    <div className="flex flex-col cursor-pointer">
      <div className="h-full border border-neutral flex items-center justify-center  rounded-xl">
        <img
          alt={caption}
          onClick={onClick}
          src={
            image_url
              ? `${IMAGEDB_URL}/${image_url}`
              : PLACEHOLDER_BACKGROUND_IMAGE
          }
          className={`transition ease-in-out ${onClick && "hover:opacity-20"} ${
            !image_url ? "p-4 sm:p-10 h-auto" : "h-full"
          }  ${
            scrollable &&
            "min-w-[90px] sm:min-w-[200px] md:min-w-[250px] lg:min-w-[300px]"
          } bg-no-repeat  bg-center bg-cover duration-500 rounded-xl`}
        />
      </div>
      {caption && <p className="mt-3 sm:text-xs text-[9px]">{caption}</p>}
    </div>
  );
};

export default PosterCard;
