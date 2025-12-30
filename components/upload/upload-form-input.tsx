"use client";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";

interface UploadformInputProp {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const UploadFormInput = ({ handleSubmit }: UploadformInputProp) => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col sm:flex-row justify-center sm:justify-between items-center px-10 sm:px-30 pt-10">
          <div className="flex justify-center w-full sm:w-auto">
            <input
              id="file"
              name="file"
              type="file"
              required
              accept="application/pdf"
              className="text-sm sm:text-xl cursor-pointer
                 file:mr-4 file:py-2 file:px-4 
                 file:rounded-full file:border-0
                 file:font-semibold
                 file:bg-rose-50 file:text-rose-700
                 file:text-lg
                 hover:file:bg-rose-100 py-2 px-2 bg-rose-300 rounded-2xl my-2 sm:bg-transparent
                 sm:rounded-none sm:my-0 sm:py-0 sm:px-0"
            />
          </div>
          <Button
            type="submit"
            variant={"default"}
            className="h-10 sm:h-12 bg-linear-to-r text-sm sm:text-xl shadow-2xl 
         from-rose-500 to-rose-950 animation_popup_style rounded-full hover:to-rose-500 hover:from-rose-950"
          >
            <span className=" flex flex-row px-6 items-center gap-4">
              Upload file <ArrowRight />
            </span>
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UploadFormInput;
