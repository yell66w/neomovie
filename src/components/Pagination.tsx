import React from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import ReactPaginate from "react-paginate";

interface Props {
  onPageChange: (e: any) => void;
  pageCount: number;
}

const Pagination = ({ onPageChange, pageCount }: Props) => {
  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel={<FiChevronRight />}
      onPageChange={onPageChange}
      previousClassName="md:mr-4 hover:text-primary transition duration-200 ease-linear"
      nextClassName="md:ml-4  hover:text-primary transition duration-200 ease-linear"
      containerClassName=" flex items-center justify-end text-secondary text-sm"
      activeClassName="bg-primary hover:text-black rounded-full text-black w-7 h-7 md:w-10 md:h-10 flex items-center justify-center focus:text-black"
      pageClassName="md:px-5 md:py-2 px-2 py-1 hover:text-primary text-[0.8em] md:text-[1em] focus:text-black"
      breakClassName="hover:text-primary transition duration-200 ease-linear px-2 md:px-4"
      pageRangeDisplayed={1}
      pageCount={pageCount}
      previousLabel={<FiChevronLeft />}
      renderOnZeroPageCount={null}
    />
  );
};

export default Pagination;
