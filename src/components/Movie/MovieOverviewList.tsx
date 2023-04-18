import { IMovieOverview } from "@/interfaces/Movie";
import { useRouter } from "next/router";
import PosterCard from "../Poster/PosterCard";
import PosterList from "../Poster/PosterList";

type Props = { title: string; movies: IMovieOverview[] };

const MovieOverviewList = ({ title = "Movies", movies }: Props) => {
  const router = useRouter();

  return (
    <div className="ml-4 lg:ml-16">
      <PosterList title={title}>
        {movies?.map(({ id, poster_path, title }) => {
          return (
            <PosterCard
              onClick={() => router.push(`/movies/${id}`)}
              key={id}
              image_url={poster_path}
              caption={title}
            />
          );
        })}
      </PosterList>
    </div>
  );
};

export default MovieOverviewList;
