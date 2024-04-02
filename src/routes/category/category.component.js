
import { useState, useEffect, Fragment } from 'react';
import { useSelector } from 'react-redux';
import { selectCategoriesIsLoading, selectCategoriesMap} from '../../store/categories/category.select';
import { useParams } from 'react-router-dom';
import Spinner from '../../components/spinner/spinner.component';
import './category.styles.scss'

import { CategoriesContext } from '../../contexts/categories.context';
import ProductCard from '../../components/product-card/product-card.component';


const Category = () => {
    const {category} = useParams();
    const categoriesMap  = useSelector(selectCategoriesMap);
    const isLoading = useSelector(selectCategoriesIsLoading)
  //  const {categoriesMap} = useContext(CategoriesContext);
    const [products, setProducts] = useState(categoriesMap[category])

    useEffect(() =>{
        setProducts(categoriesMap[category]);
        }, [category, categoriesMap])


        return(
            <Fragment>
                  <h2 className='category-title'>{category.toUpperCase()}</h2>
                {
                    isLoading ? (
                    <Spinner/>
                    ) :(
                        <div className='category-container'>
                        { products &&
                            products.map((product) => <ProductCard key={product.id} product={product}/>)
                        }
                    </div>
                    )
                }
                
            </Fragment>
            
        )



}

export default Category;