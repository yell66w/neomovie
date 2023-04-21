import MovieCarousel from "@/components/Movie/MovieCarousel";
import { fireEvent, render, screen } from "@testing-library/react";
const mockMovies = Array.from({ length: 2 }, (_, i) => ({
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

describe("MovieCarousel", () => {
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
  test("renders the first movie in the carousel", () => {
    render(<MovieCarousel movies={mockMovies} />);
    expect(screen.getByText("Movie 1")).toBeInTheDocument();
    expect(screen.getByText("Movie 1 overview")).toBeInTheDocument();
    expect(screen.getByText("View Movie Details")).toBeInTheDocument();
    expect(screen.getByText(/7\.5/i)).toBeInTheDocument();
    expect(screen.getByText(/\| 100/i)).toBeInTheDocument();
    const addToFavoritesButton = screen.queryByRole("button", {
      name: /add to favorites/i,
    });
    expect(addToFavoritesButton).not.toBeInTheDocument();
  });
  test("clicking the left and right arrow button goes to the corresponding slide", () => {
    render(<MovieCarousel movies={mockMovies} />);
    const rightArrow = screen.getByRole("right-arrow");
    const leftArrow = screen.getByRole("left-arrow");
    fireEvent.click(rightArrow);
    expect(screen.getByText("Movie 2")).toBeInTheDocument();
    expect(screen.getByText("Movie 2 overview")).toBeInTheDocument();

    fireEvent.click(leftArrow);
    expect(screen.getByText("Movie 1")).toBeInTheDocument();
    expect(screen.getByText("Movie 1 overview")).toBeInTheDocument();
  });
});
