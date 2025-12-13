import React, { useContext } from "react";
import './FoodDisplay.css'
import { StoreContext } from "../context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";


import PropTypes from 'prop-types';



const FoodDisplay = ({ category }) => {
  const { food_list, searchText } = useContext(StoreContext);

  // Filter food items based on category and search text
  const filterFoodItems = (items, category, searchText) => {
    return items.filter(item => {
      // Category filter
      const matchesCategory = category === "All" || category === item.category;
      
      // Search filter (case-insensitive, matches name or description)
      const matchesSearch = searchText === '' || 
        item.name.toLowerCase().includes(searchText.toLowerCase()) ||
        item.description.toLowerCase().includes(searchText.toLowerCase());
      
      return matchesCategory && matchesSearch;
    });
  };

  const filteredItems = filterFoodItems(food_list, category, searchText);
  return (
    <div className='food_display' id='food-display'>
        <h2>Top dishes near you</h2>
        {filteredItems.length === 0 ? (
          <p className="no-results">No food items match your search</p>
        ) : (
          <div className="food-display-list">
            {filteredItems.map((item, index) => (
              <FoodItem 
                key={index} 
                id={item._id} 
                name={item.name} 
                description={item.description} 
                price={item.price} 
                image={item.image} 
              />
            ))}
          </div>
        )}
    </div>
  )
}

export default FoodDisplay
