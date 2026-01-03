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

        <div className="flex flex-col">
          <p className="text-lg">
            Transform PDFs into concise summaries with our AI
          </p>
          <p className="text-lg font-bold mt-2">
            Made with ❤️ love by Rahul Gautam
          </p>
        </div>
      </div>
      <RedSpace />
    </div>
  );
};

export default Footer;
