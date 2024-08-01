import React from 'react'
import './ExploreMenu.css'
import { menu_list } from '../../assets/assets'

const ExploreMenu = ({category, setCategory}) => {

    
    {console.log(category);}
  return (
    <div className='explore-menu' id='explore-menu'>
        <h1>Explore our menu</h1>
        <p className="explore-menu-text">
            Lorem ipsum dolor sit amet consectetur
             adipisicing elit. Odit ipsa libero nisi obcaecati delectus ipsum
              minima voluptate quis harum vero.
        </p>
        <div className="explore-menu-list">
            {menu_list.map((item, index) => {
                return (
                    <div onClick={() =>  setCategory(prevValue => prevValue === item.menu_name ? "All" : item.menu_name) }  key={index} className="explore-menu-list-item">
                        <img className={category===item.menu_name  ? "active" : null} src={item.menu_image} alt="" />
                        <p>{item.menu_name}</p>
                    </div>
                    
                )
            })}
        </div>

        <hr />
    </div>
  )
}


export default ExploreMenu