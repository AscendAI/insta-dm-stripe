import { NextRequest, NextResponse } from 'next/server'
import { getUser, updateFoundOutField } from '@/lib/firebase/firestore/firebaseSDK'


export async function POST(request: NextRequest) {
  const loggedIn = await getUser(request)
  // const { foundOutValue } = loggedIn
  if (loggedIn) {
    const data: { id: string, value: { type: string } } = await request.json()
    console.log('inside limitExceed route')
    console.log('loggedIn', loggedIn)

    const result = await updateFoundOutField(data.id, data.value)
    console.log('result', result)
    return NextResponse.json({ data: result })
  }
  else {
    return NextResponse.json({ data: "User not found" })
  }


}

