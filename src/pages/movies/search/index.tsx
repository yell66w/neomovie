import { getMovies, searchMovies } from "@/api/movies";
import PosterCard from "@/components/Poster/PosterCard";
import PosterList from "@/components/Poster/PosterList";
import { IMovieOverview } from "@/interfaces/Movie";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React from "react";
import { BsChevronRight } from "react-icons/bs";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import ReactPaginate from "react-paginate";

interface Props {
  movies: IMovieOverview[];
  total_pages: number;
}

const SearchedMoviesPage = ({ movies, total_pages }: Props) => {
  const router = useRouter();
  const { q: query } = router.query;
  return (
    <div className="flex lg:px-16 px-4 min-h-screen flex-col gap-10">
      <h1 className="">
        Results for: <span className="font-bold text-xl">{query}</span>
      </h1>
      <PosterList scrollable={false}>
        {movies?.map((movie) => {
          return (
            <PosterCard
              scrollable={false}
              onClick={() => router.replace(`/movies/${movie.id}`)}
              key={movie.id}
              image_url={movie.poster_path}
              caption={movie.title}
            />
          );
        })}
      </PosterList>

      <div>
        <ReactPaginate
          breakLabel="..."
          nextLabel={<FiChevronRight />}
          onPageChange={(event) => {
            router.replace(
              `/movies/search?q=${query}&page=${event.selected + 1}`
            );
          }}
          previousClassName="mr-4 hover:text-primary transition duration-200 ease-linear"
          nextClassName="ml-4 hover:text-primary transition duration-200 ease-linear"
          containerClassName=" flex items-center justify-end text-secondary text-sm"
          activeClassName="bg-primary hover:text-black rounded-full text-black w-10 h-10 flex items-center justify-center"
          pageClassName="px-5 py-2 hover:text-primary  "
          breakClassName="hover:text-primary transition duration-200 ease-linear"
          pageRangeDisplayed={5}
          pageCount={total_pages}
          previousLabel={<FiChevronLeft />}
          renderOnZeroPageCount={null}
        />
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const query = context?.query?.q as string;
  const page = Number(context?.query?.page);
  const {
    results: movies,
    page: currentPage,
    total_pages,
    total_results,
  } = await searchMovies({ query, page: page || 1 });

  return {
    props: {
      movies,
      page: currentPage,
      total_pages,
      total_results,
    },
  };
};

export default SearchedMoviesPage;
