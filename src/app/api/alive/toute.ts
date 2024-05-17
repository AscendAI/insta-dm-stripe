import { getUser, checkSignInUser } from '@/lib/firebase/firestore/firebaseSDK'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  // const loggedIn = await getUser(request)
  // const { userId, mac } = await request.json()

  // if (loggedIn) {
  //   const { error }: { user: any; error: { code?: string } } =
  //     await checkSignInUser(userId, mac)

  //   if (error?.code === 'auth/user-not-found') {
  //     return NextResponse.json({ msg: 'auth/user-not-found' })
  //   }

  //   if (error?.code === 'auth/invalid-mac-address') {
  //     return NextResponse.json({ msg: 'auth/invalid-mac-address' })
  //   }

  //   if (error?.code == 'no error') {
  //     return NextResponse.json({ msg: 'no error' })
  //   }

  //   return NextResponse.json({ msg: 'Unexpected error occurred' })
  // } else {
  //   return NextResponse.json({ msg: 'Please login first' })
  // }
  return NextResponse.json({ msg: 'I am alive and kicking! PS:Vercel!' })
}
