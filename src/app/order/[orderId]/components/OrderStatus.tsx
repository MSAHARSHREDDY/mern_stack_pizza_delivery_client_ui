'use client';

import { Step, StepItem, Stepper, useStepper } from '@/components/stepper';
import { getSingleOrder } from '@/lib/http/api';
import { Order } from '@/lib/types';
import { useQuery } from '@tanstack/react-query';
import { CheckCheck, FileCheck, Microwave, Package, PackageCheck } from 'lucide-react';
import React from 'react';

const steps = [
  { label: 'Received', icon: FileCheck, description: 'We are confirming your order' },
  { label: 'Confirmed', icon: Package, description: 'We have started preparing your order' },
  { label: 'Prepared', icon: Microwave, description: 'Ready for the pickup' },
  { label: 'Out for delivery', icon: PackageCheck, description: 'Driver is on the way' },
  { label: 'Delivered', icon: CheckCheck, description: 'Order completed' },
] satisfies StepItem[];

const statusMapping = {
  received: 0,
  confirmed: 1,
  prepared: 2,
  out_for_delivery: 3,
  delivered: 4,
} as { [key: string]: number };

const StepperChanger = ({ orderId }: { orderId: string }) => {
  const { setStep } = useStepper();

  

//   const { data } = useQuery<Order>({
//   queryKey: ['order', orderId],
//   queryFn: async (): Promise<Order> => {
//     const res = await getSingleOrder(orderId);
//     return res.data as Order; // ensure correct type
//   },
//   refetchInterval: 1000 * 30, //30seconds
// });

const { data } = useQuery<Order>({
  queryKey: ['order', orderId],
  queryFn: async (): Promise<Order> => {
    const token = localStorage.getItem("accessToken"); // or wherever you store it

    if (!token) {
      throw new Error("User not authenticated");
    }

    const res = await getSingleOrder(orderId, token);
    
    return res.data as Order;
  },
  refetchInterval: 1000 * 30,
});



  React.useEffect(() => {
    if (data) {
      const currentStep = statusMapping[data.orderStatus] || 0;
      setStep(currentStep + 1);
    }
  }, [data, setStep]);

  return null;
};

const OrderStatus = ({ orderId }: { orderId: string }) => {
  return (
    <Stepper
      initialStep={0}
      steps={steps}
      variant="circle-alt"
      className="py-8 stepper-orange"
    >
      {steps.map(({ label, icon }) => (
        <Step
          key={label}
          label={label}
          icon={icon}
          checkIcon={icon}
        />
      ))}
      <StepperChanger orderId={orderId} />
    </Stepper>
  );
};

export default OrderStatus;
