import { IMAGEDB_URL } from "@/constants";
import { IMovieOverview } from "@/interfaces/Movie";
import { useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { RxDot, RxDotFilled } from "react-icons/rx";
import Hero from "../Hero";
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
    <div className="h-[250px] sm:h-[700px] lg:h-[800px] xl:h-[1000px] w-full group">
      <Hero
        background_url={movies[currentIndex]?.backdrop_path}
        title={movies[currentIndex].title}
        overview={movies[currentIndex].overview}
        average_rating={movies[currentIndex].vote_average}
        review_count={movies[currentIndex].vote_count}
      />
      {/* Left Arrow */}
      <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 lg:left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
        <FiChevronLeft onClick={prevSlide} size={30} />
      </div>
      {/* Right Arrow */}
      <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 lg:right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
        <FiChevronRight onClick={nextSlide} size={30} />
      </div>
      {/* Indicator */}
      <div className="flex absolute bottom-10 right-0 left-0 justify-center py-2">
        {movies.map((slide, slideIndex) => (
          <div
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
            className="text-2xl cursor-pointer"
          >
            {currentIndex === slideIndex ? <RxDotFilled /> : <RxDot />}
          </div>
        ))}
      </div>
    </div>
  );
}
