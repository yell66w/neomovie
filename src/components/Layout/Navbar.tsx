import { FiMenu, FiSearch } from "react-icons/fi";
import Button from "../Button";
import LinkItem from "../LinkItem";
const Navbar = () => {
  //Refactor
  return (
    <header
      style={{
        background:
          "linear-gradient(180deg, #000000 0%, rgba(0, 0, 0, 0) 100%)",
      }}
      className="absolute w-full flex text-2xl pb-10 pt-4 px-4 lg:px-16  lg:items-center flex-col lg:flex-row z-10"
    >
      <div id="navbar-title" className="flex">
        <p className="font-bold text-primary">NEO</p>
        <p className="font-bold ">MOVIE</p>
      </div>
      <div className="ml-16">
        <ul id="navbar-links" className="gap-6 hidden lg:flex text-center ">
          <LinkItem title="Home" href="/" />
          <LinkItem title="Discover" href="/discover" />
          <LinkItem title="Genre" href="/genre" />
          <LinkItem title="Favorites" href="/favorites" />
        </ul>
        <FiMenu className="lg:hidden absolute right-6 top-5" />
      </div>
      <div
        id="search-bar"
        className="hidden lg:flex ml-auto gap-2 relative  self-center lg:mt-0 mt-5 w-full lg:w-3/12"
      >
        <input
          placeholder="Search movies..."
          className="placeholder-white w-full bg-transparent border-white border-b pl-9 pr-4 py-4 h-10  text-white text-xs outline-none"
        />
        <FiSearch className="absolute top-2.5 left-2 text-lg" />
        {/* <Button className="hidden lg:block">Search</Button> */}
      </div>
    </header>
  );
};

export default Navbar;
