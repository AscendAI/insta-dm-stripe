'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  signIn,
  resetPassword,
  checkEmailInDatabase,
} from '@/lib/firebase/auth'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'
import Link from 'next/link'
function Page(): JSX.Element {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const handleForm = async (event: { preventDefault: () => void }) => {
    event.preventDefault()
    setLoading(true)
    const { result, error } = await signIn(email, password)
    setLoading(false)
    if (error) {
      toast.error('Email is not registered or the password is incorrect.')
      return
    }
    if (result?.user) {
      router.push('/')
    }
  }

  const handleForgotPassword = async () => {
    if (!email) {
      toast.error('Please enter your email first.')
      return
    }
    try {
      const isEmailRegistered = await checkEmailInDatabase(email)

      if (isEmailRegistered.result == 0) {
        toast.error('Email not registered in the database.')
        return
      }

      const { error } = await resetPassword(email)

      if (error) {
        toast.error('Failed to send, enter a valid Email Address.')
      } else {
        toast.success('Check your Email for further instruction.')
      }
    } catch (error) {
      toast.success('Failed to send password reset email.')
    }
  }

  return (
    <div className="flex justify-center items-center container h-screen">
      <Card className="w-1/3 glassmorphic mb-40 max-sm:min-w-[300px]">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">Log In</CardTitle>
          <CardDescription className="text-center">
            Good to see you again
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <form onSubmit={handleForm} className="space-y-4">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                type="email"
                placeholder="m@example.com"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                type="password"
                placeholder="password"
              />
            </div>
            <Button disabled={!password} className="w-full">
              <div>
                {loading ? (
                  <Loader2 className="w-8 h-8 text-[#434948] mx-auto animate-spin" />
                ) : (
                  'Log In'
                )}
              </div>
            </Button>
          </form>
          <div className="text-center">
            <a
              onClick={handleForgotPassword}
              className="text-sm text-blue-500 cursor-pointer hover:text-blue-700 hover:underline"
            >
              Forgot Password?
            </a>
          </div>
          <div className="text-center">
            <Link
              href="/signup"
              className="text-sm text-blue-500 cursor-pointer hover:text-blue-700 hover:underline"
            >
              Create new account
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Page
