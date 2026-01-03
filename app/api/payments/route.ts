import {
  handleCheckoutInvoiceSucceeded,
  handleCheckoutSessionCompleted,
} from "@/lib/payments";
import {
  handleSubscriptionDeleted,
  updateSubscriptionStatusOnly,
} from "@/lib/stripe_related_cruds";
import { NextRequest, NextResponse } from "next/server";

import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export const POST = async (req: NextRequest) => {
  const payload = await req.text();
  const sig = req.headers.get("stripe-signature");

  let event;

  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

  try {
    event = stripe.webhooks.constructEvent(payload, sig!, endpointSecret);
    switch (event.type) {
      case "checkout.session.completed":
        console.log("checkout.session.completed");
        const sessionId = event.data.object.id as string;

        const session = await stripe.checkout.sessions.retrieve(sessionId, {
          expand: ["subscription"],
        });

        //todo lets now parse the data received
        await handleCheckoutSessionCompleted({ session, stripe });

        break;
      case "customer.subscription.deleted":
        console.log("customer.subscription.deleted");
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionDeleted(subscription.id);
        break;

      case "customer.subscription.updated": {
        console.log("customer.subscription.updated");

        const subscription = event.data.object as Stripe.Subscription & {
          status?: string;
        };

        await updateSubscriptionStatusOnly({
          stripeSubscriptionId: subscription.id,
          status: subscription.status,
        });

        break;
      }

      case "invoice.payment_succeeded": {
        console.log("invoice.payment_succeeded received");

        const invoice = event.data.object as Stripe.Invoice & {
          subscription?: string | Stripe.Subscription;
          lines: {
            data: Array<{
              period?: {
                start?: number;
                end?: number;
              };
            }>;
          };
        };

        const subscriptionId =
          typeof invoice.subscription === "string"
            ? invoice.subscription
            : invoice.subscription?.id;

        if (!subscriptionId) {
          console.error("Invoice missing subscription id", invoice.id);
          break;
        }

        const line = invoice.lines.data[0];

        if (!line?.period?.start || !line?.period?.end) {
          console.error("Invoice period missing", invoice.id);
          break;
        }

        await handleCheckoutInvoiceSucceeded({
          subscriptionId,
          periodStartTime: new Date(line.period.start * 1000),
          periodEndTime: new Date(line.period.end * 1000),
        });

        break;
      }

      default:
        console.log(`Unhandled event type ${event.type}`);
    }
  } catch (err) {
    return NextResponse.json(
      { error: "Invalid signature", err },
      { status: 400 }
    );
  }

  return NextResponse.json({
    status: "success",
    message: "Hello",
  });
};

export const GET = async () => {
  return NextResponse.json({
    status: "Get HELLOW",
    message: "Hello get",
  });
};
