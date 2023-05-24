import { createSelector } from 'reselect';
import { CategoriesState } from './categories.reducer';
import { CategoryMap } from './categories.types';

//use meoization if the object does not change return same output, do no calculate over an over again 
const selectCategoryReducer = (state) : CategoriesState =>  state.categories;

//input selector and output selector 
export const selectCategories = createSelector(//memoaize selector 
    [selectCategoryReducer],//Input selector -> what i want 
    (categoriesSlice) =>  categoriesSlice.categories  //output -> what do I expect 
);

//declare all the data you need to access to simplify the use and declaration in the componenet
//only run when categories has change (due to memoization it saves always the last)
//if selectCategories is different it will be executed 
export const selectCategoriesMap  = createSelector(
    [selectCategories], //input 
    (categories) : CategoryMap => //output 
   categories
   .reduce( (accumulator, {title, items} ) => {
               //insert all list of items per category
               accumulator[title.toLowerCase()]=items;
               return accumulator;
   
           }, {} as CategoryMap)
);

export const selectCategoriesIsLoading = createSelector(
    [selectCategoryReducer],
    (categoriesSlice) => categoriesSlice.isLoading
)

//redux logger should happen before the selector fires 
//when any action fires as long as reducer updates it does not matter, which part of the reducer your listenning every component that has a useSelector 
//is going to re-render our code  


//middleware 
//between UI components and reducer store just after logger is executed 
//middleware is excecuted after next is excecuted 
