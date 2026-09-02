'use client'

import { RefreshRouteOnSave as PayloadLivePreview } from '@payloadcms/live-preview-react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export const LivePreviewListener: React.FC = () => {
  const router = useRouter()
  const [serverURL, setServerURL] = useState<string>(() => {
    if (typeof window !== 'undefined' && window.location.origin) {
      return window.location.origin
    }
    return process.env.NEXT_PUBLIC_SERVER_URL || ''
  })

  useEffect(() => {
    if (!serverURL && typeof window !== 'undefined' && window.location.origin) {
      setServerURL(window.location.origin)
    }
  }, [serverURL])

  if (!serverURL) {
    return null
  }

  return (
    <PayloadLivePreview
      refresh={() => router.refresh()}
      serverURL={serverURL}
    />
  )
}
