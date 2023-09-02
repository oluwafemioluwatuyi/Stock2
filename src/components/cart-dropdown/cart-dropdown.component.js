import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';
import {useNavigate} from 'react-router-dom';

import { CartContext } from '../../contexts/cart.context';


import './cart-dropdown.styles.scss';
import { useContext } from 'react';

const CartDropdown = () => {

    const {cartItems} = useContext(CartContext)

    const navigate = useNavigate();

    const goTOCheckouthandler = () => {
        navigate('/checkout')
    }

    return(
        <div className='cart-dropdown-container'>
            <div className='cart-items'/>
           {
             cartItems.map(item => <CartItem key={item.id} cartItem={item}/>)
           } 
            <div/>
            <Button onClick= {goTOCheckouthandler}>GO TO CHECKOUT</Button>
        </div>
    )
}


export default CartDropdown;