import { IMovie } from "@/interfaces/Movie";
import { IReview } from "@/interfaces/Review";
import MovieDetailsPage from "@/pages/movies/[id]";
import { render, screen } from "@testing-library/react";
const movie: IMovie = {
  id: 1,
  title: `Movie 1`,
  overview: `Movie 1 overview`,
  backdrop_path: `/movie1-backdrop.jpg`,
  poster_path: `/movie1-poster.jpg`,
  vote_average: 7.5,
  vote_count: 100,
  adult: false,
  genre_ids: [1, 2, 3],
  original_language: "en-us",
  original_title: `Movie 1`,
  popularity: 1,
  release_date: "12-12-2023",
  video: true,
  budget: 1,
  genres: [
    { id: 1, name: "Action" },
    { id: 2, name: "Drama" },
  ],
  homepage: "",
  revenue: 1,
  runtime: 1,
  status: "",
  tagline: "",
};
const reviews: IReview[] = [
  {
    id: "1",
    author: "John Doe",
    author_details: {
      avatar_path: "avatar.jpg",
      rating: 4,
      name: "John Doe",
      username: "johndoe",
    },
    url: "",
    content: `FULL SPOILER-FREE REVIEW @ https://www.firstshowing.net/2023/review-shazam-fury-of-the-gods-falls-into-the-typical-sequel-trap/ "Shazam! Fury of the Gods is *almost* saved by the incredibly charismatic, energetic cast, as well as by a truly thrilling third act. Unfortunately, the movie falls into the trap of exaggerating what worked in the original, excessively tackling every narrative aspect, and losing authenticity along the way. Way too long, boringly generic, and lacking a clearer direction, namely in the treatment of its family themes. Comedy is far from the efficiency of its predecessor. I recommend it to the vast majority of fans of the genre, who will certainly enjoy the lightness still present in this sequel." Rating: C`,
    updated_at: "2022-04-20T12:34:56.000Z",
    created_at: "2022-04-20T12:34:56.000Z",
  },
];

const videos = [{ id: 1, official: true, type: "Trailer", key: "abc123" }];
jest.mock("next/router", () => ({
  useRouter() {
    return {
      route: "/",
      pathname: "",
      query: "",
      asPath: "",
      push: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn(),
      },
      beforePopState: jest.fn(() => null),
      prefetch: jest.fn(() => null),
    };
  },
}));

describe("MovieDetailsPage", () => {
  beforeEach(async () => {
    const useRouter = jest.spyOn(require("next/router"), "useRouter");
    useRouter.mockImplementation(() => ({
      route: "/",
      pathname: "",
      query: "",
      asPath: "",
      push: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn(),
      },
      beforePopState: jest.fn(() => null),
      prefetch: jest.fn(() => null),
    }));
  });
  it("renders the movie details", () => {
    render(
      <MovieDetailsPage
        movie={movie}
        reviews={reviews}
        similar_movies={[]}
        videos={videos as any}
        itemStatus={false}
      />
    );
    expect(screen.getByText("Movie 1")).toBeInTheDocument();
    expect(screen.getByText("Movie 1 overview")).toBeInTheDocument();
    expect(screen.getByRole("movie-poster")).toBeInTheDocument();
    expect(
      screen.queryByRole("button", {
        name: /view movie details/i,
      })
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole("button", {
        name: /watch trailer/i,
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: /add to favorites/i,
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", {
        name: /reviews/i,
      })
    ).toBeInTheDocument();
    const slicedContent = reviews[0].content.slice(0, 400) + "...";
    expect(screen.getByText(slicedContent)).toBeInTheDocument();
  });
});
