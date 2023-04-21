import React from "react";

type Props = {};

const Custom404 = (props: Props) => {
  return (
    <div className="h-screen flex items-center justify-center text-center flex-col">
      <h1 className="font-bold text-3xl">404</h1>
      <p className="text-secondary font-bold">Page not found</p>
      <p className="text-sm text-secondary">
        {"The page you are looking for doesn't exist."}
      </p>
    </div>
  );
};

export default Custom404;
