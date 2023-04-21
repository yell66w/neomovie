import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
interface Props {
  children: React.ReactNode;
}
export default function Layout({ children }: Props) {
  return (
    <div>
      <Navbar />
      <main className="mb-20">{children}</main>
      <Footer />
    </div>
  );
}
