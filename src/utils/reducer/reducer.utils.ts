import { AnyAction } from "redux";

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
export function createAction<T extends string, P>(type: T, payload:T) {
    return {type, payload}
}

//export const createAction = (type, payload)=>({type, payload});
