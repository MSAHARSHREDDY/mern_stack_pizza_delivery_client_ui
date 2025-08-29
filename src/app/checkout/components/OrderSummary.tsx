import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { verifyCoupon } from '@/lib/http/api'
import { useAppSelector } from '@/lib/store/hooks'
import { CouponCodeData, CouponenData } from '@/lib/types'
import { getItemTotal } from '@/lib/utils'
import { useMutation } from '@tanstack/react-query'
import { LoaderCircle } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import React, { useState } from 'react'


const OrderSummary = () => {

    const searchParams = useSearchParams()

    const cart = useAppSelector((state) => state.cart.cartItems)//Here we are fetching the cart details from store,The name "cart" is comming from store.ts file 
    //"cartItems" is comming from cartSlice.ts file line-17
    console.log("cartValue", cart)

    const TAXES_PERCENTAGE = 18;
    const DELIVERY_CHARGES = 100

    const [discountPercentage, setDiscountPercentage] = useState(0)
    const [discountError, setDiscountError] = useState(" ")
    const couponCodeRef = React.useRef<HTMLInputElement>(null)

    //Handling subTotal value
    const subTotal = React.useMemo(() => {
        return cart.reduce((acc, curr) => {
            return acc + curr.qty * getItemTotal(curr);
        }, 0);
    }, [cart]);//When there is change in cart it is going to re-render it again above subTotal

    //Handling Discount vale
    const discountAmount = React.useMemo(() => {
        return Math.round(subTotal * discountPercentage / 100)
    }, [subTotal, discountPercentage])//React will recompute discountAmount only if either subTotal or discountPercentage changes.

    //Handling Taxes value
    const taxesAmount = React.useMemo(() => {
        const amountAfterDiscount = subTotal - discountAmount;
        return Math.round((amountAfterDiscount * TAXES_PERCENTAGE) / 100);
    }, [subTotal, discountAmount]);

    //Grand subTotal value with discount
    const grandWithDiscountTotal = React.useMemo(() => {
        return subTotal - discountAmount + taxesAmount + DELIVERY_CHARGES;
    }, [subTotal, discountAmount, taxesAmount, DELIVERY_CHARGES]);

    //Grand subTotal value without discount
    const grandWithoutDiscountTotal = React.useMemo(() => {
        return subTotal + taxesAmount + DELIVERY_CHARGES;
    }, [subTotal, taxesAmount, DELIVERY_CHARGES]);

    //verifying the coupon code
    const { mutate, isError } = useMutation({
        mutationKey: ["couponCode"],
        mutationFn: async () => {
            if (!couponCodeRef.current) {
                throw new Error("No coupon code"); // better than silent return
            }

            const restaurantId = searchParams.get("restaurantId");
            if (!restaurantId) {
                throw new Error("No restaurant id");
            }

            const data: CouponCodeData = {
                code: couponCodeRef.current.value,
                tenantId: restaurantId,
            };

            return verifyCoupon(data); // ✅ return, don’t just await
        },
        onSuccess: (data:CouponenData) => {
            console.log("data received", data);
            if (data.valid) {
                setDiscountError('');
                //handleCouponCodeChange(couponCodeRef.current ? couponCodeRef.current.value : '');
                setDiscountPercentage(data.discount);
                return;
            }

            setDiscountError('Coupon is invalid');
            //handleCouponCodeChange('');
            setDiscountPercentage(0);
        },
    });



    


    //Handling coupon validation
    const handleCouponValidation = (e: React.MouseEvent) => {
        e.preventDefault()
        mutate()
        

        
    }

    return (
        <Card className="w-2/5 border-none h-auto self-start">
            <CardHeader>
                <CardTitle>Order summary</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 pt-6">
                <div className="flex items-center justify-between">
                    <span>Subtotal</span>
                    <span className="font-bold">₹{subTotal}</span>
                </div>
                <div className="flex items-center justify-between">
                    <span>Taxes</span>
                    <span className="font-bold">₹{taxesAmount}</span>
                </div>
                <div className="flex items-center justify-between">
                    <span>Delivery charges</span>
                    <span className="font-bold">₹{DELIVERY_CHARGES}</span>
                </div>
                <div className="flex items-center justify-between">
                    <span>Discount</span>
                    <span className="font-bold">₹{discountAmount}</span>
                </div>
                <hr />
                <div className="flex items-center justify-between">
                    <span className="font-bold">Order total</span>
                    <span className="font-bold flex flex-col items-end">
                        <span className={discountPercentage ? 'line-through text-gray-400' : ''}>
                            ₹{grandWithoutDiscountTotal}
                        </span>
                        {discountPercentage ? (
                            <span className="text-green-700">${grandWithDiscountTotal}</span>
                        ) : null}
                    </span>
                </div>
                {discountError && <div className="text-red-500 font-bold">{discountError}</div>}
                <div className="flex items-center gap-4">
                    <Input
                        id="coupon"
                        name="code"
                        type="text"
                        className="w-full"
                        placeholder="Coupon code"
                        ref={couponCodeRef}
                    />
                    {/* todo: add loading */}
                    <Button onClick={handleCouponValidation} variant={'outline'}>
                        Apply
                    </Button>
                </div>

                <div className="text-right mt-6">
                    <Button className='bg-orange-600'>

                        {/* <span className="flex items-center gap-2">
                                <LoaderCircle className="animate-spin" />
                                <span>Please wait...</span>
                            </span> */}

                        <span>Place order</span>

                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}

export default OrderSummary
