import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';

import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import Image from 'next/image';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import ToppingList from './ToppingList';

export type Product = {
    id: string;
    name: string;
    description: string;
    image: string;
    price: number;
};

type PropTypes = { product: Product }
const ProductCard = ({ product }: PropTypes) => {
    return (
        <Card className="border-none rounded-xl">
            {/**Card-Header */}
            <CardHeader className="flex items-center justify-center">
                <Image alt="pizza-image" width={150} height={150} src={product.image} />
            </CardHeader>

            {/**Card Content */}
            <CardContent className='text-center'>
                <h2 className="text-xl font-bold">{product.name}</h2>
                <p className="mt-2">{product.description}</p>
            </CardContent>

            {/**Card Footer */}
            <CardFooter className="flex justify-center mt-4">
                <div className="flex items-center gap-6">
                    <p>
                        <span>From </span>
                        <span className="font-bold">₹{product.price}</span>
                    </p>
                    <Dialog>
                        <DialogTrigger className="bg-orange-600 p-2 rounded-sm font-bold cursor-pointer">Choose</DialogTrigger>
                        <DialogContent className='max-w-3xl p-0'>
                            <div className='flex'>
                                <div className='w-1/3 bg-white rounded p-8 flex items-center justify-center'>
                                    {/**Left side image */}
                                    <Image src={"/pizza-main.png"} width={450} height={450} alt={product.name} />
                                </div>
                                <div className='2/3 p-8'>
                                    {/**right side is data */}
                                    <h3 className="text-xl font-bold">{product.name}</h3>
                                    <p className="mt-1">{product.description}</p>
                                    <h3 className='mt-6 font-bold'>Choose the size</h3>

                                    {/**Sizes small.medium,large */}
                                    <div className='flex items-center gap-5 mt-3'>

                                        <RadioGroup defaultValue="card" className="  ">
                                            <div>
                                                <RadioGroupItem value="card" id="card" className="peer sr-only" aria-label="card" />
                                                <Label htmlFor="card"
                                                    className="flex flex-col items-center justify-between 
                                                                rounded-md border-2 bg-white 
                                                                px-3 py-2 text-sm  
                                                                hover:bg-orange-600 hover:text-accent-foreground 
                                                                peer-data-[state=checked]:border-primary
                                                                [&:has([data-state=checked])]:border-primary cursor-pointer">
                                                    small
                                                </Label>
                                            </div>
                                        </RadioGroup>

                                        <RadioGroup defaultValue="card" className="">
                                            <div>
                                                <RadioGroupItem value="card" id="card" className="peer sr-only" aria-label="card" />
                                                <Label
                                                    htmlFor="card"
                                                    className="flex flex-col items-center justify-between rounded-md border-2 bg-white px-3 py-2 text-sm  hover:bg-orange-600 hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer">
                                                    medium
                                                </Label>
                                            </div>
                                        </RadioGroup>

                                        <RadioGroup defaultValue="card" className="">
                                            <div>
                                                <RadioGroupItem value="card" id="card" className="peer sr-only" aria-label="card" />
                                                <Label
                                                    htmlFor="card"
                                                    className="flex flex-col items-center justify-between rounded-md border-2 bg-white px-3 py-2 text-sm  hover:bg-orange-600 hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer">
                                                    large
                                                </Label>
                                            </div>
                                        </RadioGroup>
                                    </div>

                                    {/**Choose the crust */}
                                    <h3 className='mt-6 font-bold'>Choose the crust</h3>
                                    <div className='flex items-center gap-5 mt-3'>
                                        <RadioGroup defaultValue="card" className="  ">
                                            <div>
                                                <RadioGroupItem value="card" id="card" className="peer sr-only" aria-label="card" />
                                                <Label htmlFor="card"
                                                    className="flex flex-col items-center justify-between 
                                                                rounded-md border-2 bg-white 
                                                                px-3 py-2 text-sm  
                                                                 hover:bg-orange-600 hover:text-accent-foreground 
                                                                peer-data-[state=checked]:border-primary
                                                                [&:has([data-state=checked])]:border-primary cursor-pointer">
                                                    Thin
                                                </Label>
                                            </div>
                                        </RadioGroup>

                                        <RadioGroup defaultValue="card" className="">
                                            <div>
                                                <RadioGroupItem value="card" id="card" className="peer sr-only" aria-label="card" />
                                                <Label
                                                    htmlFor="card"
                                                    className="flex flex-col items-center justify-between rounded-md border-2 bg-white px-3 py-2 text-sm  hover:bg-orange-600 hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer">
                                                    Thick
                                                </Label>
                                            </div>
                                        </RadioGroup>
                                    </div>

                                     {/**Topping */}
                                    <h3 className='mt-6 font-bold'>Toppings</h3>
                                    {/**Rendering toppingList component */}
                                        <ToppingList/>

                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
            </CardFooter>
        </Card>
    )
}

export default ProductCard
