import merge from 'deepmerge'
import Router from 'next/router'
import { useMemo } from 'react'
import { ApolloClient, InMemoryCache, createHttpLink, from, Observable, FetchResult, NormalizedCacheObject } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { onError } from '@apollo/client/link/error'
import { getAccessToken } from './auth'
import { getRefreshToken, setAccessToken, setRefreshToken, isAccessTokenValid } from './auth'

let apolloClient: ApolloClient<NormalizedCacheObject>

const refreshTokens = async () => {
  const refreshToken = getRefreshToken()
  const request = await fetch(process.env.API_URL!, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `query refreshTokens($refreshToken: String!) {
        refreshTokens(refreshToken: $refreshToken) {
          accessToken
          refreshToken
        }
      }
    `,
      variables: {
        refreshToken,
      },
    }),
  })
  const resp = await request.json()
  if (resp.errors !== undefined) {
    console.log(resp.errors)
    setAccessToken('')
    setRefreshToken('')
    localStorage.removeItem('user')
    Router.push('/')
  } else {
    setAccessToken(resp.data.refreshTokens.accessToken)
    setRefreshToken(resp.data.refreshTokens.refreshToken)
  }
}

const getAuthHeaders = async () => {
  const headers: HeadersInit = {}
  let token = getAccessToken()
  if (token) {
    if (!isAccessTokenValid()) {
      console.log('refreshTokens')
      await refreshTokens()
    }
    token = getAccessToken()
    headers['Authorization'] = token
  }
  return headers
}

const httpLink = createHttpLink({
  uri: process.env.API_URL!,
  credentials: 'include',
})

const authLink = setContext(async (_, { headers }) => {
  return {
    headers: {
      ...headers,
      ...(await getAuthHeaders()),
    },
  }
})

const errorLink = onError(({ graphQLErrors, networkError }): Observable<FetchResult> | void => {
  if (graphQLErrors) {
    console.log(`graphQLErrors: ${JSON.stringify(graphQLErrors, null, 2)}`)
  }
  if (networkError) {
    console.log(`networkError: ${JSON.stringify(networkError, null, 2)}`)
  }
})

const createApolloClient = () => {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: from([errorLink, authLink, httpLink]),
    cache: new InMemoryCache(),
    ssrForceFetchDelay: 100,
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'cache-and-network',
        errorPolicy: 'all',
      },
      query: {
        fetchPolicy: 'network-only',
        errorPolicy: 'all',
      },
      mutate: {
        fetchPolicy: 'network-only',
        errorPolicy: 'all',
      },
    },
  })
}

export const initializeApollo = (initialState = null): ApolloClient<NormalizedCacheObject> => {
  const _apolloClient = apolloClient ?? createApolloClient()
  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // get hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract()
    // Merge the existing cache into data passed from getStaticProps/getServerSideProps
    const data = merge(initialState, existingCache)
    // Restore the cache with the merged data
    _apolloClient.cache.restore(data)
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient
  return _apolloClient
}

export function useApollo(initialState: any) {
  const store = useMemo(() => initializeApollo(initialState), [initialState])
  return store
}
