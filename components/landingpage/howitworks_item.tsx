import { LucideIcon } from "lucide-react";
import React from "react";

interface ItemsProp {
  title: string;
  desc: string;
  icon: LucideIcon;
}

const HowItWorksItem = ({ title, desc, icon: Icon }: ItemsProp) => {
  return (
    <div
      className="flex flex-col justify-center items-center p-20 rounded-3xl bg-rose-200
    hover:border hover:border-rose-700 animation_popup_style hover:bg-rose-400"
    >
      <Icon size={60} className="text-rose-500" />
      <p className="text-lg lg:text-2xl font-semibold text-center mt-6">
        {title}
      </p>
      <p className="text-muted-foreground text-center mt-2">{desc}</p>
    </div>
  );
};

export default HowItWorksItem;
