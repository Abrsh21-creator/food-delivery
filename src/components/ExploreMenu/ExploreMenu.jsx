import React from 'react'
import './ExploreMenu.css'
import { menu_list } from "../../assets/assets.js";


import PropTypes from 'prop-types';

const ExploreMenu = ({category, setCategory}) => {

//ADD

ExploreMenu.propTypes = {
  category: PropTypes.string.isRequired,
  setCategory: PropTypes.func.isRequired
};



  return (
    <div className='explore-menu' id='explore-menu'>
        <h1>Explore our Menu</h1>
        <p className='explore-menu-text'>Choose from our delicious options</p>
        <div className="explore-menu-list">
            {menu_list.map((item,index)=>{
                return(
                    <div onClick={()=>setCategory(prev=>prev===item.menu_name?"All":item.menu_name)} key={index} className="explore-menu-list-item" >
                        <img src={item.menu_image} alt="" />
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
