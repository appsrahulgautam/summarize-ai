"use client";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

const Logo = () => {
  return (
    <div className="flex flex-row items-center gap-2  sm:gap-4">
      <div className="relative w-10 h-10 sm:w-13 sm:h-13">
        <Link href={"/"}>
          <Image src={"/images/logo.png"} alt="Summarize AI Logo" fill />
        </Link>
      </div>
      <p className="font-outfit text-lg sm:text-xl lg:text-2xl font-semibold tracking-tight">
        Summarize AI
      </p>
    </div>
  );
};

export default Logo;
