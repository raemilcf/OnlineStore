//declare all the data you need to access to simplify the use and declaration in the componenet
export const selectCategoriesMap  = (state) =>  {
    console.log('selector fired');
    return state.categories.categories
   .reduce( (accumulator, {title, items} ) => {
               //insert all list of items per category
               accumulator[title.toLowerCase()]=items;
               return accumulator;
   
           }, {});
   
}

//redux logger should happen before the selector fires 
//when any action fires as long as reducer updates it does not matter, which part of the reducer your listenning every component that has a useSelector 
//is going to re-render our code  


//middleware 
//between UI components and reducer store just after logger is executed 
//middleware is excecuted after next is excecuted 

