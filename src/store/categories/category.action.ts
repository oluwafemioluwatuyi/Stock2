//import { getCategoriesAndDocuments } from "../../utils/firebase/firebaseutils";
import {createAction, Action, ActionWithPayload} from "../../utils/reducer/reducer.utils";
import { CATEGORIES_ACTION_TYPES, category} from "./category.types";

export type FetchCategoriesStart = Action<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START>
export type FetchCategoriesSuccess = ActionWithPayload<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, category[]>;
export type FetchCategoriesFailed = ActionWithPayload<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, Error>;

// union type
export type CategoryAction = FetchCategoriesStart | FetchCategoriesSuccess | FetchCategoriesFailed

export const fetchCategoriesStart = (): FetchCategoriesStart => createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START);

export const fetchCategoriesSuccess = (categoriesArray: category[]) => createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, categoriesArray);

export const fetchCategoriesFailed = (error:Error): FetchCategoriesFailed => createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, error);


// thunk middle ware
// export const fetchCategoriesAsync = () => async (dispatch) =>{
//     dispatch(fetchCategoriesStart())

//     try{
//         const categoriesArray = await getCategoriesAndDocuments('categories');
//        dispatch(fetchCategoriesSuccess(categoriesArray));
//     }catch(error){
//         dispatch(fetchCategoriesFailed(error));
//     }
// }