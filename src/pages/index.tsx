import { getMovies } from "@/api/movies";
import MovieCarousel from "@/components/Movie/MovieCarousel";
import MovieOverviewList from "@/components/Movie/MovieOverviewList";
import { IMovieOverview } from "@/interfaces/Movie";

interface Props {
  nowPlaying: IMovieOverview[];
  topRated: IMovieOverview[];
  upcoming: IMovieOverview[];
  popular: IMovieOverview[];
}

export default function Home({
  nowPlaying,
  topRated,
  upcoming,
  popular,
}: Props) {
  return (
    <main>
      <MovieCarousel movies={nowPlaying} />
      <div className="flex flex-col gap-16 mt-16">
        <MovieOverviewList title="Popular" movies={popular} />
        <MovieOverviewList title="Top Rated" movies={topRated} />
        <MovieOverviewList title="Upcoming" movies={upcoming} />
      </div>
    </main>
  );
}

export async function getServerSideProps() {
  const nowPlaying = await getMovies({ path: "/now_playing" });
  const topRated = await getMovies({ path: "/top_rated" });
  const upcoming = await getMovies({ path: "/upcoming" });
  const popular = await getMovies({ path: "/popular" });
  const limitedNowPlaying = nowPlaying.slice(0, 5);

  return {
    props: {
      nowPlaying: limitedNowPlaying,
      topRated,
      upcoming,
      popular,
    },
  };
}
