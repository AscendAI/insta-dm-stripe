import { NextRequest, NextResponse } from 'next/server'
import { getUser, tableDbGetTableSize } from '@/lib/firebase/firestore/firebaseSDK'
import { log } from 'console'


export async function POST(request: NextRequest) {
  const loggedIn = await getUser(request)

  const { name } = await request.json()

  if (loggedIn) {

    let tableSize = await tableDbGetTableSize(loggedIn.uid)

    return NextResponse.json({ result: tableSize }, { status: 200 })
  } else {

    return NextResponse.json({ result: 0 }, { status: 401 })
  }
}
