import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { LoaderCircle } from 'lucide-react'
import React from 'react'

const OrderSummary = () => {
  return (
    <Card className="w-2/5 border-none h-auto self-start">
            <CardHeader>
                <CardTitle>Order summary</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 pt-6">
                <div className="flex items-center justify-between">
                    <span>Subtotal</span>
                    <span className="font-bold">₹{100}</span>
                </div>
                <div className="flex items-center justify-between">
                    <span>Taxes</span>
                    <span className="font-bold">₹{200}</span>
                </div>
                <div className="flex items-center justify-between">
                    <span>Delivery charges</span>
                    <span className="font-bold">₹{300}</span>
                </div>
                <div className="flex items-center justify-between">
                    <span>Discount</span>
                    <span className="font-bold">₹{500}</span>
                </div>
                <hr />
                <div className="flex items-center justify-between">
                    <span className="font-bold">Order total</span>
                    <span className="font-bold flex flex-col items-end">
                        {/* <span className={discountPercentage ? 'line-through text-gray-400' : ''}>
                            ₹{grandWithoutDiscountTotal}
                        </span> */}
                        {/* {discountPercentage ? (
                            <span className="text-green-700">${grandWithDiscountTotal}</span>
                        ) : null} */}
                    </span>
                </div>
                {/* {discountError && <div className="text-red-500">{discountError}</div>} */}
                <div className="flex items-center gap-4">
                    <Input
                        id="coupon"
                        name="code"
                        type="text"
                        className="w-full"
                        placeholder="Coupon code"
                        // ref={couponCodeRef}
                    />
                    {/* todo: add loading */}
                    <Button  variant={'outline'}>
                        Apply
                    </Button>
                </div>

                <div className="text-right mt-6">
                    <Button >
                       
                            <span className="flex items-center gap-2">
                                <LoaderCircle className="animate-spin" />
                                <span>Please wait...</span>
                            </span>
                       
                            <span>Place order</span>
                       
                    </Button>
                </div>
            </CardContent>
        </Card>
  )
}

export default OrderSummary
