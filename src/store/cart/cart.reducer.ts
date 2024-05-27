import {AnyAction} from 'redux'
import { setCartItems, setIsCartOpen } from './cart.action';
import { CART_ACTION_TYPES, CartItem } from "./cart.types";

export type CartState = {
    readonly isCartOpen:Boolean,
    readonly cartItems:CartItem[]
}

export const CART_INITIAL_STATE: CartState = {
    isCartOpen: false,
    cartItems: [],
    
}


export const cartReducer = (state= CART_INITIAL_STATE, action:AnyAction):CartState =>{
    //instead of the switch cases, withmatch method is used for the action reducer
if(setIsCartOpen.match(action)){
    return {

    ...state,
    isCartOpen:action.payload,
    }

 }

 if(setCartItems.match(action)){
    return{
    ...state,
    cartItems:action.payload
    }
 }
 return state
}