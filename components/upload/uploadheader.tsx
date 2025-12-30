import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, WandSparkles } from "lucide-react";
import React from "react";

const uploadheader = () => {
  return (
    <section className="px-4 pt-10 ">
      <div className="flex flex-col wrapper justify-center items-center">
        <Badge
          variant={"outline"}
          className="flex h-10 px-10 border-2px animate-pulse border-rose-950 text-rose-800"
        >
          <WandSparkles className="h-20 w-20 animate-pulse" />
          <span className="text-sm sm:text-lg">
            AI Powered Content Creation
          </span>
        </Badge>

        <h1
          className="flex flex-wrap break-after-auto justify-center text-center
        mt-10 text-4xl sm:text-5xl "
        >
          Start Uploading Your PDFs
        </h1>
        <p className="text-muted-foreground mt-6 text-xl sm:text-2xl text-center">
          Upload your PDF and let our AI do the magic!
        </p>
      </div>
    </section>
  );
};

export default uploadheader;
