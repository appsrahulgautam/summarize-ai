import React from "react";
import Logo from "./logo";
import Menu from "./menu";
import RedSpace from "./redspace";

const Header = () => {
  return (
    <div className="flex flex-col">
      <RedSpace />
      <div
        className="flex flex-row justify-between items-center p-4 bg-linear-to-br
     from-rose-100 via-rose-50 to-rose-100"
      >
        <Logo />
        <Menu />
      </div>
    </div>
  );
};

export default Header;
