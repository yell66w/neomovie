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
    <div className="flex flex-col cursor-pointer ">
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
        } bg-no-repeat border border-neutral ${
          scrollable &&
          "w-[100px] min-w-[100px] sm:w-[200px] sm:min-w-[200px]  md:w-[250px] md:min-w-[250px] lg:w-[260px]  lg:min-w-[260px] "
        }    h-32 sm:h-72  md:h-96 bg-center bg-cover duration-500 rounded-xl`}
      />
      {caption && <p className="mt-3 sm:text-xs text-[9px]">{caption}</p>}
    </div>
  );
};

export default PosterCard;
