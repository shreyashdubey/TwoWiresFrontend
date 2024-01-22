import React from "react";

const SearchResults = ({ results, sendFriendRequest }) => {
  return (
    <div className="search-results">
      <h2>Search Results</h2>
      {results.length === 0 ? (
        <p>{results.message}</p>
      ) : (
        <ul>
          {results.map((user) => (
            <li key={user._id}>
              <div className="user-result">
                <h4>{user.username}</h4>
                <p>{user.profession}</p>
                <p>{user.expertise}</p>
                <button onClick={() => sendFriendRequest(user._id)}>
                  Send Friend Request
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchResults;
