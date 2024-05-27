import { Middleware } from "redux";
import { RootState } from "../store";

export const loggerMiddleware: Middleware<{}, RootState> = (store) => (next) =>(action) =>{
    if(!action.type){
         // If the action does not have a type, pass it to the next middleware or the reducer
        return next(action);
    }

    console.log('type:' , action.type);
    console.log('payload:' , action.payload);
    
    console.log('currentState:' , store.getState());
    // Call the next middleware or the reducer with the action
    next(action);

    console.log('next state:', store.getState());
}