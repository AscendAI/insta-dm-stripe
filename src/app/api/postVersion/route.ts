import { NextRequest, NextResponse } from 'next/server'
import {
  getUser,
  updateVersionField,
} from '@/lib/firebase/firestore/firebaseSDK'

export async function POST(request: NextRequest) {
  const loggedIn = await getUser(request)
  // const { foundOutValue } = loggedIn
  if (loggedIn) {
    const data: { version: string } = await request.json()
    console.log('inside limitExceed route')
    console.log('loggedIn', loggedIn)

    const result = await updateVersionField(loggedIn.uid, data.version)
    console.log('result', result)
    return NextResponse.json({ data: result })
  }
  else {
    return NextResponse.json({ data: "User not found" })
  }


}


