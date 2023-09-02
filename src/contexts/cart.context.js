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

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    cartCount: 0,
    removeItemfromCart: () => {}

});

export const CartProvider = ({children}) =>{

    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount]= useState(0);

    useEffect(() => {

        const newCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity , 0)
        setCartCount(newCount)

    }, [cartItems])

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));

    }

     const removeItemfromCart = (cartItemToRemove) => {
        setCartItems(removeCartItem(cartItems, cartItemToRemove));

    }

    const value = {isCartOpen, setIsCartOpen, cartItems, addItemToCart, cartCount, addCartItem, removeItemfromCart}
    return(
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    ) 
}


