"use client";

import { signIn } from "next-auth/react";
import { Sparkles, LogIn } from "lucide-react";

export default function LoginPage() {
  return (
    <div
      className="relative flex min-h-screen items-center justify-center bg-linear-to-br
     from-rose-100 via-rose-50 to-rose-100 px-4"
    >
  
      {/* Card */}
      <section className="relative z-10 w-full max-w-md rounded-2xl border bg-white/80 p-8 shadow-xl backdrop-blur">
        {/* Header */}
        <div className="mb-6 flex flex-col items-center text-center">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-rose-100 text-rose-600">
            <Sparkles size={22} />
          </div>

          <h1 className="text-2xl font-semibold tracking-tight">
            Welcome back 👋
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Sign in to continue and access your dashboard
          </p>
        </div>

        {/* Sign in button */}
        <button
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="group flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-3 font-medium text-gray-800 transition hover:bg-gray-50"
        >
          <LogIn size={18} />
          Continue with Google
        </button>

        {/* Footer text */}
        <p className="mt-6 text-center text-xs text-muted-foreground">
          By continuing, you agree to our{" "}
          <span className="underline cursor-pointer">Terms</span> &{" "}
          <span className="underline cursor-pointer">Privacy Policy</span>
        </p>
      </section>
    </div>
  );
}
