import { IMAGEDB_URL } from "@/constants";
import { Movie } from "@/interfaces/Movie";
import { useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { RxDot, RxDotFilled } from "react-icons/rx";
interface Props {
  movies: Movie[];
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
    <div className="h-[250px] sm:h-[700px] lg:h-[800px] xl:h-[800px] w-full m-auto mt-6 relative group lg:px-16">
      <div
        style={{
          backgroundImage: `url(${IMAGEDB_URL}/${movies[currentIndex]?.backdrop_path})`,
        }}
        className="w-full h-full bg-cover bg-center duration-500 lg:rounded-2xl flex items-end justify-center lg:justify-start text-center lg:text-start "
      >
        <h2
          style={{
            background:
              "linear-gradient(360deg, #000000 0%, rgba(0, 0, 0, 0) 100%)",
          }}
          className="font-bold text-xl md:text-3xl lg:text-4xl w-full py-10 px-10"
        >
          {movies[currentIndex].title}
        </h2>
      </div>
      {/* Left Arrow */}
      <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 lg:left-20 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
        <FiChevronLeft onClick={prevSlide} size={30} />
      </div>
      {/* Right Arrow */}
      <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 lg:right-20 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
        <FiChevronRight onClick={nextSlide} size={30} />
      </div>
      {/* Indicator */}
      <div className="flex absolute bottom-0 right-0 left-0 justify-center py-2">
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
