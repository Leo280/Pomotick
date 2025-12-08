import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { PropsWithChildren } from 'react'

// const client = new QueryClient({
//   defaultOptions: {
//     queries: {
//       networkMode: "offlineFirst",
//       refetchOnReconnect: true,
//       gcTime: 1000 * 60 * 60 * 24,
//     },
//     mutations: {
//       networkMode: "online",
//       retry: 3
//     }
//   }
// })
//
// const persister = createAsyncStoragePersister({
//   storage: AsyncStorage,
//   key: "RQ-STORAGE"
// })
//
// export function QueryProvider({ children }: PropsWithChildren) {
//   if (navigator.onLine) client.resumePausedMutations().catch(() => { })
//
//   return (
//     <PersistQueryClientProvider client={client} persistOptions={{ persister }}>
//       {children}
//     </PersistQueryClientProvider>
//   )
// }

const client = new QueryClient()

export function QueryProvider({ children }: PropsWithChildren) {
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>
}
