import { IMovieOverview } from "@/interfaces/Movie";
import { useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { RxDot, RxDotFilled } from "react-icons/rx";
import MovieBanner from "./MovieBanner";
import Rating from "../Rating";
import ViewMovieDetailsButton from "./MovieBanner/ViewMovieDetailsButton";
import BoxImage from "../BoxImage";
import { IMAGEDB_URL, PLACEHOLDER_BACKGROUND_IMAGE } from "@/constants";
interface Props {
  movies: IMovieOverview[];
}
export default function MovieCarousel({ movies }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? movies.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === movies.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex);
  };
  return (
    <div className="w-full group">
      <MovieBanner
        background_url={movies[currentIndex]?.backdrop_path}
        title={movies[currentIndex].title}
        poster={
          <BoxImage
            url={
              movies[currentIndex]
                ? `${IMAGEDB_URL}/${movies[currentIndex].poster_path}`
                : PLACEHOLDER_BACKGROUND_IMAGE
            }
            className="shadow-2xl shadow-black h-96 w-full xxs:h-[600px] sm:w-[200px] sm:h-[300px]  lg:h-[650px] lg:w-[450px] bg-no-repeat  bg-center bg-cover duration-500 rounded-xl"
          />
        }
        overview={movies[currentIndex].overview}
        subtitle={
          <Rating
            rating={movies[currentIndex].vote_average}
            count={movies[currentIndex].vote_count}
          />
        }
        actions={
          <>
            <ViewMovieDetailsButton
              navigateTo={`/movies/${movies[currentIndex]?.id}`}
            />
          </>
        }
      >
        {/* Left Arrow */}
        <div className=" hidden group-hover:block absolute  top-48 md:top-60 lg:top-[60%] -translate-x-0 translate-y-[-50%] left-5 lg:left-5 lg:text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
          <FiChevronLeft role="left-arrow" onClick={prevSlide} />
        </div>
        {/* Right Arrow */}
        <div className="hidden group-hover:block absolute top-48 md:top-60 lg:top-[60%] -translate-x-0 translate-y-[-50%] right-5 lg:right-5 lg:text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
          <FiChevronRight role="right-arrow" onClick={nextSlide} />
        </div>
        {/* Indicator */}
        <div
          id="indicator"
          className="flex absolute top-72 sm:top-[45%]  md:top-[58%] lg:bottom-10 lg:top-auto   right-0 left-0 justify-center py-2"
        >
          {movies.map((_, slideIndex) => (
            <div
              key={slideIndex}
              onClick={() => goToSlide(slideIndex)}
              className="lg:text-2xl cursor-pointer"
            >
              {currentIndex === slideIndex ? <RxDotFilled /> : <RxDot />}
            </div>
          ))}
        </div>
      </MovieBanner>
    </div>
  );
}
