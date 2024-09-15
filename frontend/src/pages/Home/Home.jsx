import React, { useState, useContext } from 'react';
import './Home.css'; // Assuming the stylesheet is in the same directory
import Header from '../../components/header/Header';
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu';
import FoodDisplay from '../../components/Food Display/FoodDisplay'; // Consistent naming convention
import AppDownload from '../../components/AppDownload/AppDownload';
import { StoreContext } from '../../Context/StoreContext.jsx'; // Assuming context file path
import FoodItem from '../../components/FoodItem/FoodItem.jsx';

const Home = () => {
  const [category, setCategory] = useState('All');
  const { food_list, searchResult } = useContext(StoreContext);
  

  return (

    
    <div>
      {searchResult.length == 0 ? <div>
        <Header />
          <ExploreMenu category={category} setCategory={setCategory} />
          <FoodDisplay category={category} />
          <AppDownload />
          </div>
      
      :
      
      
         (
          <div className='food-display' id='food-display'>
              <h2>Top dishes near you</h2>
              <div className="food-display-list">
                  {searchResult.map((item, index) => {
      
                    
                   
                      return <FoodItem key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image} />
                    
               
                      
                  })}
              </div>
          </div>
        )
     
      
      
      } 
    </div>
  );
};

export default Home;