'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import React from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import AddAddress from './AddAddress';
import { Coins, CreditCard } from 'lucide-react';
import OrderSummary from './OrderSummary';
import { useMutation, useQuery } from '@tanstack/react-query';
import { createOrder, getCustomer } from '@/lib/http/api';
import { Customer, OrderData } from '@/lib/types';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { useSearchParams } from 'next/navigation';
import { clearCart } from '@/lib/store/features/cart/cartSice';
import { v4 as uuidv4 } from 'uuid';

//It is used for form validation
const formSchema = z.object({
  address: z.string().min(1, { message: "Please select an address." }),
  paymentMode: z.enum(["card", "cash"] as const, { 
    message: "You need to select a payment mode type." 
  }),
  comment: z.any(), // must be z.any() with parentheses
});



const CustomerForm = () => {
    
    const dispatch = useAppDispatch();
  const customerForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const searchParam = useSearchParams();

    const chosenCouponCode = React.useRef('');
    const idempotencyKeyRef = React.useRef('');

    const cart = useAppSelector((state) => state.cart);


  //***fetching the customer information****
  const { data: customer, isLoading } = useQuery<Customer>({  //here useQuery is used to fetch the data 
    queryKey: ["customer"],
    queryFn: getCustomer
  })
  //When you are using axios you will get "data" as name for that reason we are using "res.data"
  console.log("customerData", customer)


  //******Creating order */
   const { mutate, isPending: isPlaceOrderPending } = useMutation({
        mutationKey: ['order'],
        mutationFn: async (data: OrderData) => {
            const idempotencyKey = idempotencyKeyRef.current
                ? idempotencyKeyRef.current
                : (idempotencyKeyRef.current = uuidv4() + customer?._id);

            return await createOrder(data, idempotencyKey).then((res) => res.data);
        },
        retry: 3,
        //redirecting to payment page when it is success
        onSuccess: (data: { paymentUrl: string | null }) => {
            if (data.paymentUrl) {
                window.location.href = data.paymentUrl;
            }

            //If you are using cash payment
            alert('Order placed successfully!');
            dispatch(clearCart());

            // todo: This will happen if payment mode is Cash.
            // todo: 1. Clear the cart 2. Redirect the user to order status page.
        },
    });

  if (isLoading) {
    return <h3>Loading...</h3>
  }

  //After submiting the place order
  const handlePlaceOrder=(data:z.infer<typeof formSchema>)=>{
    console.log("placeOrderData",data)
     const tenantId = searchParam.get('restaurantId');
        if (!tenantId) {
            alert('Restaurant Id is required!');
            return;
        }
        const orderData: OrderData = {
            cart: cart.cartItems,
            couponCode: chosenCouponCode.current ? chosenCouponCode.current : '',
            tenantId: tenantId,
            customerId: customer ? customer._id : '',
            comment: data.comment,
            address: data.address,
            paymentMode: data.paymentMode,
        };
        console.log("orderData",orderData)

       mutate(orderData);
  }

  return (
    <Form {...customerForm}>
      <form onSubmit={customerForm.handleSubmit(handlePlaceOrder)}>
        <div className='flex container gap-6 mt-16 ml-12'>
          <Card className='w-3/5 border-none'>
            <CardHeader>
              <CardTitle>Customer details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='grid gap-6'>

                <div className="grid gap-3">
                  <Label htmlFor="fname">First Name</Label>
                  <Input
                    id="fname"
                    type="text"
                    className="w-full"
                    defaultValue={customer ? customer.firstName : undefined}
                    disabled
                  />
                </div>

                <div className="grid gap-3">
                  <Label htmlFor="fname">last Name</Label>
                  <Input
                    id="fname"
                    type="text"
                    className="w-full"
                    defaultValue={customer ? customer.lastName : undefined}
                    disabled
                  />
                </div>

                <div className="grid gap-3">
                  <Label htmlFor="fname">Email</Label>
                  <Input
                    id="fname"
                    type="text"
                    className="w-full"
                    defaultValue={customer ? customer.email : undefined}
                    disabled
                  />
                </div>

                

                <div className="grid gap-3">
                  <div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="name">Address</Label>
                      {/**Rendering modal */}
                      <AddAddress customerId={customer?customer._id:" "} />
                    </div>

                    <FormField
                      name="address"
                      control={customerForm.control}
                      render={({ field }) => {
                        return (
                          <FormItem>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                className="grid grid-cols-2 gap-6 mt-2">
                                {customer?.addresses.map(
                                  (addressData) => {
                                    return (
                                      <Card
                                        className="p-6"
                                        key={addressData.address}>
                                        <div className="flex items-center space-x-2">
                                          <FormControl>
                                            <RadioGroupItem
                                              value={
                                                addressData.address
                                              }
                                              id={
                                                addressData.address
                                              }
                                            />
                                          </FormControl>
                                          <Label
                                            htmlFor={
                                              addressData.address
                                            }
                                            className="leading-normal">
                                            {
                                              addressData.address
                                            }
                                          </Label>
                                        </div>
                                      </Card>
                                    );
                                  }
                                )}
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        );
                      }}
                    />
                  </div>
                </div>



                <div className="grid gap-3">
                  <Label>Payment Mode</Label>
                  <FormField
                    name="paymentMode"
                    control={customerForm.control}
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              className="flex gap-6">
                              <div className="w-36">
                                <FormControl>
                                  <RadioGroupItem
                                    value={'card'}
                                    id={'card'}
                                    className="peer sr-only"
                                    aria-label={'card'}
                                  />
                                </FormControl>
                                <Label
                                  htmlFor={'card'}
                                  className="flex items-center justify-center rounded-md border-2 bg-white p-2 h-16 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                                  <CreditCard size={'20'} />
                                  <span className="ml-2">
                                    Card
                                  </span>
                                </Label>
                              </div>
                              <div className="w-36">
                                <FormControl>
                                  <RadioGroupItem
                                    value={'cash'}
                                    id={'cash'}
                                    className="peer sr-only"
                                    aria-label={'cash'}
                                  />
                                </FormControl>
                                <Label
                                  htmlFor={'cash'}
                                  className="flex items-center justify-center rounded-md border-2 bg-white p-2 h-16 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                                  <Coins size={'20'} />
                                  <span className="ml-2 text-md">
                                    Cash
                                  </span>
                                </Label>
                              </div>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                </div>


                <div className="grid gap-3">
                  <Label htmlFor="fname">Comment</Label>
                  <FormField
                    name="comment"
                    control={customerForm.control}
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormControl>
                            <Textarea {...field} />
                          </FormControl>
                        </FormItem>
                      );
                    }}
                  />
                </div>


              </div>
            </CardContent>
          </Card>
          {/**Rendering order summary */}
          <OrderSummary  isPlaceOrderPending={isPlaceOrderPending} handleCouponCodeChange={(code)=>chosenCouponCode.current=code}/>

        </div>
      </form>
    </Form>

  )
}
export default CustomerForm
