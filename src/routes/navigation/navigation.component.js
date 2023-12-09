import {Outlet, Link} from 'react-router-dom';
import { Fragment , useContext} from 'react';
import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';
import './navigation.styles.scss';
import {ReactComponent as CrwnLogo} from '../../assets/crown.svg' ;
 import { UserContext } from '../../contexts/user.context';
 import { CartContext } from '../../contexts/cart.context';
import { signOutUser } from '../../utils/firebase/firebaseutils';
import {useSelector } from 'react-redux';
import { selectCurrentUser } from '../../store/user/user.selector';
import {selectIsCartOpen} from '../../store/cart/cart.selector'


const Navigation = ()=>{
 const currentUser = useSelector(selectCurrentUser); 
  const isCartOpen =useSelector(selectIsCartOpen);
  //const {currentUser} = useContext(UserContext);
 //   const {isCartOpen} = useContext(CartContext)
   console.log(currentUser);
    return(
      <Fragment>
        <div className='navigation'>
            <Link className='logo-container' to='/'>
            <CrwnLogo className='logo'/>
            </Link>
          <div className='nav-links-container'>
            <Link className='nav-link' to='/shop'> 
                Shop
            </Link>
            {
              currentUser ? (
                <span className='nav-link' onClick={signOutUser}>SIGN OUT</span>
              )
              :
               (
                <Link className='nav-link' to='/auth'>
                SIGN IN
                </Link>
              )
            }

            <CartIcon/>
          </div>
           {isCartOpen && <CartDropdown/>} 
        </div>
        <Outlet/>
      </Fragment>
    )
  }

  export default Navigation