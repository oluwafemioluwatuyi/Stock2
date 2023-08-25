import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';

import { CartContext } from '../../contexts/cart.context';


import './cart-dropdown.styles.scss';
import { useActionData } from 'react-router-dom';
import { useContext } from 'react';

const CartDropdown = () => {

    const {cartItems} = useContext(CartContext)
    return(
        <div className='cart-dropdown-container'>
            <div className='cart-items'/>
           {
             cartItems.map(item => <CartItem key={item.id} cartItem={item}/>)
           } 
            <div/>
            <Button>GO TO CHECKOUT</Button>
        </div>
    )
}


export default CartDropdown;