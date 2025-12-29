import React from "react";
import { Badge } from "../ui/badge";
import {
  ArrowBigLeft,
  ArrowBigRight,
  ArrowRight,
  Wand,
  Wand2,
  WandSparkles,
} from "lucide-react";
import { Button } from "../ui/button";

const Hero = () => {
  return (
    <section className="px-4 pt-10 ">
      <div className="flex flex-col wrapper justify-center items-center">
        <Badge
          variant={"outline"}
          className="flex h-10 px-10 border-2px animate-pulse border-rose-950 text-rose-800"
        >
          <WandSparkles className="h-20 w-20 animate-pulse" />
          <span className="text-sm sm:text-lg">Powered by AI</span>
        </Badge>

        <h1
          className="flex flex-wrap break-after-auto justify-center text-center
        mt-10 text-6xl sm:text-7xl "
        >
          Transform PDFs into
          <span className="font-black bg-linear-to-r from-rose-950 via-rose-400 to-slate-950 bg-clip-text text-transparent">
            concise summaries
          </span>{" "}
        </h1>
        <p className="text-muted-foreground mt-6 text-xl sm:text-2xl text-center">
          Get a beautiful summary reel of the document in seconds.
        </p>

        <Button
          variant={"default"}
          className="h-10 sm:h-15 mt-10 bg-linear-to-r text-sm sm:text-xl shadow-2xl animate-gradient-x
         from-rose-500 to-rose-950 animation_popup_style rounded-full hover:to-rose-500 hover:from-rose-950"
        >
          <span className=" flex flex-row px-6 items-center gap-4">
            Try Summarize AI <ArrowRight />
          </span>
        </Button>
      </div>
    </section>
  );
};

export default Hero;
