import { IMAGEDB_URL } from "@/constants";
import { Movie } from "@/interfaces/Movie";
import ScrollContainer from "react-indiana-drag-scroll";
import MovieOverviewCard from "./MovieOverviewCard";

type Props = { title: string; movies: Movie[] };

const MovieOverviewList = ({ title = "Movies", movies }: Props) => {
  return (
    <section className="mr-4 lg:mr-16 flex flex-col gap-6">
      <h1 className="ml-4 lg:ml-16 text-lg lg:text-2xl font-bold">{title}</h1>
      <ScrollContainer className="w-full h-30 md:h-60 flex gap-5 overflow-x-clip">
        {movies.map(({ id, backdrop_path, title }) => {
          return (
            <MovieOverviewCard
              key={id}
              backdrop_path={backdrop_path}
              title={title}
            />
          );
        })}
      </ScrollContainer>
    </section>
  );
};

export default MovieOverviewList;
