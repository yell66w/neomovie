import { useRouter } from "next/router";
import Searchbar from "../Searchbar";
import NavbarTitle from "./NavbarTitle";
import NavigationList from "./NavigationList";

const Navbar = () => {
  const router = useRouter();
  const excludedFromAbsoluteRoutes = ["/movies/search", "/favorites"];
  return (
    <header
      style={{
        background:
          "linear-gradient(180deg, #000000 0%, rgba(0, 0, 0, 0) 100%)",
      }}
      className={`${
        excludedFromAbsoluteRoutes.includes(router.pathname) ? "" : "absolute"
      } w-full flex text-2xl pb-10 pt-4 px-4 lg:px-16  lg:items-center flex-col lg:flex-row z-10`}
    >
      <NavbarTitle />
      <NavigationList />
      <div className="hidden lg:flex w-full">
        <Searchbar />
      </div>
    </header>
  );
};

export default Navbar;
