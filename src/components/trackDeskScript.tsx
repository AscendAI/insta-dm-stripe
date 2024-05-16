'use client'
import { useEffect } from 'react'

const TrackdeskScript = () => {
  useEffect(() => {
    // Your script logic here
    ;(function () {
      var cookie = document.cookie.match(
        '(^|;)\\s*trakdesk_cid\\s*=\\s*([^;]+)'
      )
      if (Array.isArray(cookie)) {
        try {
          // @ts-ignore
          var trakdeskCid = JSON.parse(cookie.pop())
          var cid = trakdeskCid['cid']
          document
            .querySelectorAll('a[href^="https://buy.stripe.com/"]')
            .forEach(function (a) {
              // @ts-ignore
              var url = new URL(a.href)
              url.searchParams.set('client_reference_id', cid)
              // @ts-ignore
              a.href = url.href
            })
        } catch (e) {
          console.log(e)
        }
      }
    })()
  }, [])

  return null // Since it's a script-only component, it doesn't render anything.
}

export default TrackdeskScript
