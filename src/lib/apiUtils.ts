import { NextResponse } from 'next/server'

export function handleError(message: string) {
  return NextResponse.json({ msg: message })
}
