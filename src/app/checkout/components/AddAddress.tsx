import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react'
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { LoaderCircle, Plus } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addAddress } from '@/lib/http/api';

//It is used for validation for address
const formSchema = z.object({
    address: z.string().min(2, {
        message: 'Address must be at least 2 characters.',
    }),
});

const AddAddress = ({ customerId }: { customerId: string }) => {
    const [isModalOpen, setIsModalOpen] = useState(false)

    const addressForm = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });

    const queryClient = useQueryClient()

    //calling to backend function for posting the data
    const { mutate, isPending } = useMutation({
        mutationKey: ["address", customerId],
        mutationFn: (address: string) => addAddress(customerId, address),
        onSuccess: async () => {
            addressForm.reset()
            setIsModalOpen(false)
            await queryClient.refetchQueries({ queryKey: ["customer"] });//queryClient.refetchQueries({ queryKey: ["customer"] }) forces a refresh of customer data after you add an address.
        }
    })

    //posting the form data when you click on save button
    const handleAddressAdd = (e: React.FormEvent<HTMLFormElement>) => {
        e.stopPropagation()

        return addressForm.handleSubmit((data: z.infer<typeof formSchema>) => {
            console.log("data", data)
            mutate(data.address)//here we are calling mutate function
            //
        })(e)
    }

    return (
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>{/**onOpenChange after making changes it closes the modal */}
            <DialogTrigger asChild>
                <Button size={'sm'} variant={'link'} className='text-orange-600'>
                    <Plus size={'16'} />
                    <span className="ml-2">Add New Address</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <Form {...addressForm}>
                    <form onSubmit={handleAddressAdd} >
                        <DialogHeader>
                            <DialogTitle>Add Address</DialogTitle>
                            <DialogDescription>
                                We can save your address for next time order.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div>
                                <Label htmlFor="address">Address</Label>
                                <FormField
                                    name="address"
                                    control={addressForm.control}
                                    render={({ field }) => {
                                        return (
                                            <FormItem>
                                                <FormControl>
                                                    <Textarea className="mt-2" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        );
                                    }}
                                />

                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="submit" className='bg-orange-600' disabled={isPending}>
                                {isPending ? (
                                    <span className="flex items-center gap-2">
                                        <LoaderCircle className="animate-spin" />
                                        <span>Please wait...</span>
                                    </span>
                                ) : (
                                    'Save changes'
                                )}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default AddAddress
