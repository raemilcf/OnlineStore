import { Route, Routes } from 'react-router-dom';
import Home from './routes/home/home.component';
import './App.css';


const Shop = () => {

  return(

    <div>
      <h1>I'm shop</h1>
    </div>

  );

}

const App  = ()=> {
  return(
    <Routes>
      <Route path='/home' element={ <Home />} >
        <Route path='shop' element={ <Shop />} />

      </Route>

    </Routes>
  );
  
 
};


 



export default App;
