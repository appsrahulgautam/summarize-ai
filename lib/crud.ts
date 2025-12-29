"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

// export async function getUserDetails() {
//   const session = await getServerSession(authOptions);

//   if (!session) {
//     return {
//       success: false,
//       error: "Not logged in",
//       message: "You need to re-login.",
//     };
//   }
//   if (!session.user) {
//     return {
//       success: false,
//       error: "Not logged in",
//       message: "You need to re-login.",
//     };
//   }

//   if (!session.user.id) {
//     return {
//       success: false,
//       error: "Not logged in",
//       message: "You need to re-login.",
//     };
//   }

//   const userId = session.user.id;
// }
