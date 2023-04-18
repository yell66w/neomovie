import { useRouter } from "next/router";
import { FiMenu } from "react-icons/fi";
import LinkItem from "../LinkItem";
import Searchbar from "../Searchbar";
const Navbar = () => {
  const router = useRouter();
  //Refactor
  return (
    <header
      style={{
        background:
          "linear-gradient(180deg, #000000 0%, rgba(0, 0, 0, 0) 100%)",
      }}
      className={`${
        router.pathname === "/movies/search" ? "" : "absolute"
      } w-full flex text-2xl pb-10 pt-4 px-4 lg:px-16  lg:items-center flex-col lg:flex-row z-10`}
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
      <Searchbar />
    </header>
  );
};

export default Navbar;
