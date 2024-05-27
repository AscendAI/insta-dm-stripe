import { NextRequest, NextResponse } from 'next/server'
import { getUser, tableDbRetrieveDataFromDatabase } from '@/lib/firebase/firestore/firebaseSDK'


export async function POST(request: NextRequest) {

  const loggedIn = await getUser(request)
  if (loggedIn) {
    let result = await tableDbRetrieveDataFromDatabase(loggedIn.uid)
    console.log('result', result)

    return NextResponse.json({ result: result }, { status: 200 })
  } else {

    return NextResponse.json({ result: [] }, { status: 401 })
  }
}
