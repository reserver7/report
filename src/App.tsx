// src/App.tsx
import Dashboard from '@components/Dashboard'
import { AlertContextProvider } from '@contexts/AlertContext'
import { Global } from '@emotion/react'
import globalStyles from '@styles/globalStyles'
import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { RecoilRoot } from 'recoil'

const queryClient = new QueryClient()

const App: React.FC = () => {
  return (
    <>
      <Global styles={globalStyles} />
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <AlertContextProvider>
            <Dashboard />
          </AlertContextProvider>
        </QueryClientProvider>
      </RecoilRoot>
    </>
  )
}

export default App
