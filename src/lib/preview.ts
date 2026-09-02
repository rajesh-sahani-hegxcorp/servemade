/**
 * Generates relative URL for Next.js Draft Mode preview route.
 * Evaluated server-side during Payload document view rendering.
 */
export const generatePreviewPath = ({
  path,
}: {
  path: string
}): string => {
  const secret = process.env.PREVIEW_SECRET || process.env.PAYLOAD_SECRET || ''
  const encodedParams = new URLSearchParams({
    path,
    secret,
  })
  return `/api/preview?${encodedParams.toString()}`
}
