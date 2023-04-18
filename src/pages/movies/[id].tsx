import { getMovie } from "@/api/movies";
import Hero from "@/components/Hero";
import MovieOverviewList from "@/components/Movie/MovieOverviewList";
import ReviewList from "@/components/Reviews/ReviewList";
import { ICast } from "@/interfaces/Cast";
import { IImage } from "@/interfaces/Image";
import { IMovie, IMovieOverview } from "@/interfaces/Movie";
import { IReview } from "@/interfaces/Review";
import { GetServerSideProps } from "next";
interface Props {
  movie: IMovie;
  casts: ICast[];
  reviews: IReview[];
  posters: IImage[];
  similar_movies: IMovieOverview[];
  videos: any;
}
const MovieDetailsPage = ({
  movie,
  reviews,
  posters,
  similar_movies,
  videos,
}: Props) => {
  const { title, genres, overview, backdrop_path, vote_average, vote_count } =
    movie;
  return (
    <div className="flex flex-col gap-5 lg:gap-20 ">
      <Hero
        videos={videos}
        background_url={backdrop_path}
        title={title}
        genres={genres}
        posters={posters}
        average_rating={vote_average}
        review_count={vote_count}
        overview={overview}
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = Number(context?.query?.id);

  const movie = await getMovie({ path: `/${id}` });
  const { results: videos } = await getMovie({ path: `/${id}/videos` });

  const { results: similar_movies } = await getMovie({
    path: `/${id}/similar`,
  });

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
    },
  };
};

export default MovieDetailsPage;
