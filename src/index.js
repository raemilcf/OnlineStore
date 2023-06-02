import React from 'react';
import ReactDOM from 'react-dom/client'; //async import 
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom'; //add react-router-dom to handle navigation 
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Elements } from '@stripe/react-stripe-js'


import { store , persistor} from './store/store';
import { stripePromise } from './utils/stripe/stripe.utils';


import './index.scss';
import App from './App';


//before inserting the provider we need to identify if is needed after login or before any other provider
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}> 
      {/* loading = null renders nothing until persistor is done */}
        <BrowserRouter>   
        {/* any element can only exist once  */}
          <Elements stripe={stripePromise}>
            <App /> 
          </Elements>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();




//reducers -> redux - object representation of the values, the only thing it does is a representation of context
//instead of useState and useEffect --> action 

// type :string 
// payload : anything 

//Action  {type : "Toggle_cart_open", payload : anything}
//

//reducers are a funciton that return back an object 


//reducers a fnction that return  an object 


// const userReducer = (state, action) => {
//   //base on the state and action we will determine what object to return 
//   return {
//     currentUser :  //current state
//   }
// }


/*
Redux toolkit - easy to write the boiler plate code 
quiality of life improvement 



*/


/*
20. typescript 
typed language, helps organize the code 
what is expected to received 

GraphQL
only one request to only a one endpoint 
query request -> what we are looking for define by objects 
query request -> blob 
graphql response will be an object with the objecte sent filled 

graphql replace for redux 
@apollo/client make request within our components 
when writting our muttation do a test on graphql playgroud before

apollo client is the provider use for graphql 
graphql apollo chash by the query not by the items 

Muttations inside of apollo 
const SET_CATEGORY = g1l`
 mutation($category: Category!){
  addCategory(category: $category){
    id
    title 
  }
 }
 const [addCategory, { loading, error, data }] = useMutation(SET_CATEGORY); //will handle responses and loading state
addCategory({variable: {category: CategoryObject}}); //add the values 

redux vs apollo
apollo to use graphql your front need to know graphql 
need to know all the querys 
know how to write graphql 
scalability of the team

//Preformance optimazation in react 
//optimize code once bottleneck is detected 
//optime - expend more time on memory to later expend in other thing 
create selector memoization is done before so when user is navigating in the page then it does not take more time later 

spliting, dynamic imports, suspense and  lazy 




useMemo -> memoize the return value of the value 
useCallback memoize the function itself 

*/

/*

----------------------interview questions--------------------- 

Dont Over Complicate 

the less code your write the less you have to test 
clean predictable code 

be a late folower with the latest versions and new releases 
trim the fat 
-break bigger component in tiny components 
make it easier to test, to understand 
reusable components 

it will never be perfect 
always evolving 


https://github.com/sudheerj/reactjs-interview-questions#what-is-react
https://github.com/sudheerj/javascript-interview-questions

----------------------PWA questions--------------------- 

PWA -apps 
same behavior in phone and web 
google -came up with the idea 
Lighthouse - identify PWA percent 

Https -> have a checklist if message is intercepted it wont be a problem because is encripted 
-serve website thougth https 
* -> lets encrypt -free encrypted Certificate Authority 
* -> CloudFlare - cdn post 

App Manifest - behave like a native app, some of the views need to behave equal to a native android or ios app
splash screen - get from the manifest 

Service Worker - script browser run in the background 
its a programamble proxy -what happened on request by request basis 
safari 
background syncs and push notifications 

CRA - register service worker 
each developer team 
register the service worker - once is activated and succesful registered 
could be 
1. terminated 
2. running background to fetch messages that occur in the network 
service worker acts like a network proxy- checks if it really needs to go an execute that file 

*/
