"use client";
import { fileSchemaZod } from "@/lib/schemas";
import UploadFormInput from "./upload-form-input";
import { useUploadThing } from "@/utils/uploadthing";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { generatePDFSummary } from "@/lib/crud";
import LoadingBar from "../common/loading";
import { saveSummaryToDatabase } from "@/lib/db_cruds";
import { useRouter } from "next/navigation";

const UploadForm = () => {
  const route = useRouter();

  const [startedProcessingByLangChain, setStartedProcessingByLangchain] =
    useState(false);
  const [uploadedFileName, setuploadedFileName] = useState("");
  const [uploadedFileUrl, setuploadedFileUrl] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isProcessing, setisProcessing] = useState(false);
  const [error, setError] = useState("");

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
      setError("PDF failed to upload");
      setisProcessing(false);
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
      //
      //
      const runfunction = async () => {
        setStartedProcessingByLangchain(true);
        const { success, error, summary } = await generatePDFSummary(
          uploadedFileUrl,
          uploadedFileName
        );

        //todo if success is true, lets do save summary in user db
        if (success == true) {
          console.log("inside success main");
          const { successSavedToDb, errorSaveInDb } =
            await saveSummaryToDatabase(
              uploadedFileUrl,
              uploadedFileName,
              summary as string
            );

          if (successSavedToDb == true) {
            console.log("inside success inner");
            setError("");
            setIsSuccess(true);
            setisProcessing(false);
            ///
            route.push("/dashboard");
          } else {
            console.log("inside error inner");
            setError(errorSaveInDb);
            setIsSuccess(false);
            setisProcessing(false);
          }
          //
        } else {
          console.log("inside error main");
          setError(error);
          setIsSuccess(false);
          setisProcessing(false);
        }
      };

      runfunction();
      //
      //
    } else {
      //we put inside startedProcessingByLangChain because toast is running by default as its ""
      if (startedProcessingByLangChain == true)
        toast.error("Unable to read the uploaded pdf. Please retry");
    }
  }, [uploadedFileUrl]);

  //todo step 4
  //todo lets update UI based on success or isprocessing
  useEffect(() => {
    // * whenever the isSuccess changes, it runs everytime
    if (isSuccess == true) {
      toast.success("Summary has been generated successfully");
    } else {
      //we put inside startedProcessingByLangChain because toast is running by default as its ""
      if (startedProcessingByLangChain == true) {
        toast.error(error);
      }
    }
  }, [isSuccess]);

  useEffect(() => {
    // * whenever the isProcessing changes, it runs everytime
    if (isProcessing == true) {
      //
    } else {
    }
  }, [isProcessing]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setisProcessing(true);
    setStartedProcessingByLangchain(false);
    const formData = new FormData(e.currentTarget);
    const file = formData.get("file") as File;
    console.log("File from formData:", file);
    e.currentTarget.reset();

    // //todo step 1 -> validate via zod file schema
    const parsedFile = fileSchemaZod.safeParse(file);
    if (!parsedFile.success) {
      console.log(parsedFile.error);
      setError("Error while parsing your PDF file");
      setisProcessing(false);
      return;
    }

    //todo step - 2 lets upload file
    const response = await startUpload([file]);
    if (!response) {
      toast.error("PDF failed to upload");
      setError("PDF failed to upload");
      setisProcessing(false);
      return;
    }
  };

  return (
    <div>
      {isProcessing && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center pointer-events-auto">
          <div className="bg-white rounded-xl p-6 flex flex-col items-center gap-4">
            <LoadingBar />
            <p className="text-sm text-muted-foreground">
              Generating Summary........
            </p>
          </div>
        </div>
      )}
      <UploadFormInput handleSubmit={handleSubmit} />
    </div>
  );
};

export default UploadForm;
