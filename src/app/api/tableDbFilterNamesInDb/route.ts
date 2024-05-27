import { NextRequest, NextResponse } from 'next/server'
import { getUser, tableDbFilterNamesInDb, } from '@/lib/firebase/firestore/firebaseSDK'


export async function POST(request: NextRequest) {

  const loggedIn = await getUser(request)
  const { nameList } = await request.json()

  if (loggedIn) {

    let result = await tableDbFilterNamesInDb(loggedIn.uid, nameList)
    console.log('nameList', nameList)
    console.log('result', result)

    return NextResponse.json({ result: result }, { status: 200 })
  } else {

    return NextResponse.json({ result: [] }, { status: 401 })
  }
}
