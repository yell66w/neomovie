import Star from "@/components/Star";
import React from "react";

type Props = {
  rating: number;
  count?: number;
};

const Rating = ({ rating, count }: Props) => {
  return (
    <>
      {!!rating && !!count && (
        <div className="flex items-center gap-1 mr-6">
          <Star />
          <p className="text-base ">
            {Number(rating).toFixed(1)}
            {count && <span className="text-xs ml-1">| {count}</span>}
          </p>
        </div>
      )}
    </>
  );
};

export default Rating;
