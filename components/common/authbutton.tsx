"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { Button } from "../ui/button";
import { Sparkles } from "lucide-react";
import { redirect } from "next/navigation";

export default function AuthButton() {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        {/* //todo to access userid and user details see this */}
        {/* Signed in as {session?.user?.email} <br />
        <p>User ID: {session.user.id}</p> */}

        <div className="flex gap-4">
          <button className="bg-transparent" onClick={() => signOut()}>
            Sign Out
          </button>
        </div>
      </>
    );
  }
  return (
    <>
      <div className="flex gap-4">
        <Button className="animation_popup_style " onClick={() => signIn()}>
          Sign In
        </Button>
      </div>
    </>
  );
}
