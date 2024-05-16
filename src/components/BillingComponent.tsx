'use client'
import React from 'react'
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { TiTick } from 'react-icons/ti'
import { ManageUserSubscriptionButton } from '@/components/manage-user-subscription-button'
import SignInBtn from '@/components/sign-in-btn'
import { User } from 'firebase/auth'
export function BillingComponent({
  subscriptionPlan,
  session,
  icon,
  name,
  description,
  lead,
  support,
  browser,
  price,
  stripePriceId,
}: {
  key: any
  subscriptionPlan: any
  session: User | undefined
  icon: any
  name: string
  description: string
  lead: string
  support: string
  browser: string
  price: number
  stripePriceId: string
}) {
  return (
    <Card
      className={`flex flex-col text-center md:w-[18rem] mb-5 glassmorphic ${
        subscriptionPlan?.stripePriceId === stripePriceId
          ? 'border-[#51e0cf]'
          : ''
      }`}
    >
      <CardHeader>
        <div className="flex justify-center text-5xl">{icon}</div>
        <CardTitle>{name}</CardTitle>
        {name == 'Free' ? (
          <div className="py-5 text-lg font-semibold">Free Trial 7 Days</div>
        ) : (
          <div></div>
        )}
      </CardHeader>
      <CardDescription className="text-lg flex justify-center items-center gap-2">
        <TiTick className="text-2xl" /> {description}
      </CardDescription>
      <CardDescription className="text-lg flex justify-center items-center gap-2">
        <TiTick className="text-2xl" /> {lead}
      </CardDescription>
      <CardDescription className="text-lg flex justify-center items-center gap-2">
        <TiTick className="text-2xl" /> {support}
      </CardDescription>
      <CardDescription className="text-lg flex justify-center items-center gap-2">
        <TiTick className="text-2xl" /> {browser}
      </CardDescription>
      <CardDescription className="text-lg flex justify-center items-center gap-2">
        <TiTick className="text-2xl" /> Unlimitted traffic
      </CardDescription>
      <CardDescription className="text-lg flex justify-center items-center gap-2 pb-5">
        <TiTick className="text-2xl" /> Proxy Support
      </CardDescription>
      <div className="grow"></div>

      {price === 0 ? (
        <CardFooter className="text-xl font-semibold flex flex-col justify-center items-center">
          <h2 className="text-4xl">Free</h2>
          <div className="text-lg">7 days</div>
        </CardFooter>
      ) : (
        <>
          <CardFooter className="text-xl font-semibold flex justify-center items-end">
            <h2 className="text-4xl">${price}</h2>/month
          </CardFooter>
          <CardFooter className="flex justify-center items-center">
            {session?.uid ? (
              <ManageUserSubscriptionButton
                userId={session.uid}
                subscriptionPlanFromStripe={subscriptionPlan}
                email={session.email || ''}
                stripePriceId={stripePriceId}
                stripeCustomerId={subscriptionPlan?.stripeCustomerId}
                isSubscribed={subscriptionPlan.isSubscribed}
                isCurrentPlan={subscriptionPlan?.name === name}
              />
            ) : (
              <SignInBtn />
            )}
          </CardFooter>
        </>
      )}
    </Card>
  )
}
