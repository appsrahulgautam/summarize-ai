"use server";
import { neon } from "@neondatabase/serverless";

export async function getDbConnection() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DB Connection has not established yet");
  }
  const sql = neon(process.env.DATABASE_URL);
  // const data = await sql`...`;
  return sql;
}
