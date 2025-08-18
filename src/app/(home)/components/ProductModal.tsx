
import Image from 'next/image';
import React from 'react'
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
import { Product } from '@/lib/types';
const ProductModal = ({ product }: { product: Product }) => {
    return (
        <Dialog>
            <DialogTrigger className="bg-orange-600 p-2 rounded-sm font-bold cursor-pointer">Choose</DialogTrigger>
            <DialogContent className='max-w-3xl p-0' >
                <DialogTitle className='mt-3 text-center text-xl font-bold'>Choose Your Pizza</DialogTitle>
                <div className='flex'>
                    <div className='w-1/3 bg-white rounded p-8 flex items-center justify-center'>
                        {/**Left side image */}
                        <Image src={"/pizza-main.png"} width={450} height={450} alt={product.name} />
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

//crust
[
    {
        "name": "Is Hit",
        "value": true
    },
    {
        "name": "Spiciness",
        "value": "Hot"
    }
]

                                */}
                            console.log("PriceConfiguration", product.category.priceConfiguration)
                            return (
                                <div key={key}>
                                    <h4 className="mt-6">Choose the {key}</h4>
                                    <RadioGroup
                                        defaultValue={value.availableOptions[0]}

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
                        <ToppingList />

                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default ProductModal
