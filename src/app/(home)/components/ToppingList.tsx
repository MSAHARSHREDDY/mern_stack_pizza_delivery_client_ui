"use client"
import React from 'react'
import ToppingCard from './ToppingCard'
import { Topping } from '@/lib/types'

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

    const handleCheckBoxCheck=(topping:Topping)=>{
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
        </section>
  )
}

export default ToppingList
