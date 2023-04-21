import PosterCard from "@/components/Poster/PosterCard";
import PosterList from "@/components/Poster/PosterList";
import { IMAGEDB_URL } from "@/constants";
import { fireEvent, render, screen } from "@testing-library/react";
describe("PosterCard", () => {
  const mockOnClick = jest.fn();
  const image_url = "test.png";
  it("should renders a list of poster cards", () => {
    const testOnClick = jest.fn();
    const movies = [
      {
        image_url: "",
        id: 1,
        caption: "test-1",
        onClick: testOnClick,
      },
      {
        image_url: "",
        id: 2,
        caption: "test-2",
        onClick: testOnClick,
      },
    ];
    render(
      <PosterList title="Test" scrollable>
        {movies.map(({ id, ...movie }) => (
          <PosterCard key={id} {...movie} />
        ))}
      </PosterList>
    );

    const title = screen.getByRole("heading", {
      name: /Test/i,
    });
    expect(title).toBeInTheDocument();

    const posterCardElements = screen.getAllByRole("img");
    expect(posterCardElements).toHaveLength(movies.length);
  });

  it("renders with required props", () => {
    render(<PosterCard image_url={""} />);
    // screen.getByAltText('img')
    const card = screen.getByRole("img", {
      name: "",
    });
    expect(card).toBeInTheDocument();
  });

  it("renders with provided props", () => {
    const { getByAltText } = render(
      <PosterCard
        image_url={image_url}
        onClick={mockOnClick}
        caption="Test Caption"
      />
    );
    const image = getByAltText("Test Caption");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", `${IMAGEDB_URL}/${image_url}`);
  });

  it("calls onClick handler when image is clicked", () => {
    const { getByAltText } = render(
      <PosterCard
        caption="Test Caption"
        image_url="test.png"
        onClick={mockOnClick}
      />
    );
    const image = getByAltText("Test Caption");
    fireEvent.click(image);
    expect(mockOnClick).toHaveBeenCalled();
  });
});
