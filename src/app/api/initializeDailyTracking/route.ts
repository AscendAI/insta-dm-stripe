import { NextRequest, NextResponse } from 'next/server'
import { initializeDailyTracking } from '@/lib/firebase/firestore/firebaseSDK'

export async function POST(request: NextRequest) {
  const { userId,currentDate } = await request.json()

  if (userId) {
    
    let data = await initializeDailyTracking(userId,new Date(currentDate))

    return NextResponse.json({ data: data })
  } else {
    return NextResponse.json({ msg: 'userId not found' })
  }
}
