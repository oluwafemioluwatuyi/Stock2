import { AnyAction } from "redux";
import { CATEGORIES_ACTION_TYPES , category} from "./category.types";
import { CategoryAction, fetchCategoriesStart, fetchCategoriesSuccess, FetchCategoriesFailed, fetchCategoriesFailed } from "./category.action";


export type CategoriesState = {
    readonly categories: category[];
    readonly isLoading: boolean;
    readonly error: Error | null
}


export const CATEGORIES_INITIAL_STATE: CategoriesState = {
    categories: [],
    isLoading: false,
    error:null,
};


export const categoriesReducer = (
    state = CATEGORIES_INITIAL_STATE, 
    action = {} as AnyAction // just one type of the action
): CategoriesState => {
    // instead of using switch statement, we narrow it by using the match method
    if(fetchCategoriesStart.match(action)){
        return {...state, isLoading:true};
    }

    if(fetchCategoriesSuccess.match(action)){
        return {...state, categories:action.payload, isLoading:false}
    }

    if(fetchCategoriesFailed.match(action)){
        return {...state, error:action.payload, isLoading:false}
    }    
    return state;


    // switch(action.type){
    //     case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START:
    //         return {...state, isLoading: true};
    //     case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS:
    //         return {
    //             ...state,
    //             categories:action.payload, isLoading: false
    //         }
    //         case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED:
    //             return {
    //                 ...state,
    //                 error: action.payload, isLoading: false
    //             }

    //         default:
    //         return state;
    // }
}