import { Product, Topping } from "@/lib/types"
import { hashTheItem } from "@/lib/utils"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface CartItem extends Pick<Product, '_id' | 'name' | 'image' | 'priceConfiguration'> {
    chosenConfiguration: {
        priceConfiguration: {
            [key: string]: string
        },
        selectedToppings: Topping[]
    },
    qty:number
    hash?:string

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
        addToCart: (state, action: PayloadAction<CartItem>) => {//Here state is noting but initialState i.e line 7
           const hash=hashTheItem(action.payload)
            const newItem = {
                ...action.payload,
                hash:hash
               
            }
             window.localStorage.setItem("cartItems", JSON.stringify([...state.cartItems,newItem]))
            return {
                cartItems: [...state.cartItems,newItem]
            }
        },

        setInitialCartItems:(state, action: PayloadAction<CartItem[]>)=>{
            state.cartItems.push(...action.payload)
        },

         changeQty: (state, action: PayloadAction<{ hash: string; qty: number }>) => {
            const index = state.cartItems.findIndex((item) => item.hash === action.payload.hash);

            //it is used for removing the item from cart if qty==0
            if (action.payload.qty === 0) {
                state.cartItems.splice(index, 1);
                window.localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
                return;
            }
            // 1 , -1
            // 0 -> 1 = 1
            // 1 -> -1 1 + -1 = 0
            state.cartItems[index].qty = Math.max(
                1,
                state.cartItems[index].qty + action.payload.qty
            );

            window.localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        },
        clearCart: () => {
            window.localStorage.setItem('cartItems', JSON.stringify([]));
            return {
                cartItems: [],
            };
        },
    }

})

//Action creaters are generated for each case reducer function
export const { addToCart,setInitialCartItems,changeQty,clearCart } = cartSlice.actions
export default cartSlice.reducer

