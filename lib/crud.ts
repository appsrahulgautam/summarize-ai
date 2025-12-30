"use server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { getBlobFromUrl } from "./utils";
import { getFullTextDataFromPDF_LangChain_SDK } from "./langchain_sdk_crud";
import {
  generate_OpenAI_ChatGPT_summary,
  TESTINGTEXT,
} from "./openai-chatgpt-crud";

export async function generatePDFSummary(
  uploadedFileUrl: string,
  uploadedFileName: string
) {
  try {
    const blob = await getBlobFromUrl(uploadedFileUrl);
    console.log("Blob PATH -> " + URL.createObjectURL(blob));

    /// * LangChain SDK Call here
    const fullTextDataOfPDF = await getFullTextDataFromPDF_LangChain_SDK(
      uploadedFileUrl,
      uploadedFileName
    );

    // * lets pass fulltext to chatgpt and ask to do summary of it
    // * if it throws error we will do summary from gemini in catch block
    try {
      const summaryByChatGPT = TESTINGTEXT;
      // generate_OpenAI_ChatGPT_summary(fullTextDataOfPDF);

      console.log("Summary by " + summaryByChatGPT);
    } catch (error: any) {
      console.log(error);
      ///gemini summary here
    }
  } catch (error: any) {
    if (error instanceof Error) {
      console.error(error.message);
      return {
        success: false,
        error: error.message,
        message: error.message,
      };
    }
  }
}

export async function getUserDetails() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return {
      success: false,
      error: "Not logged in",
      message: "You need to re-login.",
    };
  }
  if (!session.user) {
    return {
      success: false,
      error: "Not logged in",
      message: "You need to re-login.",
    };
  }

  if (!session.user.id) {
    return {
      success: false,
      error: "Not logged in",
      message: "You need to re-login.",
    };
  }

  const userId = session.user.id;
  return {
    success: true,
    error: "",
    message: "Success",
    userId: userId,
  };
}
