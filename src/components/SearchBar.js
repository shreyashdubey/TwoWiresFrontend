import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOption, setSelectedOption] = useState("username"); // Default option

  const handleChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(selectedOption, searchQuery);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={searchQuery}
        onChange={handleChange}
        placeholder="Search..."
      />
      <select value={selectedOption} onChange={handleOptionChange}>
        <option value="username">Username</option>
        <option value="profession">Profession</option>
        <option value="expertise">Expertise</option>
      </select>
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBar;
