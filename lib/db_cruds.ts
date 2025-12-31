"use server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { getDbConnection } from "./db";
import { getCleanFileName } from "./utils";

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

export async function createUserIfNotExists(email: string, fullName?: string) {
  try {
    console.log("name and email " + fullName + "  " + email);
    const sql = await getDbConnection();

    const result = await sql`
    INSERT INTO users (email, full_name)
    VALUES (${email}, ${fullName})
    ON CONFLICT (email) DO NOTHING
    RETURNING *;
  `;

    // If user already exists, fetch it
    if (result.length === 0) {
      const [user] = await sql`
      SELECT * FROM users WHERE email = ${email};
    `;
      return user;
    }

    return result[0];
  } catch (error: any) {
    console.log("Error while creating user");
  }
}

export async function saveSummaryToDatabase(
  uploadedFileUrl: string,
  uploadedFileName: string,
  summary: string
) {
  try {
    console.log("inside saveSummaryToDatabase");

    const { success, error, message, userId } = await getUserDetails();
    if (success != true || !userId) {
      return {
        successSavedToDb: false,
        errorSaveInDb: "You need to log in first",
      };
    }

    const status = "completed";
    const filename_Cleaned = getCleanFileName(uploadedFileName);

    const sql = await getDbConnection();

    const [summaryDbItemAdded] = await sql`
      INSERT INTO pdf_summaries (
        user_id,
        original_file_url,
        summary_text,
        status,
        title,
        file_name
      )
      VALUES (
        ${userId},
        ${uploadedFileUrl},
        ${summary},
        ${status},
        ${filename_Cleaned},
        ${uploadedFileName}
      )
      RETURNING *;
    `;

    return { successSavedToDb: true, errorSaveInDb: "" };
  } catch (error: any) {
    console.log("ERROR saveSummaryToDatabase error " + error);
    return {
      successSavedToDb: false,
      errorSaveInDb: "Error while saving summary to database.",
    };
  }
}

export interface PdfSummary {
  id: string;
  user_id: string;
  original_file_url: string;
  summary_text: string;
  status: string;
  title: string | null;
  file_name: string | null;
  created_at: string;
  updated_at: string;
}

export async function getPdfSummariesByUserId(
  userId: string
): Promise<PdfSummary[] | any> {
  try {
    const sql = await getDbConnection();

    const rows = await sql`
    SELECT
      id,
      user_id,
      original_file_url,
      summary_text,
      status,
      title,
      file_name,
      created_at,
      updated_at
    FROM pdf_summaries
    WHERE user_id = ${userId}
    ORDER BY created_at DESC;
  `;

    const arraydata = rows.map((row: any) => ({
      id: row.id,
      user_id: row.user_id,
      original_file_url: row.original_file_url,
      summary_text: row.summary_text,
      status: row.status,
      title: row.title ?? null,
      file_name: row.file_name ?? null,
      created_at: row.created_at,
      updated_at: row.updated_at,
    }));

    return {
      success: true,
      error: "",
      data: arraydata,
    };
  } catch (error: any) {
    return {
      success: false,
      error: "Error while fetching summaries",
      data: null
    };
  }
}
