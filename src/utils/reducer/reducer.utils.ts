import { AnyAction } from "redux";

// matchable types
type Matchable<AC extends () => AnyAction> = AC & {
    type: ReturnType<AC>['type'];
    match(action:AnyAction):action is ReturnType<AC>
}

export function withMatcher<AC extends () => AnyAction & {type:string}>(actionCreator:AC):Matchable<AC>;
export function withMatcher<AC extends(...args: any[])=> AnyAction & {type:string}>(actionCreator:AC):Matchable<AC>
export function withMatcher(actionCreator: Function){
    const type = actionCreator().type;
    return Object.assign(actionCreator,{
        type,
        match(action:AnyAction){
            return action.type === type;
        }
    })
}

// Defining the type and payload
export type ActionWithPayload<T, P> = {
    type: T;
    payload: P
}

// TYPE OFTYPES

export type Action<T> = {
    type:T;
}

//Overloading for type and payload | null
export function createAction<T extends string, P>(type: T, payload:P):  ActionWithPayload<T,P>;
export function createAction<T extends string>(type:T, payload: void): Action<T>;

// to return whether there is payload or not, added function overloading
export function createAction<T extends string, P>(type: T, payload:P) {
    return {type, payload}
}

//export const createAction = (type, payload)=>({type, payload});
