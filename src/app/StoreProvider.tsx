'use client'
import { AppStore, makeStore } from '@/lib/store/store'
import { useRef } from 'react'
import { Provider } from 'react-redux'

{/**
    Here:
children is whatever you wrap inside <StoreProvider> ... </StoreProvider>.i.e from layout.tsx
That children is passed into the <Provider> from Redux, so all child components can access the store.
    */}
export default function StoreProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const storeRef = useRef<AppStore>(undefined)
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore()//Calls make store function
  }

  return <Provider store={storeRef.current}>{children}</Provider>
}
