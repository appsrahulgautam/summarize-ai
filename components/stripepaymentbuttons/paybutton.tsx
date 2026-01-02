import { getUserDetails } from "@/lib/db_cruds";
import { signIn } from "next-auth/react";

export default function PayButton({ plan }: { plan: "basic" | "pro" }) {
  //
  //todo pay button is clicked
  // lets see if user is logged in or not
  //if not, we will ask him to log in

  const handlePayButton = async () => {
    const { success, userId } = await getUserDetails();
    if (!success) {
      // throw new Error("You need to login first");
      return signIn();
    }
    handleCheckout();
  };

  const handleCheckout = async () => {
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ plan }),
    });

    const { url } = await res.json();
    window.location.href = url;
  };

  return <button onClick={handlePayButton}>Subscribe</button>;
}
