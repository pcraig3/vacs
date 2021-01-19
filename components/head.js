import React from 'react'
import NextHead from 'next/head'
import { string } from 'prop-types'
import { GA_TRACKING_ID } from '../config/gtag'

const defaultDescription =
  'Canada Vaccine Tracker charts the progress of vaccinations in Canada over the course of 2021.'
const defaultOGURL = 'https://canada-vaccine-tracker.ca'
const defaultOGImage = 'https://canada-vaccine-tracker.ca/android-chrome-512x512.png'

const Head = (props) => (
  <NextHead>
    <meta charSet="UTF-8" />

    <title>{props.title || ''}</title>
    {process.env.NEXT_PUBLIC_GITHUB_SHA && (
      <meta name="keywords" content={`GITHUB_SHA=${process.env.NEXT_PUBLIC_GITHUB_SHA}`} />
    )}
    {process.env.VERSION && <meta name="keywords" content={`VERSION=${process.env.VERSION}`} />}
    <meta name="description" content={props.description || defaultDescription} />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
    <link rel="icon" href="/favicon.ico" />
    <link rel="manifest" href="/site.webmanifest"></link>

    <meta property="og:url" content={props.url || defaultOGURL} />
    <meta property="og:title" content={props.title || ''} />
    <meta property="og:description" content={props.description || defaultDescription} />
    <meta name="twitter:site" content={props.url || defaultOGURL} />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:image" content={props.ogImage || defaultOGImage} />
    <meta property="og:image" content={props.ogImage || defaultOGImage} />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />

    <link rel="preconnect" href="https://fonts.gstatic.com" />
    <link
      href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap"
      rel="stylesheet"
    />
    <link
      href="https://fonts.googleapis.com/css2?family=Piazzolla:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,400;1,500&display=swap"
      rel="stylesheet"
    />

    {process.env.NODE_ENV === 'production' && (
      <>
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`} />
        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
          }}
        />
      </>
    )}
  </NextHead>
)

Head.propTypes = {
  title: string,
  description: string,
  url: string,
  ogImage: string,
}

export default Head
