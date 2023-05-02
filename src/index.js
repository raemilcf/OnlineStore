import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom'; //add react-router-dom to handle navigation 
import { Provider } from 'react-redux';

import App from './App';

import { CartProvider } from './context/cart.context';
import { store } from './store/store';

import './index.scss';

//before inserting the provider we need to identify if is needed after login or before any other provider
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
      {/* which user has access to our components  */}
            <CartProvider>
              
              <App />
            </CartProvider>
      </BrowserRouter>
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