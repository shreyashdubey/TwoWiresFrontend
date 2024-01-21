// SearchForm.js

import React, { useState } from "react";
import axios from "axios";

const SearchForm = ({ setSearchResults }) => {
  const [searchData, setSearchData] = useState({
    profession: "",
    expertise: "",
    username: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchData((prevSearchData) => ({
      ...prevSearchData,
      [name]: value,
    }));
  };

  const handleSearch = async () => {
    try {
      let query = "";
      if (searchData.profession) {
        query += `profession=${searchData.profession}&`;
      }
      if (searchData.expertise) {
        query += `expertise=${searchData.expertise}&`;
      }
      if (searchData.username) {
        query += `username=${searchData.username}`;
      }

      // Perform search based on the search query
      const response = await axios.get(`/api/users/search?${query}`);
      setSearchResults(response.data.users);
    } catch (error) {
      console.error("Error searching users:", error);
      setSearchResults([]);
    }
  };

  return (
    <div>
      <h2>Search Users</h2>
      <form onSubmit={handleSearch}>
        <div>
          <label htmlFor="profession">Profession:</label>
          <input
            type="text"
            name="profession"
            value={searchData.profession}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="expertise">Expertise:</label>
          <input
            type="text"
            name="expertise"
            value={searchData.expertise}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            name="username"
            value={searchData.username}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default SearchForm;
