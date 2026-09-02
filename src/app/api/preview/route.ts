import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import { NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const secret = searchParams.get('secret')
  const slug = searchParams.get('slug')
  const collection = searchParams.get('collection')
  const path = searchParams.get('path')

  // Validate secret against PREVIEW_SECRET (or PAYLOAD_SECRET)
  const validSecret = process.env.PREVIEW_SECRET || process.env.PAYLOAD_SECRET
  if (!secret || secret !== validSecret) {
    return new Response('Invalid preview secret', { status: 401 })
  }

  // Enable Next.js Draft Mode
  const draft = await draftMode()
  draft.enable()

  // Resolve redirect destination
  let redirectUrl = '/'
  if (path) {
    redirectUrl = path
  } else if (slug && collection) {
    redirectUrl = `/${collection}/${slug}`
  } else if (slug) {
    redirectUrl = `/products/${slug}`
  }

  redirect(redirectUrl)
}
