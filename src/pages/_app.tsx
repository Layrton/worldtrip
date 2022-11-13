import { ChakraProvider } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import { theme } from '../styles/theme'
import NextNProgress from 'nextjs-progressbar'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import '../styles/slides.scss'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <NextNProgress
        color="#FFBA08"
        startPosition={0.3}
        stopDelayMs={200}
        height={5}
      />
      <Component {...pageProps} />
    </ChakraProvider>
  )
}
