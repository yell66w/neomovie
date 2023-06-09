import { useRouter } from "next/router";
import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";

interface Props {
  onEnter?: () => void;
}
const Searchbar = ({ onEnter }: Props) => {
  const [query, setQuery] = useState<string>("");
  const router = useRouter();
  const onSearch = (e: any) => {
    e.preventDefault();
    router.replace(`/movies/search?q=${query}`);
    if (onEnter) onEnter();
  };
  return (
    <form
      onSubmit={onSearch}
      id="search-bar"
      className="lg:flex ml-auto gap-2 relative  self-center lg:mt-0  mt-3 w-full lg:w-3/12"
    >
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search movies..."
        className="placeholder-white w-full bg-transparent border-white border-b pl-9 pr-4 py-4 h-10  text-white text-xs outline-none"
      />
      <FiSearch className="absolute top-2.5 left-2 text-lg" />
    </form>
  );
};

export default Searchbar;
