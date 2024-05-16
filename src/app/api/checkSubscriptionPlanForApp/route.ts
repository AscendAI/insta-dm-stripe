import Stripe from 'stripe'
import { storeSubscriptionPlans } from '@/config/subscriptions'

import {
  findUserById,
  getUser,
  updateUserStripeSuccess,
} from '@/lib/firebase/firestore/firebaseSDK'
import { NextRequest, NextResponse } from 'next/server'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? '', {
  apiVersion: '2022-11-15',
  typescript: true,
})

async function getUserSubscriptionPlan(session: { uid: string }) {
  console.log('session.uid', session.uid)
  if (!session || !session?.uid) {
    throw new Error('User not found1.')
  }

  let user = await findUserById(session.uid)

  if (!user) {
    console.log('user not found')
    throw new Error('User not found2.')
  }
  const isSubscribed =
    user?.stripePriceId &&
    user?.stripeCurrentPeriodEnd &&
    user?.stripeCurrentPeriodEnd?.toDate().getTime() + 86_400_000 > Date.now()

  const plan = isSubscribed
    ? storeSubscriptionPlans.find(
        (plan: any) => plan.stripePriceId === user?.stripePriceId
      )
    : null

  let isCanceled = false
  try {
    const stripePlan = await stripe.subscriptions.retrieve(
      user.stripeSubscriptionId
    )
    if (
      stripePlan.id != user.stripeSubscriptionId ||
      user.stripeCurrentPeriodEnd.seconds != stripePlan.current_period_end ||
      user.tierName != stripePlan.items.data[0].plan.nickname
    ) {
      console.log('start of data discrepancy!')
      console.log('stripePlan.id', stripePlan.id)
      console.log('user.stripeSubscriptionId', user.stripeSubscriptionId)
      console.log(
        'stripePlan.current_period_end',
        stripePlan.current_period_end
      )
      console.log(
        'user.stripeCurrentPeriodEnd',
        user.stripeCurrentPeriodEnd.seconds
      )
      console.log(
        'stripePlan.items.data[0].plan.nickname',
        stripePlan.items.data[0].plan.nickname
      )
      console.log('user.tierName', user.tierName)
      console.log(
        stripePlan.id != user.stripeSubscriptionId ||
          user.stripeCurrentPeriodEnd.seconds !=
            stripePlan.current_period_end ||
          user.tierName != stripePlan.items.data[0].plan.nickname
      )
      console.log('dal me kuch kala he!')
      await updateUserStripeSuccess(stripePlan)
      user = await findUserById(session.uid)
    } else {
      console.log('the dal is very tasty!')
    }
    // await updateUserStripeSuccess(stripePlan)
    console.log('stripePlan: 1 ', stripePlan)
  } catch {
    console.log('somthing went wrong')
    return {
      ...plan,
      cancel_at: user?.cancel_at,
      cancel_at_period_end: user?.cancel_at_period_end,
      stripeSubscriptionId: user?.stripeSubscriptionId,
      stripeCurrentPeriodEnd: user?.stripeCurrentPeriodEnd,
      stripeCustomerId: user?.stripeCustomerId,
      isSubscribed,
      isCanceled,
    }
  }

  if (isSubscribed && user?.stripeSubscriptionId) {
    const stripePlan = await stripe.subscriptions.retrieve(
      user.stripeSubscriptionId
    )
    isCanceled = stripePlan.cancel_at_period_end
  }

  return {
    ...plan,
    cancel_at: user?.cancel_at,
    cancel_at_period_end: user?.cancel_at_period_end,
    stripeSubscriptionId: user?.stripeSubscriptionId,
    stripeCurrentPeriodEnd: user?.stripeCurrentPeriodEnd,
    stripeCustomerId: user?.stripeCustomerId,
    isSubscribed,
    isCanceled,
  }
}

export async function POST(request: NextRequest) {
  const loggedIn = await getUser(request)
  console.log('inside subscription route')
  if (loggedIn) {
    const result = await getUserSubscriptionPlan(loggedIn)
    console.log('result', result)
    return NextResponse.json({ data: result })
  } else {
    return NextResponse.json({
      data: { result: true, message: 'User not found', tierName: null },
    })
  }
}

// export async function POST(request: NextRequest) {
//     const loggedIn = await getUser(request)
//     console.log('inside limitExceed route')
//     console.log('loggedIn', loggedIn)
//     if (loggedIn) {
//       const result = await checkIfLimitExceeded(loggedIn.uid)
//       console.log('result', result)
//       return NextResponse.json({ data: result  })
//     } else {
//       return NextResponse.json({ data: { result: true, message: 'User not found',tierName:null } })
//     }
//   }
