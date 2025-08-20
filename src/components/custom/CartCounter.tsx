"use client"
import { increment } from '@/lib/store/features/cart/cartSice'
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks'
import { Link, ShoppingBasket } from 'lucide-react'
import React from 'react'

const CartCounter = () => {
    //Here we are calling our store
    const dispatch=useAppDispatch()// useDispatch is going to perform the actions
    //Here name "value" we are getting from initialState, file cartSice.ts line-8
    //Here name "cart" we are getting from store.ts i.e on line -6
    const value=useAppSelector((state)=>state.cart.value)

    const handleIncrement=()=>{
            dispatch(increment())
    }
  return (
  <>
  <div className="relative">
                        <Link href="/cart" >
                            <ShoppingBasket className="hover:text-primary" />
                        </Link>
                        <span className="absolute -top-4 -right-5 h-6 w-6 flex items-center justify-center rounded-full bg-orange-500 font-bold text-white">
                            {value}
                        </span>

                    </div>
                    <button onClick={handleIncrement}>Increment</button>
  </>
  )
}

export default CartCounter
