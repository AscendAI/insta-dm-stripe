import { NextRequest, NextResponse } from 'next/server'
import { updateDailyTrackingTotal3 } from '@/lib/firebase/firestore/firebaseSDK'

export async function POST(request: NextRequest) {
  const { userId, dailyTrackingId, totalToAdd,currentDate } = await request.json()

  if (userId) {
    await updateDailyTrackingTotal3(userId, dailyTrackingId, totalToAdd)

    return NextResponse.json({ msg: 'auth/invalid-mac-address' })
  } else {
    return NextResponse.json({ msg: "UserId couldn't be found!" })
  }
}
