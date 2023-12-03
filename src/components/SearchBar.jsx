import React, { useState } from "react";

const SearchBar = ({ onSearch ,isActive , onDeleteSelected }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchTerm = (e) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    onSearch(newSearchTerm); 
  };

  return (
    <div id="inputSearch">
      <div>
        <input
          type="search"
          placeholder="Search ..."
          value={searchTerm}
          onChange={handleSearchTerm}
          
        />
      </div>
      <div id="delete-btn" style={{ opacity: isActive ? 1 : 0.5 }}
       onClick={onDeleteSelected}>
        <i class="bx bx-trash-alt" ></i>
       
      </div>
    </div>
  );
};

export default SearchBar;
