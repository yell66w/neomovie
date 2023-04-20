import Button from "@/components/Button";
import { useRouter } from "next/router";
import React from "react";
import { BsArrowRight } from "react-icons/bs";

type Props = {
  navigateTo?: any;
};

const ViewMovieDetailsButton = ({ navigateTo }: Props) => {
  const router = useRouter();

  return (
    <>
      {navigateTo && (
        <Button
          variant="secondary"
          onClick={() => router.push(`/${navigateTo}`)}
          endIcon={<BsArrowRight size={16} />}
        >
          View Movie Details
        </Button>
      )}
    </>
  );
};

export default ViewMovieDetailsButton;
