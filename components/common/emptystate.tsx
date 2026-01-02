import { LucideIcon } from "lucide-react";

export default function EmptyState({
  message,
  icon: Icon,
}: {
  message: string;
  icon?: LucideIcon;
}) {
  return (
    <div className="flex flex-col  mt-30 justify-center items-center">
      {Icon && <Icon className="size-12 text-rose-500 mx-auto mb-4" />}
      <p className="text-sm sm:text-lg text-muted-foreground">{message}</p>
    </div>
  );
}
