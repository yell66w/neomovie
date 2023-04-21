import { getFavoriteMovies } from "@/api/favorites";
import Button from "@/components/Button";
import PosterCard from "@/components/Poster/PosterCard";
import PosterList from "@/components/Poster/PosterList";
import { APP_URL, MAX_COOKIE_AGE } from "@/constants";
import { IMovieOverview } from "@/interfaces/Movie";
import { getCookie } from "cookies-next";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

interface Props {
  movies: IMovieOverview[];
}

const FavoritesPage = ({ movies }: Props) => {
  const router = useRouter();
  return (
    <div className="flex lg:px-16 px-4 min-h-screen flex-col gap-10">
      <h1 className="">
        <span className="font-bold sm:text-xl xs:text-base text-sm">
          My Favorites
        </span>
      </h1>
      {!!movies?.length ? (
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
      ) : (
        <div className="w-full mt-48 items-center  flex flex-col gap-6">
          <h1 className="text-sm">
            Login to your TheMovieDB account to add your favorite movies
          </h1>
          <Button
            onClick={() => router.replace(`${APP_URL}/api/callback/auth`)}
          >
            Login
          </Button>
        </div>
      )}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
  query,
}) => {
  const session_id = getCookie("tmdb-session", {
    req,
    res,
    maxAge: MAX_COOKIE_AGE,
    path: "/",
  });
  const page = Number(query?.page);
  const { items: movies } = await getFavoriteMovies({
    page: page || 1,
    session_id,
  });

  return {
    props: {
      movies,
    },
  };
};

export default FavoritesPage;
