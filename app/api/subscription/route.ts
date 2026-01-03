import { getUserDetails, getUserSubscription } from "@/lib/user_related_db_cruds";
import { NextResponse } from "next/server";

export async function GET() {
  const { success, userId } = await getUserDetails();
  if (!success || !userId) {
    return NextResponse.json({ loggedIn: false });
  }

  const sub = await getUserSubscription(userId);
  return NextResponse.json(sub);
}
