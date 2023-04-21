import { useRouter } from "next/router";
import React from "react";

const NavbarTitle = () => {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push("/")}
      id="navbar-title"
      className="flex cursor-pointer"
    >
      <p className="text-lg lg:text-2xl font-bold text-primary">NEO</p>
      <p className="text-lg   lg:text-2xl font-bold ">MOVIE</p>
    </div>
  );
};

export default NavbarTitle;
