import { NextRequest, NextResponse } from 'next/server'
import { getUser, tableDbInsert } from '@/lib/firebase/firestore/firebaseSDK'


export async function POST(request: NextRequest) {
  const loggedIn = await getUser(request)

  const { name, dateTime } = await request.json()

  if (loggedIn) {

    await tableDbInsert(loggedIn.uid, name, dateTime)

    return NextResponse.json({ loggedIn: loggedIn.uid }, { status: 200 })
  } else {

    return NextResponse.json({ loggedIn: 'Not Loggedin!' }, { status: 401 })
  }
}
