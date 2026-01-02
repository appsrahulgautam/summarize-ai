import Stripe from "stripe";

interface HandleCheckoutArgs {
  session: Stripe.Checkout.Session;
  stripe: Stripe;
}

export async function handleCheckoutSessionCompleted({
  session,
  stripe,
}: HandleCheckoutArgs) {
  const email =
    session.customer_details?.email || session.customer_email || null;

  console.log("✅ Checkout completed");
  console.log("📧 Customer email:", email);

  // optional useful fields
  console.log("🆔 Session ID:", session.id);
  console.log("💰 Amount total:", session.amount_total);
  console.log("🧾 Currency:", session.currency);

  // metadata (if you set it during session creation)
  if (session.metadata?.userId) {
    console.log("👤 User ID:", session.metadata.userId);
  }

  // metadata (if you set it during session creation)
  if (session.metadata?.plan) {
    console.log("💰 Plan:", session.metadata.plan);
  }

  // do DB work here later
}
