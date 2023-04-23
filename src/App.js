import { Route, Routes } from 'react-router-dom';

import Navigation from './routes/navigation/navigation.component';
import Home from './routes/home/home.component';

import './App.css';
import SignIn from './routes/sign-in/sign-in.component';




const Shop = () => {

  return(

    <div>
      <h1>I'm shop</h1>
    </div>

  );

}

const App  = ()=> {
  return( //create all the routing pages existing and access 
    <Routes>
      <Route path='/' element= {<Navigation />}>
        <Route index element={ <Home />} />
        <Route path='shop' element={ <Shop />} />
        <Route path='signIn' element={ <SignIn />} />

      </Route>
      

    </Routes>
  );
  
 
};


 



export default App;
