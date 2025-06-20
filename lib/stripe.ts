import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not defined');
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-06-20',
  typescript: true,
});

export async function createCheckoutSession(
  email: string,
  metadata: Record<string, string>
): Promise<Stripe.Checkout.Session> {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'eur',
          product_data: {
            name: 'CV Express IA - Génération de CV optimisé',
            description: 'CV professionnel + Lettre de motivation générés par IA',
            images: ['https://your-domain.com/og-image.jpg'],
          },
          unit_amount: 999, // 9.99€
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    customer_email: email,
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/generate`,
    metadata,
    expires_at: Math.floor(Date.now() / 1000) + (30 * 60), // 30 minutes
    automatic_tax: {
      enabled: true,
    },
    billing_address_collection: 'required',
    shipping_address_collection: {
      allowed_countries: ['FR'],
    },
  });

  return session;
}

export async function retrieveSession(sessionId: string): Promise<Stripe.Checkout.Session> {
  return await stripe.checkout.sessions.retrieve(sessionId);
}

export function constructWebhookEvent(
  payload: string | Buffer,
  signature: string
): Stripe.Event {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    throw new Error('STRIPE_WEBHOOK_SECRET is not defined');
  }

  return stripe.webhooks.constructEvent(payload, signature, webhookSecret);
}