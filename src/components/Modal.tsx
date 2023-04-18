import React, { ReactNode, useState } from "react";

type Props = {
  children?: ReactNode;
  open: boolean;
  setOpen: (e: boolean) => void;
};

const Modal = ({ children, open, setOpen }: Props) => {
  return (
    <>
      {open ? (
        <>
          <div
            onClick={() => setOpen(false)}
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative my-6 items-center justify-center flex w-[1000px] h-[600px]">
              {children}
            </div>
          </div>
          <div className="opacity-90 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export default Modal;
