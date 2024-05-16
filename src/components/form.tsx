'use client'
import React, { useEffect, useState } from 'react'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { usePathname } from 'next/navigation'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
// import { toast } from "@/components/ui/use-toast"
import { Button } from '@/components/ui/button'
import { createPublicKey } from 'crypto'
const FormSchema = z.object({
  type: z.enum(['advertising', 'organic', 'referred', 'google', 'discord'], {
    required_error: 'You need to select an option.',
  }),
})
import { useUserStore } from '@/lib/stores'

export function QueryForm({
  clickSubmit,
}: {
  clickSubmit: (data: z.infer<typeof FormSchema>) => Promise<void>
}) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log('kaj kore', data)
    clickSubmit(data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-6">
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1 "
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="advertising" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Advertising (Instagram Ads, Facebook Ads)
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="organic" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Organic Content (Instagram Post, Facebook Post)
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="referred" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Referred By Friend
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="google" />
                    </FormControl>
                    <FormLabel className="font-normal">Google Search</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="discord" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Discord Referral
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}

import { getCurrentUser } from '@/lib/firebase/auth'
import { queryFoundOutField } from '@/lib/firebase/firestore/firebaseDb'

export function FormAlert() {
  const { user } = useUserStore()
  const id = user?.uid
  const [res, setRes] = useState(true)

  useEffect(() => {
    try {
      queryFoundOutField(id!).then((res) => {
        setRes(res)
      })
    } catch (er) {
      console.log(er)
    }
  }, [])

  useEffect(() => {
    if (!res) {
      const timer = setTimeout(() => {
        const openButton = document.getElementById('Open')
        openButton?.click()
      }, 2000) // waits for 1 second before clicking

      return () => clearTimeout(timer)
    }
  }, [res])

  const clickSubmit = async (value: z.infer<typeof FormSchema>) => {
    // ignore the error
    const session = await getCurrentUser()
    const token = await session?.getIdToken(true)
    if (session) {
      // console.log("SS Plan: ",data.res)
      const id = session.uid
      const response = await fetch(`api/heardFrom`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id, value }),
      })
      const data = await response.json()
      const submitButton = document.getElementById('submit_continue')
      console.log('clicking on submit')
      submitButton?.click()
    }
  }

  const excludedRoutes = ['/forgotPassword', '/signin', '/signup']
  const pathname = usePathname()
  if (excludedRoutes.includes(pathname)) {
    return
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger className="hidden hello" id="Open">
        Open
      </AlertDialogTrigger>
      <AlertDialogContent className="glassmorphic">
        <AlertDialogHeader>
          <AlertDialogTitle>From Where did you hear about us?</AlertDialogTitle>
          <AlertDialogDescription>
            {/* k */}
            <QueryForm clickSubmit={clickSubmit} />
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="hidden">
          <AlertDialogAction id="submit_continue">Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
