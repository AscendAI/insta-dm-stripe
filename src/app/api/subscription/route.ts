import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? '', {
  apiVersion: '2022-11-15',
  typescript: true,
})
import { absoluteUrl } from '@/lib/utils'
import { NextResponse } from 'next/server'

interface ManageStripeSubscriptionActionProps {
  isSubscribed: boolean
  stripeCustomerId?: string | null
  isCurrentPlan: boolean
  stripePriceId: string
  email: string
  userId: string
}

const manageStripeSubscriptionAction = async ({
  isSubscribed,
  stripeCustomerId,
  isCurrentPlan,
  stripePriceId,
  email,
  userId,
}: ManageStripeSubscriptionActionProps) => {
  const billingUrl = absoluteUrl('/')
  // const billingUrl = "https://www.instadm.ai/download"

  if (isSubscribed && stripeCustomerId && isCurrentPlan) {
    const stripeSession = await stripe.billingPortal.sessions.create({
      customer: stripeCustomerId,
      return_url: billingUrl,
    })

    return { url: stripeSession.url }
  }

  let stripeSession: any

  if (stripeCustomerId) {
    stripeSession = await stripe.checkout.sessions.create({
      success_url: billingUrl,
      customer: stripeCustomerId,
      cancel_url: billingUrl,
      payment_method_types: ['card'],
      mode: 'subscription',
      billing_address_collection: 'auto',
      allow_promotion_codes:true,
      line_items: [
        {
          price: stripePriceId,
          quantity: 1,
        },
      ],
      metadata: {
        userId: userId,
      },
    })
  } else {
    stripeSession = await stripe.checkout.sessions.create({
      success_url: billingUrl,
      cancel_url: billingUrl,
      payment_method_types: ['card'],
      mode: 'subscription',
      billing_address_collection: 'auto',
      customer_email: email,
      allow_promotion_codes:true,
      line_items: [
        {
          price: stripePriceId,
          quantity: 1,
        },
      ],
      metadata: {
        userId: userId,
      },
    })
  }

  return { url: stripeSession.url }
}

export async function POST(request: Request) {
  const body = await request.json()
  const res = await manageStripeSubscriptionAction(body)
  return NextResponse.json({ res })
}
