"use client"

import { useAppDispatch, useAppSelector } from '@/lib/store/hooks'
import Link from "next/link"   
import { ShoppingCart } from "lucide-react" 

import React from 'react'

const CartCounter = () => {
    //Here we are calling our store
    
    //Here name "cartItems" we are getting from initialState, file cartSice.ts line-8
    //Here name "cart" we are getting from store.ts i.e on line -6
    const cartItems=useAppSelector((state)=>state.cart.cartItems)//useAppSelector is used to fetch the value from store

  
  return (
 
  <div className="relative">
     <>
                        <Link href="/cart" >
                            <ShoppingCart className="hover:text-primary" />
                        </Link>
                        <span className="absolute -top-4 -right-5 h-6 w-6 flex items-center justify-center rounded-full bg-orange-500 font-bold text-white">
                            {cartItems.length}
                        </span>

                  
                    
  </>
    </div>
  )
}

export default CartCounter
