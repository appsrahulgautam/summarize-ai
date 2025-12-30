import z, { file, mime } from "zod";

export const fileSchemaZod = z
  .instanceof(File)
  .refine((file) => file.size <= 10 * 1024 * 1024, {
    message: "We cannot process more then 10mb file size.",
  })
  .refine((file) => file.type === "application/pdf", {
    message: "Only PDF files are allowed",
  });
