import { IMAGEDB_URL, PLACEHOLDER_BACKGROUND_IMAGE } from "@/constants";
import React from "react";
import Button from "./Button";
import { BsFillPlayFill } from "react-icons/bs";
import ScrollContainer from "react-indiana-drag-scroll";
import { IImage } from "@/interfaces/Image";
import PosterList from "./Poster/PosterList";
import PosterCard from "./Poster/PosterCard";
import Genres from "./Genres";
import Star from "./Star";

interface Props {
  background_url: string | null;
  title: string;
  overview: string;
  posters?: IImage[];
  average_rating?: number;
  review_count?: number;
  genres?: { id: number; name: string }[];
}

const Hero = ({
  background_url = "", //TODO add placeholder background
  posters,
  average_rating,
  title,
  genres,
  overview,
  review_count,
}: Props) => {
  return (
    <div>
      <div
        style={{
          backgroundImage: `url(${
            background_url
              ? `${IMAGEDB_URL}/${background_url}`
              : PLACEHOLDER_BACKGROUND_IMAGE
          })`,
        }}
        className="h-80 md:h-[500px] lg:h-[1000px]  w-full bg-center bg-cover duration-500 opacity-70"
      />

      <div className="lg:bg-gradient-to-t lg:from-black lg:via-transparent lg:to-transparent flex flex-col lg:flex-row gap-20  lg:gap-40 lg:absolute lg:top-auto lg:bottom-0 lg:pb-16 w-full px-4 lg:px-0 lg:pl-32">
        <div className="flex flex-col lg:w-6/12">
          <div className="flex flex-col gap-6 mt-10">
            <h1 className="font-bold text-2xl lg:text-6xl">{title}</h1>
            <div className="flex flex-col lg:flex-row text-sm  gap-1 lg:items-center">
              {/* Rating */}
              {!!average_rating && !!review_count && (
                <div className="flex items-center gap-1 mr-6">
                  <Star />
                  <p className="text-base ">
                    {Number(average_rating).toFixed(1)}
                    <span className="text-xs ml-1">| {review_count}</span>
                  </p>
                </div>
              )}

              {/* Genre */}
              {!!genres?.length && <Genres genres={genres} />}
            </div>
          </div>
          {/* Overview */}
          <div className="flex flex-col gap-3 mt-10">
            <p className="text-xs lg:text-sm">{overview}</p>
          </div>
          {/* Actions */}
          <div className="w-48 mt-20">
            <Button icon={<BsFillPlayFill size={16} />}>Watch Trailer</Button>
          </div>
        </div>
        {/* Posters */}
        {!!posters?.length && (
          <div className="flex flex-col lg:w-6/12 gap-10">
            <PosterList title="POSTERS">
              {posters?.map(({ file_path }) => {
                return <PosterCard image_url={file_path} key={file_path} />;
              })}
            </PosterList>
          </div>
        )}
      </div>
    </div>
  );
};

export default Hero;
