import { NextRequest, NextResponse } from 'next/server'

import {
  checkIfLimitExceeded_v2,
  getUser,
} from '@/lib/firebase/firestore/firebaseSDK'

export async function POST(request: NextRequest) {
  const loggedIn = await getUser(request)
  const { currentDate } = await request.json()

  console.log('inside limitExceed route')
  console.log('loggedIn', loggedIn)
  if (loggedIn) {
    const result = await checkIfLimitExceeded_v2(loggedIn.uid, currentDate)
    console.log('result', result)
    return NextResponse.json({ data: result })
  } else {
    return NextResponse.json({
      data: { result: true, message: 'User not found', tierName: null },
    })
  }
}


