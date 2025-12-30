import { generateReactHelpers, generateUploadButton } from "@uploadthing/react";
import { OurFileRouter } from "./core";

export const UploadButton = generateUploadButton<OurFileRouter>();

export const { useUploadThing } = generateReactHelpers<OurFileRouter>();
