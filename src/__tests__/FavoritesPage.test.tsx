import FavoritesPage from "@/pages/favorites";
import { render, screen } from "@testing-library/react";
const movies = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  title: `Movie ${i + 1}`,
  overview: `Movie ${i + 1} overview`,
  backdrop_path: `/movie${i + 1}-backdrop.jpg`,
  poster_path: `/movie${i + 1}-poster.jpg`,
  vote_average: 7.5,
  vote_count: 100,
  adult: false,
  genre_ids: [1, 2, 3],
  original_language: "en-us",
  original_title: `Movie ${i + 1}`,
  popularity: 1,
  release_date: "12-12-2023",
  video: true,
}));
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
jest.mock("react-cookie", () => ({
  useCookies() {
    return [{ "tmdb-request-token": undefined }];
  },
}));

describe("FavoritesPage component", () => {
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
    jest
      .spyOn(require("react-cookie"), "useCookies")
      .mockImplementation(() => [{ "tmdb-request-token": undefined }]);
  });
  it("renders favorite movie list in the page", () => {
    jest
      .spyOn(require("react-cookie"), "useCookies")
      .mockImplementation(() => [{ "tmdb-request-token": "abc123" }]);
    render(<FavoritesPage movies={movies} />);
    const movieElements = screen.getAllByRole("img");
    expect(movieElements).toHaveLength(movies.length);
  });
  it("displays empty message when there are no favorite movies", () => {
    jest
      .spyOn(require("react-cookie"), "useCookies")
      .mockImplementation(() => [{ "tmdb-request-token": "abc123" }]);
    render(<FavoritesPage movies={[]} />);
    expect(
      screen.queryByRole("heading", {
        name: /login to your themoviedb account to add your favorite movies/i,
      })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", {
        name: /login/i,
      })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("heading", {
        name: /No favorite movies added./i,
      })
    ).toBeInTheDocument();
  });
  it("displays login message when user is not logged in tmdb", () => {
    render(<FavoritesPage movies={[]} />);
    expect(
      screen.queryByRole("heading", {
        name: /login to your themoviedb account to add your favorite movies/i,
      })
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("button", {
        name: /login/i,
      })
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", {
        name: /No favorite movies added./i,
      })
    ).not.toBeInTheDocument();
  });
});
