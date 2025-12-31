"use client";
import { PdfSummary } from "@/lib/db_cruds";
import { humanReadableTimeAgoConverter } from "@/lib/utils";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Book, Trash2 } from "lucide-react";
import AlertDialogBox from "../common/alertdialog";
import { useState } from "react";
import { toast } from "sonner";

const Summaritemslist = ({ arraydata }: { arraydata: PdfSummary[] }) => {
  const [openAlertDialogBox, setOpenAlertDialogBox] = useState(false);

  const onConfirmAction = () => {
    toast("Deleting...");
  };

  return (
    <div className="py-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
        {arraydata.map((singlesummary) => (
          <div
            key={singlesummary.id}
            className="m-4 p-4 sm:py-8 sm:p-4 border border-rose-950 
            rounded-2xl bg-rose-100 animation_popup_style"
          >
            <div className="flex flex-row items-center gap-4">
              <Book className="text-primary" size={40} />
              <div className="flex flex-col">
                <p className="text-lg sm:text-xl font-bold">
                  {singlesummary.title}
                </p>
                <p className="text-muted-foreground">
                  {humanReadableTimeAgoConverter(singlesummary.created_at)}
                </p>
              </div>
            </div>
            <p className="leading-relaxed line-clamp-5 pt-3">
              {singlesummary.summary_text}
            </p>

            <div className="flex flex-row justify-between items-center mt-6">
              <Badge variant={"default"} className="mt-4">
                {singlesummary.status}
              </Badge>
              <Button
                onClick={() => setOpenAlertDialogBox(true)}
                variant={"destructive"}
                className="rounded-full"
              >
                <Trash2 />
              </Button>

              {/* //todo you need to keep button component like this */}
              <AlertDialogBox
                title="Are you sure you want to delete this summary?"
                desc="This action can not be undone."
                open={openAlertDialogBox}
                onOpenChange={setOpenAlertDialogBox}
                onConfirm={onConfirmAction}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Summaritemslist;
