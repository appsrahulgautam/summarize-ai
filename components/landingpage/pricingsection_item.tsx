"use client";
import { cn } from "@/lib/utils";
import { Check, LucideIcon } from "lucide-react";
import PayButton from "../stripepaymentbuttons/paybutton";

interface ItemsProp {
  title: string;
  desc: string;
  icon: LucideIcon;
  price: string;
  summary: string[];
}

const PricingSectionItem = async ({
  title,
  desc,
  icon: Icon,
  price,
  summary,
}: ItemsProp) => {
  return (
    <div
      className={cn(
        "flex flex-col items-start px-10 py-20 rounded-3xl hover:border hover:border-rose-700 animation_popup_style hover:bg-rose-300",
        title == "Pro" && "border-2 border-rose-900"
      )}
    >
      <Icon size={60} className="text-rose-500" />
      <p className="text-lg lg:text-2xl font-semibold text-center mt-6">
        {title}
      </p>
      <p className="text-muted-foreground text-center mt-2">{desc}</p>
      <p className="text-3xl font-medium my-4">
        {price} <span className="text-lg font-normal">per month</span>
      </p>
      {summary.map((item, keyloop) => (
        <p
          key={keyloop}
          className="flex text-muted-foreground py-5 flex-nowrap gap-2"
        >
          <Check /> {item}
        </p>
      ))}
      {title == "Basic" && <PayButton plan="basic" />}
      {title == "Pro" && <PayButton plan="pro" />}
    </div>
  );
};
export default PricingSectionItem;
