"use client";
import { deletePdfSummaryById, PdfSummary } from "@/lib/db_cruds";
import { humanReadableTimeAgoConverter } from "@/lib/utils";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Book, Package, Trash2 } from "lucide-react";
import AlertDialogBox from "../common/alertdialog";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";
import EmptyState from "../common/emptystate";

const Summaritemslist = ({ arraydata }: { arraydata: PdfSummary[] }) => {
  const router = useRouter();
  const [filetodelete, setFiletodelete] = useState<PdfSummary>();
  const [openAlertDialogBox, setOpenAlertDialogBox] = useState(false);

  const onConfirmAction = async () => {
    toast("Deleting...");
    const { success } = await deletePdfSummaryById(
      filetodelete?.id as string,
      filetodelete?.user_id as string
    );
    if (success == true) {
      toast.success("Summary deleted successfully");
      router.refresh();
    } else {
      toast.error("Retry deleting summary");
    }
  };

  return (
    <div className="py-10">
      {/* //TODO HERS THE LAYOUT FOR NO SUMMARY FOUND */}
      {arraydata.length == 0 && (
        <EmptyState message="There are no uploads done by you" icon={Package} />
      )}
      {/* //TODO IF SUMMARIES FOUND */}

      {arraydata.length > 0 &&
        arraydata.map((singlesummary) => (
          <div
            onClick={(e) => {
              if ((e.target as HTMLElement).closest("button")) return;
              router.push("/summaries/" + singlesummary.id);
            }}
            key={singlesummary.id}
            className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3"
          >
            <div
              className="sm:m-4 p-4 sm:py-8 sm:p-4 border border-rose-950 
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
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setFiletodelete(singlesummary);
                    setOpenAlertDialogBox(true);
                  }}
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
          </div>
        ))}
    </div>
  );
};

export default Summaritemslist;
