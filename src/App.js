import { Suspense, lazy, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';

//import Navigation from './routes/navigation/navigation.component';
//import Home from './routes/home/home.component';
//import Shop from './routes/shop/shop.component';
//import Authentication from './routes/authentication/authentication.component';
//import Checkout from './routes/checkout/checkout.component';

import { checkUserSession } from './store/user/user.action';
import Spinner from './components/spinner/spinner.component';


//const Home = await  import(../) //dynamic import 
//dynamic loading with lazy
//lazy component -fecth only when its required 
const Home = lazy( () => import('./routes/home/home.component'));
const Navigation = lazy( () => import('./routes/navigation/navigation.component'));
const Authentication = lazy( () => import('./routes/authentication/authentication.component'));
const Shop = lazy( () => import('./routes/shop/shop.component'));
const Checkout = lazy( () => import('./routes/checkout/checkout.component'));




//props driling - send user data to all components 
//react context - save data to avoid passing data to all components and parents and child components 


const App  = ()=> {
  const dispatch = useDispatch();

  //validate we have our user , move our useEffect from user.context to app 
   //run when the component mount
    //allow to keep track of the auth state change listener 
    useEffect( () => { //only run to initialize our litener 
      dispatch(checkUserSession());

      // const unsubscribe = onAuthStateChangedListener((user) => {
      //     //if logged in with google sso account create user from document 
      //     if(user){
      //         createUserDocumentFromAuth(user);
      //     }
      //     //update hook with user 
      //     dispatch(setCurrentUser(user));
      //  });
      //  return unsubscribe;
  } ,[] ); //generate one dispatch for us and never change, we can add it as callback with no problem 


  return( //create all the routing pages existing and access 
  //we use suspense to wait for our lazy loading component, and meanwhile we show the spinner 
   <Suspense fallback= {<Spinner/>} > 
    <Routes>
        <Route path='/' element= {<Navigation />}>
          <Route index element={ <Home />} />
          {/* nested routes with dynamics routes  in shop pages, 
          declarating <shop />  with path like shop/*  we are indicating inside <shop/> will be more routes declared*/}
          <Route path='shop/*' element={ <Shop />} />
          <Route path='auth' element={ <Authentication />} />
          <Route path='checkout' element={ <Checkout />} />
        </Route>
      </Routes>
    </Suspense>
  );
  
 
};


 



export default App;
