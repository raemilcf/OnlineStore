import logo from './logo.svg';
import './App.css';


const App  = ()=> {


  const categories = [
    {
      id: 1,
      title: 'Hats'
    },
    {
      id: 2,
      title: 'Sneakers'
    },
  ]

  return (
    <div className="categories-container">
    {categories.map((category) => {
          return (
            <div key={category.id}  class="categories-contariner">
              <div className='background-image'/>
                <div className='categories-body-container'>
                  <h2>{category.title}</h2>
                  <p>shop now</p>

                </div>
            </div>   
          );
        }
      )
    };
    </div>  
  );
  
};


 



export default App;
