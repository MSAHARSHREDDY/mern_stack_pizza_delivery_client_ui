'use client';
import Image from 'next/image';
import React, { startTransition, Suspense, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import ToppingList from './ToppingList';
import { Product, Topping } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { SkeletonCard } from './SkeletonCard';
import { useAppDispatch } from '@/lib/store/hooks';
// import {addToCart} from "@/lib/store/features/cart/cartSice"
import {addToCart} from '@/lib/store/features/cart/cartSice';

type ChosenConig = {
    [key: string]: string
}

const ProductModal = ({ product }: { product: Product }) => {

    const dispatch=useAppDispatch()//It isused to trigger your action of addToCart

    //Here we are fetching the default values of "size" and "crust"
    const defaultConfiguration=Object.entries(product.category.priceConfiguration).map(([Key,value])=>{
        return{[Key]:value.availableOptions[0]}
    }).reduce((acc,curr)=>({...acc,...curr}),{})//here reduce helps converting map array to object
    console.log("defeault configuration",defaultConfiguration)

    const [chosenConfig, setChosenConfig] = useState<ChosenConig>(defaultConfiguration as unknown as ChosenConig)

     //This is used for selecting topping
    const [selectedToppings, setSelectedToppings] = React.useState<Topping[]>([])
    console.log("selectedToppings", selectedToppings)

    //It is used to handle Tick mark in topping
    const handleCheckBoxCheck = (topping: Topping) => {
        console.log("selectedToppings in handleCheckBoxCheck", selectedToppings)
        const isAlreadyExists = selectedToppings.some((element: Topping) => element._id === topping._id)

        startTransition(() => {
            if (isAlreadyExists) {
                setSelectedToppings((prev) => prev.filter((elm: Topping) => elm._id !== topping._id))
                return
            }
            setSelectedToppings((prev: Topping[]) => [...prev, topping])
        })

    }
    
    const handleRadioChange = (key: string, data: string) => {
        {/**
            It stores in this format
            {
            Size:"Medium",
            Crust:"Thin"
            }
         */}
        console.log("key", key, "data", data)
        startTransition(() => {
            setChosenConfig((prev) => {
                return {
                    ...prev, [key]: data//We have ketpt [] in "key" because we get value dynamically
                }
            })
        })

        

    }

    {/*******It is going to handle to add to cart items added into cart */ }
    const handleAddToCart = (product:Product) => {
        console.log("adding to cart")
        const itemToAdd={
            product,
            chosenConfiguration:{
                priceConfiguration:chosenConfig!,
                selectedToppings:selectedToppings
            }
        }
        dispatch(addToCart(itemToAdd))
    }
    return (
        <Dialog>
            <DialogTrigger className="bg-orange-600 p-2 rounded-sm font-bold cursor-pointer">Choose</DialogTrigger>
            <DialogContent className='max-w-3xl p-0' >
                <DialogTitle className='mt-3 text-center text-xl font-bold'>Choose Your Pizza</DialogTitle>
                <div className='flex'>
                    <div className='w-1/3 bg-white rounded p-8 flex items-center justify-center'>
                        {/**Left side image */}
                        <Image src={product.image} width={450} height={450} alt={product.name} />
                    </div>
                    <div className='2/3 p-8'>
                        {/**right side is data */}
                        <h3 className=" font-bold">{product.name}</h3>
                        <p className="mt-1">{product.description}</p>
                        <h3 className='mt-6 font-bold'>Choose the size</h3>


                        {Object.entries(product.category.priceConfiguration).map(([key, value]) => {
                            // key we are going to get as "size" and "crust" make sure to console the value
                            {/**

                                {
                            "Size": {
                                "priceType": "base",
                                "availableOptions": {
                                    "Small": 400,
                                    "Medium": 600,
                                    "Large": 800
                                }
                            },
                            "Crust": {
                                "priceType": "aditional",
                                "availableOptions": {
                                    "Thin": 50,
                                    "Thick": 100
                                }
                            }
                        }


                                Here Key is  "size" and value is "{
                                "priceType": "base",
                                "availableOptions": {
                                    "Small": 400,
                                    "Medium": 600,
                                    "Large": 800
                                }
                            }",

                                Here key is "Crust" and value is " {
                                "priceType": "aditional",
                                "availableOptions": {
                                    "Thin": 50,
                                    "Thick": 100
                                }
                            }
                                */}
                            console.log("PriceConfiguration", product.category.priceConfiguration)
                            return (
                                <div key={key}>
                                    <h4 className="mt-6">Choose the {key}</h4>
                                    <RadioGroup
                                        defaultValue={value.availableOptions[0]}
                                        onValueChange={(data) => {
                                            //console.log("data",data)
                                            handleRadioChange(key, data)
                                        }}
                                        className="grid grid-cols-3 gap-4 mt-2">
                                        {value.availableOptions.map((option) => {
                                            return (
                                                <div key={option}>
                                                    <RadioGroupItem
                                                        value={option}
                                                        id={option}
                                                        className="peer sr-only"
                                                        aria-label={option}
                                                    />
                                                    <Label
                                                        htmlFor={option}
                                                        className="flex flex-col items-center justify-between rounded-md border-2 bg-white p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                                                        {option}
                                                    </Label>
                                                </div>
                                            );
                                        })}
                                    </RadioGroup>
                                </div>
                            );
                        })}


                        {/**Topping */}
                        <h3 className='mt-6 font-bold'>Toppings</h3>
                        {/**Rendering toppingList component */}
                        <Suspense fallback={<SkeletonCard />}>
                            <ToppingList selectedToppings={selectedToppings} handleCheckBoxCheck={handleCheckBoxCheck} />
                        </Suspense>


                        <div className='flex items-center justify-between mt-8'>
                            <span className='font-bold'>₹400</span>
                            {/**Here onClick only works when the page is "use client" means page need to be in client side only,
                             so what ever the  components are there under "use client" even that component also become "use client" in our case "Topping List component line no-114"
                             */}
                            <Button className='bg-orange-600' onClick={()=>handleAddToCart(product)}>{/**When user clicks you need to write like this ()=> */}
                                <ShoppingCart />
                                <span>AddToCart</span>
                            </Button>
                        </div>

                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default ProductModal
