import React from 'react';
import './SearchBar.css';
import { assets } from '../../assets/assets';

const SearchBar = ({ searchText, onSearchChange, onClear }) => {
  const handleInputChange = (event) => {
    onSearchChange(event.target.value);
  };

  const handleClear = () => {
    onClear();
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        value={searchText}
        onChange={handleInputChange}
        placeholder="Search for food items..."
        className="search-input"
        aria-label="Search for food items"
      />
      {searchText && (
        <button
          onClick={handleClear}
          className="clear-button"
          aria-label="Clear search"
        >
          <img src={assets.cross_icon} alt="Clear" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
