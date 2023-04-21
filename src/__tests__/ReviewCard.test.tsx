import ReviewCard from "@/components/Reviews/ReviewCard";
import { fireEvent, render, screen } from "@testing-library/react";
import moment from "moment";

const review = {
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
};
const slicedContent = review.content.slice(0, 400) + "...";

describe("ReviewCard", () => {
  it("renders the review card with the correct content", () => {
    render(<ReviewCard review={review} />);
    expect(screen.getByText(review.author)).toBeInTheDocument();
    expect(
      screen.getByText(moment(review.updated_at).format("MMM DD, YYYY"))
    ).toBeInTheDocument();
    expect(screen.getByText(slicedContent)).toBeInTheDocument();
    const fullContent = screen.queryByText(review.content);
    expect(fullContent).not.toBeInTheDocument();
    expect(screen.getByText(/read more/i)).toBeInTheDocument();
    expect(screen.getByText(/4\.0/i)).toBeInTheDocument();
  });

  it("expands the review content when the 'Read More' button is clicked", () => {
    render(<ReviewCard review={review} />);
    const readMoreButton = screen.getByText(/read more/i);
    expect(readMoreButton).toBeInTheDocument();
    expect(screen.getByText(slicedContent)).toBeInTheDocument();
    fireEvent.click(readMoreButton);
    expect(screen.getByText(review.content)).toBeInTheDocument();
    expect(readMoreButton).not.toBeInTheDocument();
  });
});
