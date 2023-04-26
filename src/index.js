import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter , HashRouter as Router} from 'react-router-dom'; //add react-router-dom to handle navigation 


import App from './App';

import { UserProvider } from './context/user.context';
import { ProductsProvider } from './context/products.context';
import { CartProvider } from './context/cart.context';

import './index.scss';

//before inserting the provider we need to identify if is needed after login or before any other provider
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <React.StrictMode>
      <BrowserRouter>
      {/* which user has access to our components  */}
      <UserProvider> 
        <ProductsProvider>  
          <CartProvider>
            
            <App />
          </CartProvider>
        </ProductsProvider>
        </UserProvider> 
      </BrowserRouter>
    </React.StrictMode>
  </Router>
 
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
