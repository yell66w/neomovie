import { checkItemStatus } from "@/api/favorites";
import { getMovie } from "@/api/movies";
import Genres from "@/components/Genres";
import MovieBanner from "@/components/Movie/MovieBanner";
import AddToFavoriteButton from "@/components/Movie/MovieBanner/AddToFavoriteButton";
import Rating from "@/components/Movie/MovieBanner/Rating";
import Trailer from "@/components/Movie/MovieBanner/Trailer";
import MovieOverviewList from "@/components/Movie/MovieOverviewList";
import ReviewList from "@/components/Reviews/ReviewList";
import { MAX_COOKIE_AGE } from "@/constants";
import { ICast } from "@/interfaces/Cast";
import { IImage } from "@/interfaces/Image";
import { IMovie, IMovieOverview } from "@/interfaces/Movie";
import { IReview } from "@/interfaces/Review";
import { getCookie } from "cookies-next";
import { GetServerSideProps } from "next";

interface Props {
  movie: IMovie;
  casts: ICast[];
  reviews: IReview[];
  posters: IImage[];
  similar_movies: IMovieOverview[];
  videos: any;
  itemStatus: boolean;
}
const MovieDetailsPage = ({
  movie,
  reviews,
  posters,
  similar_movies,
  videos,
  itemStatus,
}: Props) => {
  const { title, genres, overview, backdrop_path, vote_average, vote_count } =
    movie;
  const officialTrailer = videos?.find(
    (video: any) => video.official && video.type === "Trailer"
  );
  return (
    <div className="flex flex-col gap-5 lg:gap-20 ">
      <MovieBanner
        background_url={backdrop_path}
        title={title}
        posters={posters}
        overview={overview}
        subtitle={
          <>
            <Rating rating={vote_average} count={vote_count} />
            <Genres genres={genres} />
          </>
        }
        actions={
          <>
            <AddToFavoriteButton itemStatus={itemStatus} movieId={movie.id} />
            <Trailer officialTrailer={officialTrailer} />
          </>
        }
      />
      <div className="flex flex-col gap-20">
        {!!similar_movies.length && (
          <MovieOverviewList title="Similar Movies" movies={similar_movies} />
        )}
        {!!reviews.length && <ReviewList reviews={reviews} />}
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
  query,
}) => {
  const id = Number(query?.id);
  const session_id = getCookie("tmdb-session", {
    req,
    res,
    maxAge: MAX_COOKIE_AGE,
    path: "/",
  });

  const movie = await getMovie({ path: `/${id}` });
  const { results: videos } = await getMovie({ path: `/${id}/videos` });

  const { results: similar_movies } = await getMovie({
    path: `/${id}/similar`,
  });

  const itemStatus = await checkItemStatus({ session_id, movie_id: id });

  const { results: reviews } = await getMovie({ path: `/${id}/reviews` });

  const images = await getMovie({ path: `/${id}/images` });

  const posters = images?.posters
    ?.sort((a: any, b: any) => {
      return a.vote_average - b.vote_average;
    })
    .slice(0, 10);

  return {
    props: {
      movie,
      posters,
      reviews,
      similar_movies,
      videos,
      itemStatus,
    },
  };
};

export default MovieDetailsPage;
