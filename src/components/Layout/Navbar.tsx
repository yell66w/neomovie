import { FiMenu, FiSearch } from "react-icons/fi";
import Button from "../Button";
import LinkItem from "../LinkItem";
const Navbar = () => {
  //Refactor
  return (
    <header className="flex text-2xl pt-4 px-4 lg:px-16 lg:justify-between lg:items-center flex-col lg:flex-row">
      <div id="navbar-title" className="flex">
        <p className="font-bold text-primary">NEO</p>
        <p className="font-bold ">MOVIE</p>
      </div>
      <>
        <ul id="navbar-links" className="gap-6 hidden lg:flex text-center ">
          <LinkItem title="Home" href="/" />
          <LinkItem title="Discover" href="/movie" />
          <LinkItem title="Favorites" href="/favorites" />
        </ul>
        <FiMenu className="lg:hidden absolute right-6" />
      </>
      <div
        id="search-bar"
        className="gap-2 relative flex self-center lg:mt-0 mt-5 w-full lg:w-3/12"
      >
        <input
          placeholder="Search movies..."
          className="w-full bg-neutral pl-9 pr-4 py-4 h-10 rounded-md text-white text-xs outline-none"
        />
        <FiSearch className="absolute top-2.5 left-2 text-lg" />
        <Button className="hidden lg:block">Search</Button>
      </div>
    </header>
  );
};

export default Navbar;
