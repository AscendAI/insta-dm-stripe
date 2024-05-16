import { NextRequest, NextResponse } from 'next/server'
import { getUser } from '@/lib/firebase/firestore/firebaseSDK'
import { getMediaCommenters, getMediaId, getMediaLikers } from '@/lib/instagram'
import { handleError } from '@/lib/apiUtils'

export async function POST(request: NextRequest) {
  const loggedInToken = await getUser(request)
  if (!loggedInToken) {
    return handleError('Please login first')
  }

  const { mediaShortcode, likes, comments } = (await request.json()) as {
    mediaShortcode: string
    likes: number
    comments: number
  }

  if (!likes && !comments) {
    return handleError('Please select likes or comments')
  }

  const mediaReactions = {
    likes: null as
      | Awaited<ReturnType<typeof getMediaLikers>>['mediaLikers']
      | null,
    comments: null as Awaited<ReturnType<typeof getMediaCommenters>> | null,
  }

  let error = false

  try {
    let mediaId: string | null = null

    if (likes) {
      const mediaLikerRes = await getMediaLikers(mediaShortcode)
      mediaReactions.likes = mediaLikerRes?.mediaLikers?.slice(0, likes)
      mediaId = mediaLikerRes?.mediaId ?? null
    }

    if (comments) {
      mediaId = mediaId ? mediaId : await getMediaId(mediaShortcode)
      mediaReactions.comments = mediaId
        ? (await getMediaCommenters(mediaId, comments)).slice(0, comments)
        : null
    }
  } catch (e: any) {
    error = true
    console.error(e)
  }

  if (error && !mediaReactions.likes && !mediaReactions.comments) {
    return handleError('Error fetching media reactions')
  }

  return NextResponse.json(mediaReactions)
}
