import { NextRequest, NextResponse } from 'next/server'

import {
  checkIfLimitExceeded,
  getUser,
} from '@/lib/firebase/firestore/firebaseSDK'

export async function POST(request: NextRequest) {
  const loggedIn = await getUser(request)
  console.log('inside limitExceed route')
  console.log('loggedIn', loggedIn)
  if (loggedIn) {
    const result = await checkIfLimitExceeded(loggedIn.uid)
    console.log('result', result)
    return NextResponse.json({ data: result })
  } else {
    return NextResponse.json({
      data: { result: true, message: 'User not found', tierName: null },
    })
  }
}
