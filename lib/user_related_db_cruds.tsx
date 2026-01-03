"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { getDbConnection } from "./db";


export async function getUserDetails() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return { success: false };
  }

  const sql = await getDbConnection();

  const [user] = await sql`
    SELECT id
    FROM users
    WHERE auth_user_id = ${session.user.id};
  `;

  if (!user) {
    return { success: false };
  }

  return {
    success: true,
    userId: user.id, // ✅ UUID
  };
}

export async function createUserIfNotExists(
  email: string,
  authUserId: string,
  fullName?: string
) {
  try {
    const sql = await getDbConnection();

    // Try insert
    const result = await sql`
      INSERT INTO users (email, auth_user_id, full_name)
      VALUES (${email}, ${authUserId}, ${fullName})
      ON CONFLICT (auth_user_id) DO NOTHING
      RETURNING *;
    `;

    // If already exists, fetch by auth_user_id
    if (result.length === 0) {
      const [user] = await sql`
        SELECT * FROM users
        WHERE auth_user_id = ${authUserId};
      `;
      return user;
    }

    return result[0];
  } catch (error) {
    console.error("Error while creating user", error);
    throw error;
  }
}

export async function getUserSubscription(userId: string) {
  const sql = await getDbConnection();

  const [row] = await sql`
    SELECT
      p.plan,
      p.subscription_status,
      p.period_start,
      p.period_end,
      u.status as user_status
    FROM payments p
    JOIN users u ON u.id = p.user_id
    WHERE p.user_id = ${userId}
    ORDER BY p.created_at DESC
    LIMIT 1;
  `;

  return row ?? null;
}

export async function cancelSubscription(userId: string) {
  const sql = await getDbConnection();

  await sql`
    UPDATE payments
    SET
      subscription_status = 'cancelled',
      updated_at = now()
    WHERE user_id = ${userId};
  `;

  await sql`
    UPDATE users
    SET
      status = 'inactive',
      plan = null,
      updated_at = now()
    WHERE id = ${userId};
  `;

  return { success: true };
}
