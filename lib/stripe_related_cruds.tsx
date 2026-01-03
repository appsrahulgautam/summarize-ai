"use server"
import { getDbConnection } from "./db";

 

interface UpdateSubscriptionArgs {
  userId: string;
  plan: string;

  stripeCustomerId: string;
  stripeSubscriptionId: string;
  stripePaymentIntentId: string | null;
  stripeInvoiceId: string | null;

  amount: number;
  currency: string;

  paymentStatus: string;
  subscriptionStatus: string;

  periodStart: null;
  periodEnd: null;
}

export async function updateUserSubscriptionStatus(
  data: UpdateSubscriptionArgs
) {
  console.log("inside updateUserSubscriptionStatus");
  console.log("#################################");
  console.log("#################################");
  console.log("#################################");
  try {
    const sql = await getDbConnection();

    // 🔑 UPSERT: works no matter when this arrives
    await sql`
      INSERT INTO payments (
        user_id,
        stripe_customer_id,
        stripe_subscription_id,
        stripe_payment_intent_id,
        stripe_invoice_id,
        plan,
        amount,
        currency,
        payment_status,
        subscription_status
      )
      VALUES (
        ${data.userId},
        ${data.stripeCustomerId},
        ${data.stripeSubscriptionId},
        ${data.stripePaymentIntentId},
        ${data.stripeInvoiceId},
        ${data.plan},
        ${data.amount},
        ${data.currency},
        ${data.paymentStatus},
        ${data.subscriptionStatus}
      )
      ON CONFLICT (stripe_subscription_id)
      DO UPDATE SET
        user_id = EXCLUDED.user_id,
        stripe_customer_id = EXCLUDED.stripe_customer_id,
        stripe_payment_intent_id = EXCLUDED.stripe_payment_intent_id,
        stripe_invoice_id = EXCLUDED.stripe_invoice_id,
        plan = EXCLUDED.plan,
        amount = EXCLUDED.amount,
        currency = EXCLUDED.currency,
        payment_status = EXCLUDED.payment_status;
    `;

    // Keep user in sync
    await sql`
      UPDATE users
      SET
        plan = ${data.plan},
        status = 'active'
      WHERE id = ${data.userId};
    `;
  } catch (error) {
    console.log("Stripe DB Save Error", error);
  }

  console.log("#################################");
  console.log("#################################");
  console.log("#################################");
}
export async function updateSubscriptionPeriod({
  stripeSubscriptionId,
  status,
  periodStart,
  periodEnd,
}: {
  stripeSubscriptionId: string;
  status: string;
  periodStart: Date;
  periodEnd: Date;
}) {
  console.log("inside updateSubscriptionPeriod");
  console.log("#################################");
  console.log("#################################");
  console.log("#################################");
  try {
    const sql = await getDbConnection();

    // 🔑 UPSERT: invoice may arrive first
    await sql`
      INSERT INTO payments (
        stripe_subscription_id,
        subscription_status,
        period_start,
        period_end
      )
      VALUES (
        ${stripeSubscriptionId},
        ${status},
        ${periodStart},
        ${periodEnd}
      )
      ON CONFLICT (stripe_subscription_id)
      DO UPDATE SET
        subscription_status = EXCLUDED.subscription_status,
        period_start = EXCLUDED.period_start,
        period_end = EXCLUDED.period_end;
    `;
  } catch (error) {
    console.log("Stripe DB Save Error", error);
  }
  console.log("#################################");
  console.log("#################################");
  console.log("#################################");
}

export async function updateSubscriptionStatusOnly({
  stripeSubscriptionId,
  status,
}: {
  stripeSubscriptionId: string;
  status: string;
}) {
  console.log("#################################");
  console.log("#################################");
  console.log("#################################");
  try {
    const sql = await getDbConnection();

    await sql`
    UPDATE payments
    SET
      subscription_status = ${status}
    WHERE stripe_subscription_id = ${stripeSubscriptionId};
  `;
  } catch (error) {
    console.log("Stripe DB Save Error", error);
  }
  console.log("#################################");
  console.log("#################################");
  console.log("#################################");
}

export async function handleSubscriptionDeleted(stripeSubscriptionId: string) {
  try {
    const sql = await getDbConnection();

    // 1️⃣ Mark payment inactive
    await sql`
    UPDATE payments
    SET
      subscription_status = 'canceled'
    WHERE stripe_subscription_id = ${stripeSubscriptionId};
  `;

    // 2️⃣ Revoke user access (if user already linked)
    await sql`
    UPDATE users
    SET
      plan = 'free',
      status = 'inactive'
    WHERE id IN (
      SELECT user_id
      FROM payments
      WHERE stripe_subscription_id = ${stripeSubscriptionId}
        AND user_id IS NOT NULL
    );
  `;
  } catch (error) {
    console.log("Stripe DB Save Error", error);
  }
  console.log("#################################");
  console.log("#################################");
  console.log("#################################");
}
