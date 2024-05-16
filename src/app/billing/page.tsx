'use client'
import { Card } from '@/components/ui/card'
import { useUserStore } from '@/lib/stores'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { getCurrentUser } from '@/lib/firebase/auth'
import { useEffect, useState } from 'react'
import { User } from 'firebase/auth'

import { BillingComponent } from '@/components/BillingComponent'
import {
  storeSubscriptionPlansMonthly,
  storeSubscriptionPlansYearly,
} from '@/config/subscriptions'
import { Loader2 } from 'lucide-react'

export default function Billing() {
  const [session, setSession] = useState<User | undefined>()
  const [subscriptionPlan, setSubscriptionPlan] = useState<any>(null)
  const { user } = useUserStore()
  useEffect(() => {
    const getSession = async () => {
      const session = await getCurrentUser()
      try {
        if (session) {
          const response = await fetch(`api/subscriptionPlan`, {
            method: 'POST',
            body: JSON.stringify(session),
          })
          const data = await response.json()
          setSubscriptionPlan(data.res)
          setSession(session!)
        }
      } catch (error) {
        console.log(error)
      }
    }
    getSession()
  }, [user])

  return (
    <div className="min-h-[calc(100vh-57px)] py-8 px-4 md:px-16 lg:px-24">
      {subscriptionPlan && (
        <Card className="p-6 mb-2 glassmorphic">
          <p className="text-lg font-semibold leading-none">
            {subscriptionPlan?.name}
          </p>
          <p className="text-sm text-muted-foreground">
            {!subscriptionPlan.isSubscribed
              ? 'You are not subscribed to any plan.'
              : subscriptionPlan?.cancel_at_period_end
              ? 'Your plan will be canceled on '
              : 'Your plan renews on '}
            {subscriptionPlan?.stripeCurrentPeriodEnd
              ? new Date(
                  subscriptionPlan.stripeCurrentPeriodEnd['_seconds'] * 1000
                ).toLocaleDateString()
              : null}
            {}
          </p>
        </Card>
      )}
      <Tabs defaultValue="monthly" className="w-auto">
        <TabsContent value="monthly">
          {subscriptionPlan && (
            <div className="md:flex justify-center  gap-4">
              {storeSubscriptionPlansMonthly.map((plan, index) => (
                <BillingComponent
                  key={index}
                  subscriptionPlan={subscriptionPlan}
                  session={session}
                  icon={plan.icon}
                  name={plan.name}
                  lead={plan.lead}
                  description={plan.description}
                  support={plan.support}
                  browser={plan.browser}
                  price={plan.price}
                  stripePriceId={plan.stripePriceId}
                />
              ))}
            </div>
          )}
        </TabsContent>
        <TabsContent value="yearly">
          {subscriptionPlan && (
            <div className="md:flex justify-center  gap-4">
              {storeSubscriptionPlansYearly.map((plan, index) => (
                <BillingComponent
                  key={index}
                  subscriptionPlan={subscriptionPlan}
                  session={session}
                  icon={plan.yearlyIcon}
                  name={plan.name}
                  lead={plan.lead}
                  description={plan.description}
                  support={plan.support}
                  browser={plan.browser}
                  price={plan.yearlyPrice}
                  stripePriceId={plan.stripePriceId}
                />
              ))}
            </div>
          )}
        </TabsContent>
        {!subscriptionPlan && (
          <Loader2 className="w-10 h-10 text-[#51e0cf] mx-auto animate-spin" />
        )}
        <div className="flex justify-center">
          <TabsList className="w-[15rem]">
            <TabsTrigger value="monthly" className="w-full">
              Monthly
            </TabsTrigger>
            <TabsTrigger value="yearly" className="w-full">
              Yearly
            </TabsTrigger>
          </TabsList>
        </div>
      </Tabs>
    </div>
  )
}
