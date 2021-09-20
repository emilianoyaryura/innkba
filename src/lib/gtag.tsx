import { useRouter } from 'next/router'
import { useEffect } from 'react'

const trackingId = 'G-PS4EEN0QQ4'

declare global {
  interface Window {
    gtag: any
  }
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: string) => {
  window.gtag('config', trackingId, {
    page_path: url
  })
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({
  action,
  category,
  label,
  value,
  nonInteraction = false
}: {
  action: string
  category: string
  label: string
  value: string
  nonInteraction?: boolean
}) => {
  window.gtag('event', action, {
    nonInteraction,
    event_category: category,
    event_label: label,
    value: value
  })
}

const GAScript = () => (
  <>
    <script
      async
      src={`https://www.googletagmanager.com/gtag/js?id=${trackingId}`}
    />
    <script
      dangerouslySetInnerHTML={{
        __html: `window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', '${trackingId}');`
      }}
    />
  </>
)

// Use this hook in _app.tsx
export const useAppGA = () => {
  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])
}

export default GAScript
