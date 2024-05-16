import { NextRequest, NextResponse } from 'next/server'
import { createUser, getUser } from '@/lib/firebase/firestore/firebaseSDK'
import { sendEmail } from '@/lib/utils'

export async function POST(request: NextRequest) {
  const loggedIn = await getUser(request)

  const { userId, email, mac } = await request.json()

  if (loggedIn) {
    await createUser(userId, email, mac)
    console.log('this the email', email)
    await sendEmail({ email: email })

    return NextResponse.json({ loggedIn: loggedIn.uid })
  } else {
    return NextResponse.json({ loggedIn: 'Not Loggedin!' })
  }
}
