import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { createClient, Provider } from 'urql';
import { ChakraProvider } from '@chakra-ui/react'

// GraphQL client.
const client = createClient({
  url: 'http://localhost:4000/graphql',
});


function MyApp({ Component, pageProps }: AppProps) {
  console.log("app")
  return (
    <Provider value={client}>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </Provider>)
}

export default MyApp
