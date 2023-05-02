//declare all the data you need to access to simplify the use and declaration in the componenet
export const selectCategoriesMap  = (state) =>  
state.categories.categories
.reduce( (accumulator, {title, items} ) => {
            //insert all list of items per category
            accumulator[title.toLowerCase()]=items;
            return accumulator;

        }, {});