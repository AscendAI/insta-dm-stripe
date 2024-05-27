import { NextRequest, NextResponse } from 'next/server'
import { getUser, tableDbDeleteSingleFromBanList, } from '@/lib/firebase/firestore/firebaseSDK'


export async function POST(request: NextRequest) {

  const loggedIn = await getUser(request)
  const { name } = await request.json()

  if (loggedIn) {

    let result = await tableDbDeleteSingleFromBanList(loggedIn.uid, name)
    console.log('result', result)

    return NextResponse.json({ result: result }, { status: 200 })
  } else {

    return NextResponse.json({ result: [] }, { status: 401 })
  }
}
