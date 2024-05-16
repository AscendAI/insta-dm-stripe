import './globals.css'
import type { Metadata } from 'next'
import TopMenu from '@/components/TopMenu'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { ThemeProvider } from '../components/theme-provider'
import AuthWrapper from '../components/AuthWrapper'
import Head from 'next/head'
import { Toaster } from '@/components/ui/sonner'
import TrackdeskScript from '../components/trackDeskScript' // Adjust the path as necessary
import Script from 'next/script'
export const metadata: Metadata = {
  title: 'InstaDm',
  description: 'One stop sollution for your Insta needs!.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Script strategy="afterInteractive" id="segment-script">
        {`
          !function(){var analytics=window.analytics=window.analytics||[];if(!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");
          else{analytics.invoked=!0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","debug","page","screen","once","off","on","addSourceMiddleware","addIntegrationMiddleware","setAnonymousId","addDestinationMiddleware","register"];
          analytics.factory=function(e){return function(){var t=Array.prototype.slice.call(arguments);t.unshift(e);analytics.push(t);return analytics}};
          for(var e=0;e<analytics.methods.length;e++){var t=analytics.methods[e];analytics[t]=analytics.factory(t)}
          analytics.load=function(e){var t=document.createElement("script");t.type="text/javascript";t.async=!0;t.src="https://cdn.segment.com/analytics.js/v1/"+e+"/analytics.min.js";
          var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(t,n)};
          analytics.SNIPPET_VERSION="4.1.0";
          analytics.load("NLJA8kbrpOFvkh8oeBODZslxLxmFffoQ");
          analytics.page();}}();
        `}
      </Script>

      <body className="w-full flex flex-col justify-center items-center">
        <SpeedInsights />
        <AuthWrapper>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
          <Toaster richColors />
        </AuthWrapper>
        <TrackdeskScript />
      </body>
    </html>
  )
}
