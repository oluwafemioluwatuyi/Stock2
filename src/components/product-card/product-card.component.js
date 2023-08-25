import './product-card.styles.scss'
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';

import Button from '../button/button.component';

const ProductCard = ({product}) => {

    const {addItemToCart} = useContext(CartContext)

    const {name, price, imageUrl} = product

    const AddProduct = () => addItemToCart(product);

    return(
        <div className='product-card-container'>
            <img src={imageUrl} alt={`${name}`}/>
            <div className='footer'>
                <span className='name'>{name}</span>
                <span className='price'>{price}</span>
            </div>
            <Button buttonType='inverted' onClick={AddProduct}>Add to Cart</Button>
        </div>
    )

}

export default ProductCard;