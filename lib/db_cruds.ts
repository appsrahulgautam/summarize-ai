"use server";
import { getDbConnection } from "./db";
import { getCleanFileName } from "./utils";
import { getUserDetails } from "./user_related_db_cruds";

export async function saveSummaryToDatabase(
  uploadedFileUrl: string,
  uploadedFileName: string,
  summary: string
) {
  try {
    console.log("inside saveSummaryToDatabase");

    const { success, userId } = await getUserDetails();
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
      data: null,
    };
  }
}

export async function deletePdfSummaryById(summaryId: string, userId: string) {
  try {
    const sql = await getDbConnection();

    const result = await sql`
      DELETE FROM pdf_summaries
      WHERE id = ${summaryId}
      AND user_id = ${userId}
      RETURNING id;
    `;

    if (result.length === 0) {
      return {
        success: false,
        error: "Summary not found or not authorized",
      };
    }

    return {
      success: true,
      deletedId: result[0].id,
    };
  } catch (error) {
    console.error("Delete summary error:", error);
    return {
      success: false,
      error: "Failed to delete summary",
    };
  }
}

export async function getPdfSummaryByIdAndUser(id: string, userId: string) {
  try {
    const sql = await getDbConnection();
    const result = await sql`
    SELECT *
    FROM pdf_summaries
    WHERE id = ${id}
      AND user_id = ${userId}
    LIMIT 1;
  `;

    if (result.length > 0) {
      const pdfsummary = result[0] as PdfSummary;
      return {
        successPdf: true,
        pdfsummary: pdfsummary,
      };
    } else {
      return {
        successPdf: true,
        pdfsummary: null,
      };
    }
  } catch (error) {
    return {
      successPdf: false,
      pdfsummary: null,
    };
  }
}
