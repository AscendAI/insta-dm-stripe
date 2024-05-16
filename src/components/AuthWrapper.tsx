'use client'

import React, { useEffect, useState } from 'react'

import { useRouter, usePathname } from 'next/navigation'
import { Loader2 } from 'lucide-react'
import { useUserStore } from '@/lib/stores'
import { subscribeToAuthChanges } from '@/lib/firebase/auth'

interface WrapperProps {
  children: React.ReactNode
}
export default function AuthWrapper(props: WrapperProps) {
  const setUser = useUserStore((state) => state.setUser)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()
  useEffect(() => {
    const excludedRoutes = ['/forgotPassword', '/signin', '/signup']

    const unsubscribe = subscribeToAuthChanges((user: any) => {
      if (user) {
        // console.log("User: ",user)
        setUser({ uid: user.uid, email: user.email })
      } else {
        setUser(null)
        if (!excludedRoutes.includes(pathname)) {
          router.push('/signin')
        }
      }
      // Set loading to false once authentication state is determined
      setLoading(false)
    })

    // Unsubscribe from the authentication state changes when the component is unmounted
    return unsubscribe
  }, [pathname, router, setUser])

  if (loading) {
    return (
      <div className="bg-black w-full h-screen flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-[#51e0cf] mx-auto animate-spin" />
      </div>
    )
  }
  return props.children
}
