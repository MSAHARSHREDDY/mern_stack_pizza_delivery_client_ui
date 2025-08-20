import { Product, Topping } from "@/lib/types"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface CartItem {
    product: Product,
    chosenConfiguration: {
        priceConfiguration: {
            [key: string]: string
        },
        selectedToppings: Topping[]
    },
  
}
export interface CartState {
    cartItems: CartItem[]
}

const initialState: CartState = {
    cartItems: []
}

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {//Here reducers are nothing but performing actions
        addToCart: (state,action:PayloadAction<CartItem>) => {//Here state is noting but initialState i.e line 7
           return{
            cartItems:[...state.cartItems,{//Keep the previous cart as it is
                product:action.payload.product,
                chosenConfiguration:action.payload.chosenConfiguration,
            }]

           }
        },
    }

})

//Action creaters are generated for each case reducer function
export const { addToCart } = cartSlice.actions
export default cartSlice.reducer

