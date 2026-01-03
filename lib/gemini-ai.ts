import { GoogleGenAI } from "@google/genai";
import { PROMPT, TESTINGTEXT } from "./openai-chatgpt-crud";
import { generatePDFSummary } from "@/lib/crud";

const ai = new GoogleGenAI({});

//*
// When using Gemini 3 models, we strongly recommend
// keeping the temperature at its default value of 1.0.
// Changing the temperature (setting it below 1.0) may
// lead to unexpected behavior, such as looping or degraded
// performance, particularly in complex mathematical or
// reasoning tasks.
// *

export default async function generatePDFSummary_Gemini_AI(
  fullTextDataOfPDF: string
) {
  try {
    // throw new Error("Something went wrong in Gemini execution");
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents:
        "Transform this text to meaningful, easy to read summary -" +
        "\n\n\n" +
        fullTextDataOfPDF,
      config: {
        systemInstruction: PROMPT,
        temperature: 0.1,
      },
    });
    console.log("Gemini response -> " + response.text);
    return response.text;
  } catch (error: any) {
    throw new Error("Something went wrong in Gemini execution");
  }
}
