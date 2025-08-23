import React from 'react';
import { CartItem } from '../store/features/cart/cartSice';
import { getItemTotal } from '../utils';

export function useTotal(product: CartItem) {
    //here useMemo hook tells when there is a change in product i.e on [product] it is going to update below calculation
    const totalPrice = React.useMemo(() => {
        return getItemTotal(product);
        // const toppingsTotal = product.chosenConfiguration.selectedToppings.reduce(
        //     (acc, curr) => acc + curr.price,
        //     0
        // );

        // const configPricing = Object.entries(product.chosenConfiguration.priceConfiguration).reduce(
        //     (acc, [key, value]: [string, string]) => {
        //         const price = product.priceConfiguration[key].availableOptions[value];
        //         return acc + price;
        //     },
        //     0
        // );
        // return configPricing + toppingsTotal;
    }, [product]);
    return totalPrice;
}
