import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import NavbarTitle from "./NavbarTitle";
import LinkItem from "@/components/LinkItem";
import Searchbar from "@/components/Searchbar";
const NavigationList = () => {
  const linkItems = [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Favorites",
      href: "/favorites",
    },
  ];
  const [showDrawer, setShowDrawer] = useState(false);
  const openDrawer = () => {
    setShowDrawer(true);
  };
  const closeDrawer = () => {
    setShowDrawer(false);
  };
  return (
    <>
      <div className="ml-16">
        <ul id="navbar-links" className="gap-6 hidden lg:flex text-center ">
          {linkItems.map(({ title, href }) => (
            <LinkItem key={href} title={title} href={href} />
          ))}
        </ul>
        <FiMenu
          onClick={openDrawer}
          className="lg:hidden absolute right-6 top-5 cursor-pointer text-xl"
        />
      </div>
      <div
        className={`${
          showDrawer ? "flex" : "hidden"
        }   lg:hidden bg-neutral w-full h-screen fixed top-0 left-0 flex-col p-6 gap-3`}
      >
        <div className="flex items-center justify-between ">
          <NavbarTitle />
          <FiX onClick={closeDrawer} className="text-xl cursor-pointer" />
        </div>
        <Searchbar onEnter={closeDrawer} />
        <div className="flex flex-col mt-3 gap-3">
          {linkItems.map(({ title, href }) => (
            <LinkItem
              onClick={closeDrawer}
              key={href}
              title={title}
              href={href}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default NavigationList;
