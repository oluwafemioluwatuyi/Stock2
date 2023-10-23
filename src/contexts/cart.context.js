import {useState, createContext, useEffect} from 'react';


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

const cartReducer = (state, action) =>{
    const {type, payload} = action;


    switch(type) {

        default:
        throw new Error(`unhandled type of $(){type} in cartReducer`)
    }
}
export const CartProvider = ({children}) =>{

    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount]= useState(0);
    const [cartTotal, setCartTotal]= useState(0);

    useEffect(() => {

        const newCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity , 0)
        setCartCount(newCount)

    }, [cartItems])

    useEffect(() => {

        const newCartTotal = cartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price,
         0)
        setCartTotal(newCartTotal)

    }, [cartIte
        ms])

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));

    }

     const removeItemFromCart = (cartItemToRemove) => {
        setCartItems(removeCartItem(cartItems, cartItemToRemove));

    }

     const clearItemFromCart = (cartItemToClear) => {
        setCartItems(clearCartItem(cartItems, cartItemToClear));

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


