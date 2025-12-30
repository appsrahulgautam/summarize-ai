"use client";
import { fileSchemaZod } from "@/lib/schemas";
import UploadFormInput from "./upload-form-input";
import { useUploadThing } from "@/utils/uploadthing";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { generatePDFSummary } from "@/lib/crud";

const UploadForm = () => {
  const [uploadedFileName, setuploadedFileName] = useState("");
  const [uploadedFileUrl, setuploadedFileUrl] = useState("");

  // todo custom webhook from uploadthing sdk
  const { startUpload, routeConfig } = useUploadThing("pdfUploader", {
    onClientUploadComplete: (res) => {
      //* check api/uploadthing pages to see wheres these are coming
      setuploadedFileUrl(res[0].ufsUrl);
      setuploadedFileName(res[0].name);

      console.log("File url is -> " + uploadedFileUrl);
      toast.success("PDF uploaded successfully! ");
    },
    onUploadError: () => {
      toast.error("PDF failed to upload");
    },
    onUploadBegin: ({}) => {
      toast("Uploading...");
    },
  });

  // todo step 3 -> parse the data via langchain by uploading url there
  //todo we are using useEffect because the url is fetched inside onClientUploadComplete async.
  useEffect(() => {
    if (uploadedFileUrl != "" || uploadedFileName != "") {
      toast("Processing the pdf.....");
      generatePDFSummary(uploadedFileUrl, uploadedFileName);
    } else {
      toast.error("Unable to read the uloaded pdf. Please retry");
    }
  }, [uploadedFileUrl]);

  //todo
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const file = formData.get("file") as File;
    console.log("File from formData:", file);

    // //todo step 1 -> validate via zod file schema
    const parsedFile = fileSchemaZod.safeParse(file);
    if (!parsedFile.success) {
      console.log(parsedFile.error);
      return;
    }

    //todo step - 2 lets upload file
    const response = await startUpload([file]);
    if (!response) {
      toast.error("PDF failed to upload");
      return;
    }
  };

  return (
    <div>
      <UploadFormInput handleSubmit={handleSubmit} />
    </div>
  );
};

export default UploadForm;
