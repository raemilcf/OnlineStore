import { AnyAction } from "redux";


//create a action type guard to prevent ts asumes one reducer is able to receive every action / or matchable to allow match any action with the correct createAction
//union type with ->|
//intersection types - joining two different type  with & 
//return type allows to get the return type of a function ReturnType<func>
//AC = action creator
//any actions is any = string bool number payload etc

//receives an action creator that is extended from AnyAction (can be anything), then we say it could be a hybrid AC or a function that has 
//type (behaves like a generic asuming the type received) and a match (a generic )
type Matchable<AC extends () => AnyAction> = AC & {
    type: ReturnType<AC>['type'];
    match(action: AnyAction): action is ReturnType<AC>;
}
//overloading all match we might have 
export function withMatcher<AC extends () => AnyAction & {type: string}>(actionCreator: AC): Matchable<AC>;

export function withMatcher<AC extends (...args : any[]) => AnyAction & {type : string}>(actionCreator : AC ): Matchable<AC>;

//implementation 
//receive a generic, extract type of this action creator and type to use it in the reducers
export function withMatcher(actionCreator: Function){
    const type = actionCreator().type;
    return Object.assign(actionCreator, {
        type, 
        match(action: AnyAction){
            return action.type ===type;
        }
    });
};


export type  ActionWithPayload<T, P> = {
    type: T,
    payload: P;
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