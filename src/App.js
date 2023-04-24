import { Route, Routes } from 'react-router-dom';

import Navigation from './routes/navigation/navigation.component';
import Home from './routes/home/home.component';
import Authentication from './routes/authentication/authentication.component';


import './App.css';




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
        <Route path='auth' element={ <Authentication />} />

      </Route>
      

    </Routes>
  );
  
 
};


 



export default App;
