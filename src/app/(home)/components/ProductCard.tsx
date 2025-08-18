
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';

import React from 'react'

import Image from 'next/image';

import { Product } from '@/lib/types';
import ProductModal from './ProductModal';



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
                <div className="flex items-center gap-6 mr-5">
                    <p>
                        <span>From </span>
                        <span className="font-bold">₹100</span>
                    </p>
                </div>
                {/**Rendering product modal */}
                <ProductModal product={product}/>
            </CardFooter>
        </Card>
    )
}

export default ProductCard
