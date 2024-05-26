import { NextRequest, NextResponse } from 'next/server'
import { getUser, tableDbFetch, } from '@/lib/firebase/firestore/firebaseSDK'


export async function POST(request: NextRequest) {

  const loggedIn = await getUser(request)
  const { tableLimit, tableOffset } = await request.json()
  console.log('tableLimit', tableLimit)
  console.log('tableOffset', tableOffset)
  if (loggedIn) {

    let result = await tableDbFetch(loggedIn.uid, parseInt(tableOffset), parseInt(tableLimit))
    console.log('result', result)

    return NextResponse.json({ result: result }, { status: 200 })
  } else {

    return NextResponse.json({ result: [] }, { status: 401 })
  }
}
