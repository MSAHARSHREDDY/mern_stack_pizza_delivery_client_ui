import axios from 'axios';
import { CouponCodeData, Customer, OrderData } from '../types';

export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_ODERSERVICE_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});

const ORDER_SERVICE_PREFIX = '/api/order';

// ✅ return only Customer
export const getCustomer = async (): Promise<Customer> => {
    const res = await api.get<Customer>(`/customer`);
    console.log("res.data",res.data)
    return res.data;
    
};

export const addAddress = (customerId: string, address: string) =>
    api.patch(`${ORDER_SERVICE_PREFIX}/customer/addresses/${customerId}`, {
        address,
    });

export const verifyCoupon = (data: CouponCodeData) =>
    api.post(`${ORDER_SERVICE_PREFIX}/coupons/verify`, data);

export const createOrder = (data: OrderData, idempotencyKey: string) =>
    api.post(`${ORDER_SERVICE_PREFIX}/orders`, data, {
        headers: {
            'Idempotency-Key': idempotencyKey,
        },
    });

export const getSingleOrder = (orderId: string) =>
    api.get(`${ORDER_SERVICE_PREFIX}/orders/${orderId}?fields=orderStatus`);
