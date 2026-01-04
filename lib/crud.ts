"use server";
import { getBlobFromUrl } from "./utils";
import { getFullTextDataFromPDF_LangChain_SDK } from "./langchain_sdk_crud";
import { generate_OpenAI_ChatGPT_summary } from "./openai-chatgpt-crud";
import generatePDFSummary_Gemini_AI from "./gemini-ai";

//
//
//
//
// *
// * THIS IS THE MAIN FUNCTION HANDLING EVERTYTHING
// * Whats happening here ->
// * 1. We have uploaded the picked locally file to UploadThing SDK and have already passed its url to uploadedFileUrl
// * 2. We will create a blob of it and NOT a permanent file !!!
// * 3. We will send that blob to LangChain to parse the text out of it
// * 4. We will first send that parsed text to ChatGPT and see if it sends a data.
// * 5. If in any case, ChatGPT doesnt send data we try Gemini AI and get the summary.
// * 6. Lastly we send summary to user or we ssay a Big sorry to user.

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
    // try {
    //   const summaryByChatGPT = //TESTINGTEXT;
    //     await generate_OpenAI_ChatGPT_summary(fullTextDataOfPDF);

    //   console.log("Summary by " + summaryByChatGPT);
    //   return {
    //     success: true,
    //     error: "",
    //     summary: summaryByChatGPT,
    //   };
    // } catch (error: any) {
    //   console.log("Error by ChatGPT -> " + error);

    //  * lets try Gemini AI summary here
    try {
      const summaryByGemini = await generatePDFSummary_Gemini_AI(
        fullTextDataOfPDF
      );
      console.log("Response by Gemini ->> " + summaryByGemini);
      return {
        success: true,
        error: "",
        summary: summaryByGemini,
      };
    } catch (error1) {
      console.log(error1);
      // *
      // * if gemini also has error then say big no to user
      // *
      return {
        success: false,
        error: "No AI provider was able to provide a summary for this PDF.",
      };
    }
    // }
  } catch (error: any) {
    if (error instanceof Error) {
      console.error(error.message);
      return {
        success: false,
        error: error.message,
      };
    }
    return {
      success: false,
      error: error,
    };
  }
}
