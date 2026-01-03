import { generateReactHelpers, generateUploadButton } from "@uploadthing/react";
import { OurFileRouter } from "../app/api/uploadthing/core";

export const UploadButton = generateUploadButton<OurFileRouter>();

export const { useUploadThing } = generateReactHelpers<OurFileRouter>();
