// import axios from 'axios';
// import { CouponCodeData, CouponenData, Customer, OrderData } from '../types';

// export const api = axios.create({
//     baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
//     withCredentials: true,
//     headers: {
//         'Content-Type': 'application/json',
//         Accept: 'application/json',
//     },
// });

// const ORDER_SERVICE_PREFIX = '/api/order';

// // ✅ return only Customer
// export const getCustomer = async (): Promise<Customer> => {
//     const res = await api.get<Customer>(`/customer`);
//     console.log("res.data",res.data)
//     return res.data;
    
// };

// export const addAddress = async(customerId: string,address:string) =>{
//  const addressInfo=await api.patch(`/customer/addresses/${customerId}`,{address});
//  console.log("addressInfo",addressInfo)
//  return addressInfo.data
// }



// // export const verifyCoupon = async(data: CouponCodeData) =>{
// // const verifyCoupon=await api.post(`/coupons/verify`, data);
// // console.log("verifyCoupon",verifyCoupon)
// // return verifyCoupon.data;
// // }
// export const verifyCoupon = async (
//   data: CouponCodeData
// ): Promise<CouponenData> => {
//   const response = await api.post<CouponenData>(`/coupons/verify`, data);
//   return response.data;
// };



// type CreateOrderResponse = {
//   paymentUrl: string | null;
// };

// export const createOrder = ( data: OrderData,idempotencyKey: string) => {
//   return api.post<CreateOrderResponse>(`/orders`, data, {
//     headers: {
//       "Idempotency-Key": idempotencyKey,
//     },
//   });
// };

// export const getSingleOrder = (orderId: string) =>
//     api.get(`/orders/${orderId}?fields=orderStatus`);



import axios from 'axios';
import { CouponCodeData, Customer, OrderData } from '../types';



export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});

const ORDER_SERVICE_PREFIX = '/api/order';

export const getCustomer = async (): Promise<Customer> => {
  const res = await api.get<Customer>(`${ORDER_SERVICE_PREFIX}/customer`);
  return res.data;
};


export const addAddress = async (
  customerId: string,
  address: string
): Promise<any> => {
  return await api.patch(`${ORDER_SERVICE_PREFIX}/customer/addresses/${customerId}`, { address });
};

export const verifyCoupon = async(data: CouponCodeData): Promise<any>  =>{
     return await api.post(`${ORDER_SERVICE_PREFIX}/coupons/verify`, data);
}

export const createOrder = async (
  data: OrderData,
  idempotencyKey: string
): Promise<{ paymentUrl: string | null }> => {
  const res = await api.post<{ paymentUrl: string | null }>(
    `${ORDER_SERVICE_PREFIX}/orders`,
    data,
    {
      withCredentials: true,
      headers: { "Idempotency-Key": idempotencyKey },
    }
  );

  return res.data;
};


export const getSingleOrder = (orderId: string) =>
    api.get(
        `${ORDER_SERVICE_PREFIX}/orders/${orderId}?fields=orderStatus`,
        { withCredentials: true }
    );

