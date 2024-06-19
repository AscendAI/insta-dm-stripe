'use client'
import { Card } from '@/components/ui/card'

import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import { useEffect, useState } from 'react'
import { User } from 'firebase/auth'

import { BillingComponent } from '@/components/BillingComponent'
import {
  storeSubscriptionPlansMonthly,
  storeSubscriptionPlansYearly,
} from '@/config/subscriptions'
import { Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { FormAlert } from '@/components/form'
import { useUserStore } from '@/lib/stores'
import { getCurrentUser } from '@/lib/firebase/auth'

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
          // console.log("SS Plan: ",data.res)
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
      <div className="w-full flex flex-col justify-center items-center mb-10">
        <FormAlert />
        <div className="grid grid-cols-1">
          <a href="/download">
            <Button className="bg-[#51e0cf] p-5 col-span-1 w-full mb-3">
              Download Now!
            </Button>
          </a>
          <a href="https://discord.gg/2p78E39JEa">
            <Button className="bg-[#51e0cf] p-5 col-span-1 w-full mb-3">
              Discord Support!
            </Button>
          </a>
          <div className="grid grid-cols-2 gap-2">
            <a
              href="https://www.loom.com/share/bd0961e5c78a4725abf68272dea629c2?sid=8d32f558-dd1a-4fa0-846f-a1ab7e745a4a"
              target="blank"
            >
              <Button className="bg-[#51e0cf] p-5 col-span-1 w-full">
                Tutorial
              </Button>
            </a>
            <a
              href="https://pond-stingray-e73.notion.site/InstaDM-Guide-7986494b4140436ea94646531ce3b36b"
              target="blank"
            >
              <Button className="bg-[#51e0cf] p-5 col-span-1 w-full">
                Documentation
              </Button>
            </a>
          </div>
        </div>
      </div>

      {subscriptionPlan && (
        <Card className="p-6 mb-2 glassmorphic">
          <div className="flex flex-row justify-between">
            <div>
              <p className="text-lg font-semibold leading-none">
                {subscriptionPlan?.name}
              </p>
              <p className="text-sm text-muted-foreground">
                {!subscriptionPlan?.isSubscribed
                  ? 'You are not subscribed to any plan.'
                  : subscriptionPlan?.cancel_at_period_end
                  ? 'Your plan will be canceled on '
                  : 'Your plan renews on '}
                {subscriptionPlan?.isSubscribed &&
                subscriptionPlan?.stripeCurrentPeriodEnd
                  ? new Date(
                      subscriptionPlan.stripeCurrentPeriodEnd['_seconds'] * 1000
                    ).toLocaleDateString()
                  : null}
              </p>
            </div>
            <div className="flex flex-row gap-2">
              <Badge variant="secondary">Free Trial 7 Days</Badge>
              <Badge variant="secondary">No Refund</Badge>
            </div>
          </div>
        </Card>
      )}
      <Tabs defaultValue="monthly" className="w-auto">
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
