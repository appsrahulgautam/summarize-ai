"use server";
import { getBlobFromUrl } from "./utils";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";

// * WE ARE EXTRATING THE TEXT FROM LANGCHAIN SDK BY UPLOADING A FILE BLOB

export async function getFullTextDataFromPDF_LangChain_SDK(
  uploadedFileUrl: string,
  uploadedFileName: string
) {
  try {
    const blob = await getBlobFromUrl(uploadedFileUrl);
    console.log("Blob PATH -> " + URL.createObjectURL(blob));
    const loader = new PDFLoader(blob);
    const docs = await loader.load();
    return docs
      .map(
        (singledoc) =>
          // console.log("Single doc -> " + singledoc?.pageContent)
          singledoc.pageContent
      )
      .join("\n\n");
  } catch (error) {
    throw Error(
      "LangChain parsing error. Try again with other file or retry again."
    );
  }

  // * ✅ When to use this join()
  // * You want one combined text
  // * Ideal for:
  // * LLM prompts
  // * Summarization
  // * Chat context
}
