import { categoryItem } from "../categories/category.types";
import { CART_ACTION_TYPES, CartItem } from "./cart.types";
import { createAction, withMatcher, Action, ActionWithPayload } from "../../utils/reducer/reducer.utils";


 const addCartItem = (cartItems:CartItem[], productToAdd:categoryItem):CartItem[] => {
    // find if cartItems contains productToAdd

    const existingItem =  [...cartItems].find((cartItem)=>
            cartItem.id === productToAdd.id
        );
     
    if(existingItem){
       return [...cartItems].map((cartItem) =>
            cartItem.id === productToAdd.id ?
            {...cartItem, quantity: cartItem.quantity + 1}
            : cartItem
        );
    }
    

    return [...cartItems, {...productToAdd, quantity: 1}]

  
}

const removeCartItem = (cartItems:CartItem[], cartItemToRemove:CartItem): CartItem[] => {

        const existingItem =  [...cartItems].find((cartItem)=>
        cartItem.id === cartItemToRemove.id
    );
    // check if quantity is equal to 1, if it is remove that item ffom the cart
        if(existingItem &&existingItem.quantity ===1){
        return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id)
        }
        //return back cartitems with matching cart item with reduced quantity

        return [...cartItems].map((cartItem) =>
        cartItem.id === cartItemToRemove.id ?
        {...cartItem, quantity: cartItem.quantity - 1}
        : cartItem
    );
   

}

const clearCartItem = (cartItems:CartItem[], cartItemToclear:CartItem):CartItem[] => {
       return cartItems.filter(cartItem => cartItem.id !== cartItemToclear.id)
}
export type SetIsCartOpen = ActionWithPayload<CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean>;

export type SetCartItems = ActionWithPayload<CART_ACTION_TYPES.SET_CART_ITEMS, CartItem[]>;

export const setIsCartOpen = withMatcher((boolean:boolean):SetIsCartOpen =>
 createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean));

export const SetCartItems = withMatcher((cartItems:))
export const addItemToCart = ( cartItems, productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
     return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
}

 export const removeItemFromCart = ( cartItems, cartItemToRemove) => {
     const newCartItems = removeCartItem(cartItems, cartItemToRemove);
     return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);

}

 export const clearItemFromCart = ( cartItems, cartItemToClear) => {
    const newCartItems = clearCartItem(cartItems, cartItemToClear);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);

}


