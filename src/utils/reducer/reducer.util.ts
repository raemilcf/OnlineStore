import { AnyAction } from "redux";


export type  ActionWithPayload<T, P> = {
    type: T,
    payload?: P;
}
//avoid undefined payload 
export type Action<T> = {
    type: T;
}

//function overloading -> create multiple type definition to receive different parameter types 

//only if function is called with type and payload 
export function createAction<T extends string, P>(type: T, payload: P): ActionWithPayload<T, P>;

//called only if is call with only type , we have to send same numbers of parameter, the ones that are not being sent then initialize as void
export function createAction<T extends string>(type: T, payload: void): Action<T>;

//function declaration 
export function createAction<T extends string, P>(type: T, payload: P) {
    return { type, payload };
}

///arrow function declaration 
//export const createAction = (type, payload) =>({type , payload});