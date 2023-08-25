import {useState, createContext} from 'react';


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

 
    //if found, incerment quantity


    //return new array with modified cartitems/new cart item
}

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {}


});

export const CartProvider = ({children}) =>{

    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));

    }
    const value = {isCartOpen, setIsCartOpen, cartItems, addItemToCart}
    return(
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    ) 
}


