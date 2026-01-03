import { createUserIfNotExists } from "@/lib/user_related_db_cruds";
import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: "/login", // Tells NextAuth to use this route instead of the default
  },
  ///
  //
  //todo these callback methods runs everytims it successfully logins
  //todo so to update user db or create user db row, heres the place
  //
  callbacks: {
    async signIn({ user }) {
      if (!user.email) return false;
      await createUserIfNotExists(
        user.email,
        user.id, // ✅ auth_user_id
        user.name ?? undefined
      );
      return true; // allow sign-in
    },

    // Add types to jwt({ token, user })
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    // Add types to session({ session, token })
    async session({ session, token }) {
      if (session.user) {
        // We cast token.id as string because we added it in the jwt callback
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
