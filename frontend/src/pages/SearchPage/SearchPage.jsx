import React from 'react'
import './SearchPage.css'
import FoodItem from '../../components/FoodItem/FoodItem'

const SearchPage = ({SearchResult}) => {
  return (
    <div>
        {
            SearchResult.map((search, index => {
                <FoodItem key={index} id={search._id} name={search.name} description={search.description} price={search.price} image={search.image} />
            }))
        }
    </div>
  )
}

export default SearchPage