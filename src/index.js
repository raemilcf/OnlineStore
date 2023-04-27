import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { HashRouter} from 'react-router-dom'; //add react-router-dom to handle navigation 


import App from './App';

import { UserProvider } from './context/user.context';
import { CategoriesProvider } from './context/categories.context';
import { CartProvider } from './context/cart.context';

import './index.scss';

//before inserting the provider we need to identify if is needed after login or before any other provider
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <React.StrictMode>
  <HashRouter>
  {/* which user has access to our components  */}
  <UserProvider> 
    <CategoriesProvider>  
      <CartProvider>
        
        <App />
      </CartProvider>
    </CategoriesProvider>
    </UserProvider> 
  </HashRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
