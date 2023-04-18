import React from "react";
import ReviewCard from "./ReviewCard";
import { IReview } from "@/interfaces/Review";
interface Props {
  reviews: IReview[];
}

const ReviewList = ({ reviews }: Props) => {
  return (
    <div className="flex flex-col gap-3 px-4 lg:px-16 ">
      <h4 className="font-bold lg:px-10 mb-4">REVIEWS</h4>
      <div className="flex-wrap flex">
        {reviews?.map((review) => {
          return <ReviewCard key={review.id} review={review} />;
        })}
      </div>
    </div>
  );
};

export default ReviewList;
