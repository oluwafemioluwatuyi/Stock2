import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';
import {useNavigate} from 'react-router-dom';
import { UseSelector, useSelector } from 'react-redux/es/hooks/useSelector';
import { selectCartItems } from '../../store/cart/cart.selector';

// import { CartContext } from '../../contexts/cart.context';


import './cart-dropdown.styles.scss';
import { useContext } from 'react';

const CartDropdown = () => {
    const cartItems = useSelector(selectCartItems);

   // const {cartItems} = useContext(CartContext)

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