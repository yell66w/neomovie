import { IMAGEDB_URL } from "@/constants";
import React from "react";

interface Props {
  backdrop_path: string | null;
  title: string;
}

const MovieOverviewCard = ({ backdrop_path, title }: Props) => {
  return (
    <div className="flex flex-col gap-3 first:ml-4 lg:first:ml-16">
      <div
        style={{
          backgroundImage: `url(${IMAGEDB_URL}/${backdrop_path})`,
        }}
        className="w-[200px] min-w-[200px] md:w-[360px] md:min-w-[360px] lg:w-[400px] lg:min-w-[400px] h-28 md:h-full bg-center bg-cover duration-500 rounded-xl"
      />
      <p className="text-xs lg:text-sm">
        {title?.length > 60 ? title.slice(0, 60) + "..." : title}
      </p>
    </div>
  );
};

export default MovieOverviewCard;
