import {
  cancelSubscription,
  getUserDetails,
} from "@/lib/user_related_db_cruds";
import { NextResponse } from "next/server";

export async function POST() {
  const { success, userId } = await getUserDetails();
  if (!success || !userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await cancelSubscription(userId);
  return NextResponse.json({ success: true });
}
