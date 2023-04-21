import { searchMovies } from "@/api/movies";
import Pagination from "@/components/Pagination";
import PosterCard from "@/components/Poster/PosterCard";
import PosterList from "@/components/Poster/PosterList";
import { IMovieOverview } from "@/interfaces/Movie";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

interface Props {
  movies: IMovieOverview[];
  total_pages: number;
}

const SearchedMoviesPage = ({ movies, total_pages }: Props) => {
  const router = useRouter();
  const { q: query } = router.query;
  return (
    <div className="flex lg:px-16 px-4 min-h-screen flex-col gap-10">
      <h1 className="sm:text-lg xs:text-sm text-xs">
        Results for:{" "}
        <span className="font-bold sm:text-xl xs:text-base text-sm ">
          {query}
        </span>
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
        <Pagination
          onPageChange={(event) => {
            router.replace(
              `/movies/search?q=${query}&page=${event.selected + 1}`
            );
          }}
          pageCount={total_pages}
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
