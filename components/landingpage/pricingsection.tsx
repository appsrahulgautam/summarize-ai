"use client";
import { Gem, Trophy } from "lucide-react";
import React from "react";
import PricingSectionItem from "./pricingsection_item";

const Pricingsection = () => {
  const data = [
    {
      icon: Trophy,
      title: "Basic",
      desc: "Perfect for occasional use",
      price: "$9",
      summary: [
        "5 PDF summaries per month",
        "Standard processing speed",
        "Email support",
        "Unlimited support",
      ],
    },
    {
      icon: Gem,
      title: "Pro",
      desc: "For professionals and teams",
      price: "$19",
      summary: [
        "Unlimited PDF summaries",
        "Priority processing",
        "24/7 priority support",
        "Markdown Export",
      ],
    },
  ];

  return (
    <div className="flex flex-col items-center wrapper  px-10 sm:px-30">
      <h2 className="font-bold text-red-600">Pricing</h2>
      <h2 className="text-center text-wrap mt-4">
        We have a genuine pricing. No matter the size of the PDF you upload.
      </h2>

      <div className="grid grid-col-1 lg:grid-cols-2 gap-6 mt-10">
        {data.map((item, keyloop) => (
          <PricingSectionItem
            key={keyloop}
            title={item.title}
            desc={item.desc}
            icon={item.icon}
            price={item.price}
            summary={item.summary}
          />
        ))}
      </div>
    </div>
  );
};

export default Pricingsection;
