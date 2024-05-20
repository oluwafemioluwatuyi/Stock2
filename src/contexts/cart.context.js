import { createContext, useReducer} from 'react';
import {createAction} from '../utils/reducer/reducer.utils';
 


const addCartItem = (cartItems, productToAdd) => {
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

const removeCartItem = (cartItems, cartItemToRemove) => {

        const existingItem =  [...cartItems].find((cartItem)=>
        cartItem.id === cartItemToRemove.id
    );
        if(existingItem.quantity ===1){
        return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id)
        }

        return [...cartItems].map((cartItem) =>
        cartItem.id === cartItemToRemove.id ?
        {...cartItem, quantity: cartItem.quantity - 1}
        : cartItem
    );
   

}

const clearCartItem = (cartItems, cartItemToclear) => {
       return cartItems.filter(cartItem => cartItem.id !== cartItemToclear.id)
}

export const CartContext = createContext({
     isCartOpen: false,
    cartItems: [],
     cartCount: 0,
     cartTotal: 0,
    setIsCartOpen: () => {},
    addItemToCart: () => {},
    removeItemFromCart: () => {},
    clearItemFromCart: () => {}

});

const INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    cartTotal: 0

}

const CART_ACTION_TYPES = {
    SET_CART_ITEMS: 'SET_CART_ITEMS',
    SET_IS_CART_OPEN: 'SET_IS_CART_OPEN',
    SET_CART_COUNT: 'SET_CART_COUNT',
    SET_CART_TOTAL: 'SET_CART_TOTAL'
}

const cartReducer = (state, action) =>{
    const {type, payload} = action;


    switch(type) {
        // case CART_ACTION_TYPES.SET_CART_ITEMS:
        //     return{
        //         ...state,
        //         ...payload
        //     } ;

            case CART_ACTION_TYPES.SET_CART_ITEMS:
                return{
                    ...state,
                    isCartOpen:payload,
                } 
        default:
        throw new Error(`unhandled type of ${type} in cartReducer`)
    }
}
export const CartProvider = ({children}) =>{

    // const [isCartOpen, setIsCartOpen] = useState(false);
    // const [cartItems, setCartItems] = useState([]);
    // const [cartCount, setCartCount]= useState(0);
    // const [cartTotal, setCartTotal]= useState(0);

    // useEffect(() => {

    //     const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity , 0)
    //     setCartCount(newCartCount)

    // }, [cartItems])

    // useEffect(() => {

    //     const newCartTotal = cartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price,
    //      0)
    //     setCartTotal(newCartTotal)

    // }, [cartItems]);

   const [{cartItems, isCartOpen, cartCount, cartTotal}, dispatch] = useReducer(cartReducer, INITIAL_STATE)

    const updateCartItemsReducer = (newCartItems) => {
        const newCartCount = newCartItems.reduce(
            (total, cartItem) => total + cartItem.quantity,
         0);

         const newCartTotal = newCartItems.reduce(
            (total, cartItem) => total + cartItem.quantity * cartItem.price,
         0);

         dispatch(
            createAction(CART_ACTION_TYPES.SET_CART_ITEMS,{
                cartItems: newCartItems,
                cartTotal: newCartTotal,
                cartCount:newCartCount
            })
         )
    };

    const addItemToCart = (productToAdd) => {
        const newCartItems = addCartItem(cartItems, productToAdd);
         updateCartItemsReducer(newCartItems);

    }

     const removeItemFromCart = (cartItemToRemove) => {
         const newCartItems = removeCartItem(cartItems, cartItemToRemove);
         updateCartItemsReducer(newCartItems);

    }

     const clearItemFromCart = (cartItemToClear) => {
        const newCartItems = clearCartItem(cartItems, cartItemToClear);
         updateCartItemsReducer(newCartItems);

    }

    const setIsCartOpen = (bool) => {
        dispatch(
            createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool)
        );
    }

    const value = {isCartOpen, 
                   setIsCartOpen,
                   cartItems,
                   addItemToCart,
                   cartCount,
                   addCartItem,
                   removeItemFromCart, 
                   clearItemFromCart,
                   cartTotal}
    return(
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    ) 
}


