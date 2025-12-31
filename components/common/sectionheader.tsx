import { ExternalLink, LucideIcon } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

interface SectionHeaderProps {
  title: string;
  description: string;
  icon: LucideIcon;
  showViewAll: boolean;
}

export default function SectionHeader({
  title,
  icon: Icon,
  description,
  showViewAll,
}: SectionHeaderProps) {
  return (
    <div className="flex flex-col font-outline">
      <div className="flex flex-row justify-start gap-2 items-center">
        <Icon className="text-primary size-6" />
        <h2 className="font-bold text-foreground text-3xl">{title}</h2>
      </div>
      <div className="flex flex-row mt-3 justify-between">
        <p className="text-[18px]">{description}</p>
        {showViewAll && (
          <Button className="rounded-none border-black" variant={"outline"}>
            <Link
              href={"/featured"}
              className="flex flex-nowrap justify-center items-center gap-2"
            >
              View all <ExternalLink />
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
}
