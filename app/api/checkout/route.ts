import Stripe from "stripe";
import { NextResponse } from "next/server";

//*
//* WE ARE CREATING A WAY TO PASS USER INFORMATION TO PAYMENT LINK OF STRIPE
//* WHEN USER PERFORMS STRIPE CHECKOUT, THIS IFORMATION IS RETURNED TO US
//* WE WILL REUSE THIS INFORMATION TO UPDATE DATABASE OF USER
//*

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const PRICE_MAP: Record<string, string> = {
  basic: "price_1SlXDzSGiOVnd9LiBWx8yBat", //price id of that plan <---
  pro: "price_1SlXEFSGiOVnd9Libh2IaAtc",
};

export async function POST(req: Request) {
  const { plan, userId } = await req.json();
  console.log("checkout params -> " + plan + "  "+ userId);

  const priceId = PRICE_MAP[plan];
  if (!priceId) {
    return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
  }

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    line_items: [{ price: priceId, quantity: 1 }],
    //todo -> You must provide success_url and cancel_url. Stripe will
    //todo  reject the session without them.
    //todo you dont trust these to confirm. Trust only webhook events
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,
    metadata: {
      plan,
      userId, // ← YOU MUST PASS THIS FROM FRONTEND
    },
  });

  return NextResponse.json({ url: session.url });
}
