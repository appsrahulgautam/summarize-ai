import React from "react";
import Logo from "./logo";
import Menu from "./menu";
import RedSpace from "./redspace";

const Footer = () => {
  return (
    <div className="flex flex-col">
      <div
        className="flex flex-row justify-between items-center px-10 py-20 bg-linear-to-br
     from-rose-100 via-rose-50 to-rose-100"
      >
        <Logo />
      </div>
      <RedSpace />
    </div>
  );
};

export default Footer;
