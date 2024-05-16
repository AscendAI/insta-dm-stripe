import { NextRequest, NextResponse } from 'next/server'
import { updateDailyTrackingSuccess } from '@/lib/firebase/firestore/firebaseSDK'

export async function POST(request: NextRequest) {
  const { userId, dailyTrackingId, successString, time } = await request.json()

  if (userId) {
    await updateDailyTrackingSuccess(
      userId,
      dailyTrackingId,
      successString,
      time
    )

    return NextResponse.json({ msg: 'auth/invalid-mac-address' })
  } else {
    return NextResponse.json({ msg: "UserId couldn't be found!" })
  }
}
