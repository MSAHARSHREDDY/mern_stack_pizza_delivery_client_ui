// CartCounterWrapper.tsx (Client Component)
"use client"

import dynamic from "next/dynamic"

const CartCounterWithoutSSR = dynamic(() => import("./CartCounter"), { ssr: false })

export default function CartCounterWrapper() {
  return <CartCounterWithoutSSR />
}
