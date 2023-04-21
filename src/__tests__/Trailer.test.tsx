import Trailer from "@/components/Movie/MovieBanner/Trailer";
import { fireEvent, render } from "@testing-library/react";

describe("Trailer", () => {
  const trailerKey = "abc123";

  it("does not render without officialTrailer", () => {
    const { queryByText } = render(<Trailer />);
    expect(queryByText("Watch Trailer")).toBeNull();
  });

  it("renders with officialTrailer", () => {
    const { getByText } = render(<Trailer trailerKey={trailerKey} />);
    expect(getByText("Watch Trailer")).toBeInTheDocument();
  });

  it("opens and closes trailer modal", () => {
    const { getByText, getByTitle, queryByTitle } = render(
      <Trailer trailerKey={trailerKey} />
    );
    const button = getByText("Watch Trailer");
    fireEvent.click(button);
    const iframe = getByTitle("YouTube video player");
    expect(iframe).toBeInTheDocument();
    fireEvent.click(iframe);
    expect(queryByTitle("YouTube video player")).not.toBeInTheDocument();
  });
});
