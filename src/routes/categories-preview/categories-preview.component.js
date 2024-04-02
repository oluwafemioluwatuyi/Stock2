
import { Fragment} from "react";
import {  useSelector } from "react-redux";
import { selectCategoriesMap, selectCategoriesIsLoading } from "../../store/categories/category.select";

//import { CategoriesContext } from "../../contexts/categories.context";
import CategoryPreview from "../../components/category-preview/category-preview.component";
import Spinner from "../../components/spinner/spinner.component";


const CategoriesPreview= () => {
    const categoriesMap  = useSelector(selectCategoriesMap);
    const isLoading = useSelector(selectCategoriesIsLoading);
  //  const {categoriesMap} = useContext(CategoriesContext)
  
    return(
        <div className="category-preview-container" >
            {
                isLoading ? (
                    <Spinner/>
                ): (
                    Object.keys(categoriesMap).map(title =>{
                        const products = categoriesMap[title];
                        return (
                            <CategoryPreview key={title} title={title} products={products}/>
                        );
                        })
                )
                
            }
          
        </div>
       
    )

}

export default CategoriesPreview;