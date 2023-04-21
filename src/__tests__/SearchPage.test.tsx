import SearchedMoviesPage from "@/pages/movies/search";
import { fireEvent, render, screen } from "@testing-library/react";
import { useRouter } from "next/router";

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
const length = movies.length;
const total_pages = 3;

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
describe("SearchedMoviesPage", () => {
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
  it("renders a list of movies", () => {
    render(<SearchedMoviesPage movies={movies} total_pages={total_pages} />);
    const movieElements = screen.getAllByRole("img");
    expect(movieElements).toHaveLength(length);
  });
  it("renders a pagination component", () => {
    render(<SearchedMoviesPage movies={movies} total_pages={total_pages} />);
    const paginationElement = screen.getByRole("navigation", {
      name: /pagination/i,
    });
    expect(paginationElement).toBeInTheDocument();
  });
  it("calls router.replace with the correct parameters when the page is changed", () => {
    const mockRouter = {
      query: { q: "batman" },
      replace: jest.fn(),
    };
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    render(<SearchedMoviesPage movies={movies} total_pages={5} />);
    const paginationElement = screen.getByRole("navigation", {
      name: /pagination/i,
    });
    expect(paginationElement).toBeInTheDocument();
    fireEvent.click(
      screen.getByRole("button", {
        name: /page 2/i,
      })
    );
    expect(mockRouter.replace).toHaveBeenCalledWith(
      "/movies/search?q=batman&page=2"
    );
  });
});
