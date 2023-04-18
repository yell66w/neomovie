import { IMAGEDB_URL, PLACEHOLDER_AVATAR_URL } from "@/constants";
import { IReview } from "@/interfaces/Review";
import moment from "moment";
import React from "react";

interface Props {
  review: IReview;
}

const ReviewCard = ({ review }: Props) => {
  return (
    <div className=" py-4 border-b border-neutral gap-6 flex flex-col lg:w-1/2 lg:px-10">
      <div className="flex gap-6 items-center">
        <div
          style={{
            backgroundImage: `url(${
              review?.author_details?.avatar_path
                ? `${IMAGEDB_URL}/${review?.author_details?.avatar_path}`
                : PLACEHOLDER_AVATAR_URL
            })`,
          }}
          key={review.id}
          className="bg-center bg-cover  inline-block h-9 w-9 rounded-full ring-2 ring-white"
        />
        <div className="flex flex-col">
          <p className="text-sm font-bold">{review.author}</p>
          <p className="text-xs text-secondary">
            {moment(review.updated_at).format("MMM DD, YYYY")}
          </p>
        </div>
        {!!review?.author_details?.rating ? (
          <div className="flex items-center gap-1 ml-auto">
            <svg
              aria-hidden="true"
              className="w-5 h-5 text-primary"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Star</title>
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
            <p className="text-sm">{review?.author_details?.rating}/10</p>
          </div>
        ) : (
          <p className="flex items-center gap-1 ml-auto text-xs text-secondary">
            No rating
          </p>
        )}
      </div>

      <p className="text-xs text-secondary">
        {review?.content?.length > 400
          ? review.content.slice(0, 400) + "..."
          : review.content}
      </p>
      {review?.content?.length > 400 && (
        <p className="text-xs self-end text-primary cursor-pointer">
          Read More
        </p>
      )}
    </div>
  );
};

export default ReviewCard;
