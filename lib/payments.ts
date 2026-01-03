import Stripe from "stripe";
import {
  updateSubscriptionPeriod,
  updateUserSubscriptionStatus,
} from "./stripe_related_cruds";

interface HandleCheckoutArgs {
  session: Stripe.Checkout.Session;
  stripe: Stripe;
}

export async function handleCheckoutSessionCompleted({
  session,
}: HandleCheckoutArgs) {
  console.log("inside handleCheckoutSessionCompleted");

  const userId = session.metadata?.userId;
  const plan = session.metadata?.plan;

  if (!userId || !plan) {
    console.error("Missing metadata");
    return;
  }
  console.log("userId plan -> " + plan + "  " + userId);

  const subscription = session.subscription;

  // 🔐 Type guard
  if (!subscription || typeof subscription === "string") {
    console.error("Subscription not expanded");
    return;
  }

  const sub = subscription as Stripe.Subscription & {
    current_period_start?: number;
    current_period_end?: number;
  };

  if (!sub.current_period_start || !sub.current_period_end) {
    console.error("Missing subscription period", {
      subscriptionId: sub.id,
    });
    // return;
  }

  await updateUserSubscriptionStatus({
    userId,
    plan,

    stripeCustomerId: session.customer as string,
    stripeSubscriptionId: sub.id,
    stripePaymentIntentId: session.payment_intent as string | null,
    stripeInvoiceId: sub.latest_invoice as string | null,

    amount: session.amount_total as number,
    currency: session.currency as string,

    paymentStatus: "succeeded",
    subscriptionStatus: sub.status,

    periodStart: null, //sending null because periodstart and period end will be received in different event
    periodEnd: null,
  });
}

export async function handleCheckoutInvoiceSucceeded({
  subscriptionId,
  periodStartTime,
  periodEndTime,
}: {
  subscriptionId: string;
  periodStartTime: Date;
  periodEndTime: Date;
}) {
  console.log("inside handleCheckoutInvoiceSucceeded");

  await updateSubscriptionPeriod({
    stripeSubscriptionId: subscriptionId,
    status: "active",
    periodStart: periodStartTime,
    periodEnd: periodEndTime,
  });
}
