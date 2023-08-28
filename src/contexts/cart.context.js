import {useState, createContext, useEffect
} from 'react';


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
    addItemToCart: () => {},
    cartCount: 0,

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
    const value = {isCartOpen, setIsCartOpen, cartItems, addItemToCart, cartCount}
    return(
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    ) 
}


