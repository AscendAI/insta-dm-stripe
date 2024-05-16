'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { Loader2 } from 'lucide-react'
import { AnalyticsBrowser } from '@segment/analytics-next'
import { auth } from '@/lib/firebase/firestore/firebaseDb'
import { signUp } from '@/lib/firebase/auth'
import Link from 'next/link'

const analytics = AnalyticsBrowser.load({
  writeKey: 'NLJA8kbrpOFvkh8oeBODZslxLxmFffoQ',
})

function Page(): JSX.Element {
  const [email, setEmail] = useState('')
  const [password1, setPassword1] = useState('')
  const [password2, setPassword2] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  let handleSignup = async (email: string, password: string) => {
    try {
      const { result, error } = await signUp(email, password)
      const token = await auth.currentUser?.getIdToken(true)
      const userId = result?.user?.uid!
      const mac = null

      const response = await fetch(`/api/newUser`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ token, userId, email, mac }),
      })
    } catch {
      return toast.error('An error occurred during sign-in')
    }
  }

  const handleForm = async (event: { preventDefault: () => void }) => {
    event.preventDefault()
    if (password1 !== password2) {
      // console.log(password1, password2)
      toast.error('Passwords do not match')
      return
    }

    // Attempt to sign in with provided email and password

    try {
      setLoading(true)
      await handleSignup(email, password1)
      setLoading(false)
      let clicksource = new URLSearchParams(window.location.search).get(
        'source'
      )
      // console.log(clicksource)
      if (clicksource == 'ai-ads') {
        analytics.track('SignUp', { email: email })
        // console.log('stuff is working', email)
      }
    } catch {
      setLoading(false)
      toast.error('An error occurred during sign-in')
      console.error('An error occurred during sign-in')
    }

    // Redirect to the admin page
    router.push('/')
  }

  return (
    <>
      <div className="flex justify-center items-center container h-screen">
        <Card className="w-1/3 glassmorphic mb-40 max-sm:min-w-[300px]">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Sign Up</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <form onSubmit={handleForm} className="space-y-4">
              <div className="relative"></div>

              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  onChange={(e) => setEmail(e.target.value)}
                  id="email"
                  type="email"
                  placeholder="emai@example.com"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password1">Password</Label>
                <Input
                  onChange={(e) => setPassword1(e.target.value)}
                  id="password1"
                  type="password"
                  placeholder="password"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password2">Confirm Password</Label>
                <Input
                  onChange={(e) => setPassword2(e.target.value)}
                  id="password2"
                  type="password"
                  placeholder="password"
                />
              </div>
              <Button
                disabled={!password1 || !password2}
                className="w-full text-center"
              >
                <div>
                  {loading ? (
                    <Loader2 className="w-8 h-8 text-[#434948] mx-auto animate-spin" />
                  ) : (
                    'Sign Up'
                  )}
                </div>
              </Button>
            </form>
            <div className="text-center">
              <Link
                href='/signin'
                className="text-sm text-blue-500 cursor-pointer hover:text-blue-700 hover:underline"
              >
                Login to existing account
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}

export default Page
