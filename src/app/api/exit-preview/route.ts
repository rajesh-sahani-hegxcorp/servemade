import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import { NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const redirectUrl = searchParams.get('redirect') || searchParams.get('path') || '/'

  // Disable Next.js Draft Mode
  const draft = await draftMode()
  draft.disable()

  redirect(redirectUrl)
}
