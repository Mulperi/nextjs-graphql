import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { Provider, createClient, dedupExchange, fetchExchange } from 'urql';
import { cacheExchange } from '@urql/exchange-graphcache';
import { QueryUsersTasks } from '.';


// GraphQL client configuration.
const cache = cacheExchange({
  updates: {
    // We tell graphcache that this field is a mutation, we can also do Subscription
    Mutation: {
      // The name of the field
      createUser: (result, args, cache) => {
        cache.updateQuery({ query: QueryUsersTasks }, (data: any) => {
          return { ...data, users: [...data.users, result.createUser] }
        })
      },
      createTask: (result, args, cache) => {
        cache.updateQuery({ query: QueryUsersTasks }, (data: any) => {
          return { ...data, tasks: [...data.tasks, result.createTask] }
        })
      },
    },
  }
});
const client = createClient({
  url: 'http://localhost:4000/graphql',
  exchanges: [dedupExchange, cache, fetchExchange],
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
