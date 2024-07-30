import { NextRequest, NextResponse } from 'next/server'
import { updateDailyTrackingSuccess2 } from '@/lib/firebase/firestore/firebaseSDK'

export async function POST(request: NextRequest) {
  const { userId, dailyTrackingId, successString,loginProfile, time } = await request.json()

  if (userId) {
    await updateDailyTrackingSuccess2(
      userId,
      dailyTrackingId,
      successString,
      loginProfile,
      time
    )

    return NextResponse.json({ msg: 'auth/invalid-mac-address' })
  } else {
    return NextResponse.json({ msg: "UserId couldn't be found!" })
  }
}
