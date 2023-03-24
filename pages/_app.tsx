
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import Footer from '@/components/Footer';
import awsExports from '../src/aws-exports';
import { Amplify, API, Auth, withSSRContext } from 'aws-amplify';
Amplify.configure({ ...awsExports, ssr: true });
export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
      <Footer />
    </ChakraProvider>

  )
}
