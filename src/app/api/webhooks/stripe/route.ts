import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? '', {
  apiVersion: '2022-11-15',
  typescript: true,
})

import { headers } from 'next/headers'
import {
  updateUserSubscription,
  updateUserStripeSuccess,
  deleteUserStripeSuccess,
  updateUserStripeFailure,
  updateCustomerSubscription,
} from '@/lib/firebase/firestore/firebaseSDK'

export async function POST(request: Request) {
  const body = await request.text()
  const signature = headers().get('Stripe-Signature') ?? ''

  let event: Stripe.Event

  try {
    console.log('before api check')
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET || ''
    )
    console.log('after api check')
  } catch (err) {
    console.log('status 400 dibe')
    return new Response(
      `Webhook Error: ${err instanceof Error ? err.message : 'Unknown Error'}`,
      { status: 400 }
    )
  }

  console.log('--------1')

  const session = event.data.object as Stripe.Checkout.Session
  console.log('session', session)
  console.log('event.type', event.type)
  if (event.type === 'invoice.payment_failed') {
    await updateUserStripeFailure(session)
  }

  if (event.type === 'customer.subscription.deleted') {
    await deleteUserStripeSuccess(session)
  }

  if (event.type === 'customer.subscription.updated') {
    await updateCustomerSubscription(session)
  }
  console.log('--------2')

  if (!session?.metadata?.userId) {
    return new Response(null, {
      status: 200,
    })
  }
  console.log('--------3')

  if (event.type === 'checkout.session.completed') {
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string
    )

    await updateUserSubscription(session, subscription)
  }

  if (event.type === 'invoice.payment_succeeded') {
    // Retrieve the subscription details from Stripe.
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string
    )

    await updateUserStripeSuccess(subscription)
  }

  return new Response(null, { status: 200 })
}
