import { IMAGEDB_URL, PLACEHOLDER_AVATAR_URL } from "@/constants";
import { IReview } from "@/interfaces/Review";
import moment from "moment";
import React, { useState } from "react";
import BoxImage from "../BoxImage";
import Rating from "../Rating";

interface Props {
  review: IReview;
}

const ReviewCard = ({ review }: Props) => {
  const [readMore, setReadMore] = useState(false);
  return (
    <div className="rounded-xl py-6 px-6 bg-neutral gap-6 flex flex-col ">
      <div className="flex gap-6  flex-col min-[300px]:flex-row items-center">
        <BoxImage
          className="bg-center bg-cover inline-block h-9 w-9 rounded-full ring-2 ring-white"
          url={
            review?.author_details?.avatar_path
              ? `${IMAGEDB_URL}/${review?.author_details?.avatar_path}`
              : PLACEHOLDER_AVATAR_URL
          }
        />
        <div className="flex flex-col">
          <p className="text-sm font-bold">{review.author}</p>
          <p className="text-xs text-secondary">
            {moment(review.updated_at).format("MMM DD, YYYY")}
          </p>
        </div>
        {!!review?.author_details?.rating ? (
          <div className="flex items-center gap-1 min-[300px]:ml-auto">
            <Rating rating={review?.author_details?.rating} />
          </div>
        ) : (
          <p className="flex items-center gap-1 ml-auto text-xs text-secondary">
            No rating
          </p>
        )}
      </div>

      <p className="text-xs text-secondary break-words">
        {review?.content?.length <= 400 || readMore
          ? review.content
          : review.content.slice(0, 400) + "..."}
      </p>

      {review?.content?.length > 400 && !readMore && (
        <p
          onClick={() => setReadMore(true)}
          className="mt-auto hover:opacity-90 transition duration-100 text-xs self-end text-primary cursor-pointer"
        >
          {"Read More"}
        </p>
      )}
    </div>
  );
};

export default ReviewCard;
