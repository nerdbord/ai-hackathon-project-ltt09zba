'use client'

import { QueryClient, QueryClientProvider } from 'react-query'

interface ReactQueryClientProviderProps {
  children: React.ReactNode
}

const ReactQueryClientProvider = ({
  children,
}: ReactQueryClientProviderProps) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  })

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

export default ReactQueryClientProvider
