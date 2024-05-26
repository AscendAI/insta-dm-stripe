import { getUser, checkSignInUser } from '@/lib/firebase/firestore/firebaseSDK'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {

  console.log("I am alive and kicking! PS:Vercel!")
  return NextResponse.json({ msg: 'I am alive and kicking! PS:Vercel!' })
}
