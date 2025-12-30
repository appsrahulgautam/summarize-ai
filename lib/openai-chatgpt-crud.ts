import OpenAI from "openai";
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const PROMPT = `
Summarize the following text into a clear, concise, and easy-to-read format.
Preserve meaning, key facts, and structure.
Use simple language, short paragraphs, and bullet points where helpful.
Do not add new information.
`;

export async function generate_OpenAI_ChatGPT_summary(
  fullTextDataOfPDF: string
) {
  try {
    const completion = await client.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: PROMPT },
        {
          role: "user",
          content:
            "Transform this text to meaningful, easy to read summary -" +
            "\n\n\n" +
            fullTextDataOfPDF,
        },
      ],
      store: false,
      temperature: 0.7,
      max_tokens: 1500,
    });

    console.log(completion.choices[0].message.content);
  } catch (error: any) {
    if (error?.status === 429) {
      throw new Error("RATE LIMIT EXCEEDED IN CHATGPT");
    }
    throw new Error("Something went wrong in ChatGPT execution");
  }
}
export const TESTINGTEXT = `Water is essential for life and covers 71% of Earth's surface. Here's why it's important:

- **Basic Composition**: Water is made of two hydrogen atoms and one oxygen atom (H₂O).

- **Universal Solvent**: It dissolves many substances, aiding nutrient transport, digestion, and waste removal in organisms.

- **Temperature Regulation**: Its high specific heat capacity helps regulate body temperature and stabilize Earth's climate.

- **States and Cycle**: Exists as solid, liquid, and gas, driving the water cycle (evaporation, condensation, precipitation), crucial for ecosystems and human life.

- **Limited Fresh Water**: Only 3% of water is fresh; much is trapped in glaciers or underground, highlighting the need for conservation.

- **Erosion and Climate**: Water shapes landscapes and influences climate, affecting biodiversity and the planet's dynamic nature.
`;
