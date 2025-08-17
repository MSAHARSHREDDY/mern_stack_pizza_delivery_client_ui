"use client"
import React from 'react'
import ToppingCard from './ToppingCard'
import { Topping } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { ShoppingCart } from 'lucide-react'

const toppings=[
    {
        id:"1",
        name:"chicken",
        image:"/chicken.png",
        price:50,
        isAvailable:true
    },
     {
        id:"2",
        name:"jelapeno",
        image:"/jelapeno.png",
        price:150,
        isAvailable:true
    },
     {
        id:"3",
        name:"cheese",
        image:"/cheese.png",
        price:250,
        isAvailable:true
    },
]
const ToppingList = () => {
    //This is used for selecting topping
    const [selectedToppings,setSelectedToppings]=React.useState([
        toppings[0]
    ])
     console.log("selectedToppings",selectedToppings)

     //It is used to handle Tick mark 
    const handleCheckBoxCheck=(topping:Topping)=>{
        console.log("selectedToppings in handleCheckBoxCheck",selectedToppings)
        const isAlreadyExists=selectedToppings.some((element)=>element.id===topping.id)
        if(isAlreadyExists){
            setSelectedToppings((prev)=>prev.filter((elm)=>elm.id!==topping.id))
            return
        }
        setSelectedToppings((prev)=>[...prev,topping])
    }
  return (
     <section className="mt-6">
            <h3>Extra toppings</h3>
            <div className="grid grid-cols-3 gap-4 mt-2">
            {
                toppings.map((topping)=>(
                    //Here left side topping,selectedToppings,handleCheckBoxCheck is the name of the prop and right side topping,selectedToppings,handleCheckBoxCheck where we are the passing the actual value
                     <ToppingCard topping={topping} key={topping.id} selectedToppings={selectedToppings} handleCheckBoxCheck={handleCheckBoxCheck}/>
                ))
            }
            </div>

            <div className='flex items-center justify-between mt-8'>
                <span className='font-bold'>₹400</span>
                <Button className='bg-orange-600'>
                    <ShoppingCart/>
                    <span>AddToCart</span>
                </Button>
            </div>
        </section>
  )
}

export default ToppingList
