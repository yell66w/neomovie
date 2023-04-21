import Navbar from "@/components/Layout/Navbar";
import React from "react";
import Footer from "./Footer";
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
