import { checkItemStatus } from "@/api/favorites";
import { getMovie } from "@/api/movies";
import BoxImage from "@/components/BoxImage";
import Genres from "@/components/Genres";
import MovieBanner from "@/components/Movie/MovieBanner";
import AddToFavoriteButton from "@/components/Movie/MovieBanner/AddToFavoriteButton";
import Rating from "@/components/Movie/MovieBanner/Rating";
import Trailer from "@/components/Movie/MovieBanner/Trailer";
import MovieOverviewList from "@/components/Movie/MovieOverviewList";
import ReviewList from "@/components/Reviews/ReviewList";
import {
  IMAGEDB_URL,
  MAX_COOKIE_AGE,
  PLACEHOLDER_BACKGROUND_IMAGE,
} from "@/constants";
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
  similar_movies: IMovieOverview[];
  videos: any;
  itemStatus: boolean;
}
const MovieDetailsPage = ({
  movie,
  reviews,
  similar_movies,
  videos,
  itemStatus,
}: Props) => {
  const { title, genres, overview, backdrop_path, vote_average, vote_count } =
    movie;
  const officialTrailer = videos?.find(
    (video: any) => video.official && video.type === "Trailer"
  );
  const image_url = movie.poster_path;
  return (
    <div className="flex flex-col gap-5 lg:gap-20 ">
      <MovieBanner
        background_url={backdrop_path}
        title={title}
        poster={
          <BoxImage
            url={
              image_url
                ? `${IMAGEDB_URL}/${image_url}`
                : PLACEHOLDER_BACKGROUND_IMAGE
            }
            className="shadow-2xl shadow-black h-96 w-full xxs:h-[600px] sm:w-[200px] sm:h-[300px]  lg:h-[650px] lg:w-[450px] bg-no-repeat  bg-center bg-cover duration-500 rounded-xl"
          />
        }
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

  return {
    props: {
      movie,
      reviews,
      similar_movies,
      videos,
      itemStatus,
    },
  };
};

export default MovieDetailsPage;
