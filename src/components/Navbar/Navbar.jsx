import React from 'react'
import { useState } from 'react'

import './Navbar.css'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { StoreContext } from '../context/StoreContext'
import SearchBar from '../SearchBar/SearchBar'



const Navbar = ({ setShowlogin }) => {
  const[menu, setMenu]=useState("Menu")
  const{getTotalCartAmount, searchText, setSearchText} = useContext(StoreContext);

  const handleSearchChange = (text) => {
    setSearchText(text);
  };

  const handleClear = () => {
    setSearchText('');
  };
  return (
    <div className="navbar">
       <Link to="/"><img src={assets.logo} alt="" className="logo" /></Link>
       <ul className="navbar-menu">
       <Link to="/" onClick={()=> setMenu("Home")} className={menu==="Home" ? "active":""}>Home</Link>
       <a href='#explore-menu' onClick={()=> setMenu("Menu")} className={menu==="Menu" ? "active":""}>Menu</a>
       <a href='#app-download' onClick={()=> setMenu("Mobile-App")} className={menu==="Mobile-App" ? "active":""}>Mobile-App</a>
       <a href='#footer' onClick={()=> setMenu("Contact Us")} className={menu==="Contact Us" ? "active":""}>Contact Us</a>
      </ul>
      <div className="Navbar-right">
        <SearchBar 
          searchText={searchText}
          onSearchChange={handleSearchChange}
          onClear={handleClear}
        />
        <Link to="/cart" className="Navbar-search_icon">
            <img src={assets.basket_icon} alt="" />
            <div className={getTotalCartAmount()===0 ?"" : "dot"}>

            </div>
            
        </Link>
        <button onClick={() => setShowlogin(true)}>Sign in</button>
      </div>
    </div>
  )
}

export default Navbar
