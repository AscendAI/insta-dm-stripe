"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import { toast } from "@/components/ui/use-toast";

import { Loader2 } from "lucide-react";

interface ManageUserSubscriptionButtonProps {
  userId: string;
  email: string;
  subscriptionPlanFromStripe: any;
  isCurrentPlan: boolean;
  isSubscribed: boolean;
  stripeCustomerId?: string | null;
  stripePriceId: string;
}

export function ManageUserSubscriptionButton({
  userId,
  email,
  subscriptionPlanFromStripe,
  isCurrentPlan,
  isSubscribed,
  stripeCustomerId,
  stripePriceId,
}: ManageUserSubscriptionButtonProps) {
  const [isPending, startTransition] = React.useTransition();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    

    startTransition(async () => {
      try {
        const response = await fetch('api/subscription', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email,
            userId,
            isSubscribed,
            isCurrentPlan,
            stripeCustomerId,
            stripePriceId,
          })
        });
    
        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }
    
        const data = await response.json();
        if (data && data.res) {
          window.location.href = data.res.url ?? "/dashboard/billing";
        } else {
          // Handle the case where data is not as expected
          console.error('Response JSON is missing the expected property');
        }
      } catch (err) {
        console.error((err as Error).message);
        toast({ description: "Something went wrong, please try again later." });
      }
    });

  };
  
  return (
    <form onSubmit={handleSubmit}>
      <Button disabled={isPending}>
        {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {subscriptionPlanFromStripe.stripePriceId==stripePriceId ? "Manage Subscription" : "Subscribe"}
      </Button>
    </form>
  );
}
