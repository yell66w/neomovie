import React from "react";
import ReviewCard from "./ReviewCard";
import { IReview } from "@/interfaces/Review";
interface Props {
  reviews: IReview[];
}

const ReviewList = ({ reviews }: Props) => {
  return (
    <div className="flex flex-col gap-3 px-4 lg:px-16 ">
      <h4 className="font-bold mb-4">REVIEWS</h4>
      <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2  gap-10">
        {reviews?.map((review) => {
          return <ReviewCard key={review.id} review={review} />;
        })}
      </div>
    </div>
  );
};

export default ReviewList;
