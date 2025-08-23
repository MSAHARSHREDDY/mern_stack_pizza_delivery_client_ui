"use client"
import React, { startTransition, useEffect, useState } from 'react'
import ToppingCard from './ToppingCard'
import { Topping } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { ShoppingCart } from 'lucide-react'
import { useSearchParams } from 'next/navigation'

const ToppingList = ({selectedToppings,handleCheckBoxCheck}:{selectedToppings:Topping[],handleCheckBoxCheck:(topping:Topping)=>void}) => {

    const searchParams=useSearchParams()
    const [toppings, setToppings] = useState<Topping[]>([])//If you keep empty array you could avoid from undefined error

    {/********fetching all toppping from backend********************* */ }
    {/**We need to use useEffect when we are using "use client" to fetch data */ }
    useEffect(() => {
        const fetchData = async () => {
            const toppingResponse = await fetch(`${process.env.NEXT_PUBLIC_FETCH_TOPPINGS}?tenantId=${searchParams.get("restaurantId")}`)
            const toppings = await toppingResponse.json()
            setToppings(toppings)
            console.log("toppings", toppings)
        }
        fetchData()
    }, [])


   
    return (
        <section className="mt-6">
            <h3>Extra toppings</h3>
            <div className="grid grid-cols-3 gap-4 mt-2">
                {
                    toppings.map((topping) => (
                        //Here left side topping,selectedToppings,handleCheckBoxCheck is the name of the prop and right side topping,selectedToppings,handleCheckBoxCheck where we are the passing the actual value
                        <ToppingCard topping={topping} key={topping._id} selectedToppings={selectedToppings} handleCheckBoxCheck={handleCheckBoxCheck} />
                    ))
                }
            </div>
        </section>
    )
}

export default ToppingList
