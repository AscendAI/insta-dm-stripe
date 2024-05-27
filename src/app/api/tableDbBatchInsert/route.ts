import { NextRequest, NextResponse } from 'next/server'
import { getUser, tableDbBatchInsert } from '@/lib/firebase/firestore/firebaseSDK'


export async function POST(request: NextRequest) {
  const loggedIn = await getUser(request)

  const res = await request.json()
  console.log('tableDbBatchInsert name:', res)

  console.log('tableDbBatchInsert name2:', res.input.data)
  let { dateTime, data } = res.input
  // let name = res.input.data
  if (loggedIn) {
    console.log('try now:', data)
    await tableDbBatchInsert(loggedIn.uid, data, dateTime)
    return NextResponse.json({ loggedIn: loggedIn.uid }, { status: 200 })
  } else {
    console.log('Not Loggedin!')
    return NextResponse.json({ loggedIn: 'Not Loggedin!' }, { status: 401 })
  }
}
