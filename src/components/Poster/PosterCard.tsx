import { IMAGEDB_URL, PLACEHOLDER_BACKGROUND_IMAGE } from "@/constants";
import React from "react";

type Props = {
  image_url: string | null;
  onClick?: () => void;
  caption?: string;
};

const PosterCard = ({ image_url = "", onClick, caption }: Props) => {
  return (
    <div className="flex flex-col ">
      <div
        onClick={onClick}
        style={{
          backgroundImage: `url(${
            image_url
              ? `${IMAGEDB_URL}/${image_url}`
              : PLACEHOLDER_BACKGROUND_IMAGE
          })`,
          backgroundSize: image_url ? undefined : "100px",
        }}
        className={`transition ease-in-out ${
          onClick && "hover:opacity-20"
        } bg-no-repeat border border-neutral h-32 md:h-60 lg:h-[380px] w-[100px] min-w-[100px] md:w-[200px] md:min-w-[200px] lg:w-[260px] lg:min-w-[260px]  bg-center bg-cover duration-500 rounded-xl`}
      />
      {caption && <p className="mt-3 text-xs">{caption}</p>}
    </div>
  );
};

export default PosterCard;
