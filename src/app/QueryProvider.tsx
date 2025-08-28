"use client"
//React TanStack Query (formerly React Query) is a data-fetching and state management library for React applications.
import React from 'react'
import {QueryClient,QueryClientProvider} from "@tanstack/react-query"

const QueryProvider = ({children}:{children:React.ReactNode}) => {
    const queryClient=new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}

export default QueryProvider
