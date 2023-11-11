import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import '../App.css';
import { UserContext } from '../UserContext';
import SearchBar from './SearchBar';
import SearchResults from './SearchResult';
import FriendRequest from './FriendRequest';
import { Link } from 'react-router-dom';
import ChatRoom from './ChatWindow'
import FriendsListModal from './FriendListModal';
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const Home = () => {
  
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const [username, setUsername] = useState("");

  const [posts, setPosts] = useState([]);
  const [formData, setFormData] = useState({
    text: '',
    image: null,
    video: null,
  });
  const [searchResults, setSearchResults] = useState([]);
  const [message, setMessage] = useState('');
  const { userData } = useContext(UserContext);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    axios
      .get('http://localhost:3001/api/posts/get')
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
      });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newPostData = new FormData();
    newPostData.append('user', userData.userId);
    newPostData.append('text', formData.text);
    if (formData.image) {
      newPostData.append('image', formData.image);
    }
    if (formData.video) {
      newPostData.append('video', formData.video);
    }

    try {
      await axios.post('http://localhost:3001/api/posts/create', newPostData);
      setFormData({
        text: '',
        image: null,
        video: null,
      });
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const handleChange = (event) => {
    const { name, value, files } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSearch = async (option, query) => {
    try {
        const response = await axios.get('http://localhost:3001/api/users/search', {
            params: { [option]: query },
        });

        if ('message' in response.data && response.data.message === 'You have not searched anything') {
            setSearchResults([]);
            setMessage(response.data.message); // Set the message to be displayed
        } else {
            setSearchResults(response.data.users);
            setMessage(''); // Clear any previous messages
        }
    } catch (error) {
        console.error('Search error:', error);
    }
};

  
  const sendFriendRequest = async (userId) => {
    try {
      const response = await axios.post('http://localhost:3001/api/connectroute/send', {
        receiverId: userId,
      },
      {withCredentials : true}
      );
      alert(response.data.message); // Display success message
    } catch (error) {
      console.error('Friend request error:', error);
    }
  };
   
  const handleFriendClick = (friendId) => {
    setSelectedFriend(friendId);
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <div className="moxie-heading">
        <h2>Moxie</h2>
        <hr />
      </div>
      <div className="home-container">
        {/* Display user's post feed */}
        
        {!posts.length && posts?.map((post) => (
          <div key={post._id}>
            {post.text && <p>{post.text}</p>}
            {/* Display images */}
            {post.image && (
              <img
              src={require(`./images/${post.image}`)} alt={`Image`} className="post-image" 
             style={{ width: '520px', height: '430px' }}
              />
            )}
            {/* Display videos */}
            {post.video && (
              <video controls className="post-video"
              style={{
                  width: '520px', /* Set the desired width */
                  height: '430px', /* Set to 'auto' for maintaining the aspect ratio */
                 // objectFit: 'cover' /* Adjust based on your needs: 'cover', 'contain', 'fill', etc. */
                }}
                >
                <source src={require(`./videos/${post.video}`)} type="video/mp4" 
                />
                Your browser does not support the video tag.
              </video>
            )}
            <hr />
          </div>
        ))}

        {/* Form to upload a new post */}
        <form onSubmit={handleSubmit}>
          <textarea
            name="text"
            value={formData.text}
            onChange={handleChange}
            placeholder="Enter your post text"
          />
          <input type="file" name="image" onChange={handleChange} accept="image/*" />
          <input type="file" name="video" onChange={handleChange} accept="video/*" />
          <button type="submit">Post</button>
        </form>
      </div>
      {/* Render the SearchBar component and pass the handleSearch function as a prop */}
      <SearchBar onSearch={handleSearch} />

      {/* Render the SearchResults component and pass the search results as a prop */}
      <SearchResults results={searchResults} sendFriendRequest={sendFriendRequest} />
      <Link to="/friend-requests">FriendRequests</Link>
      
      {/* Render the selected chat room */}
      <div>
      <h2>Home Page</h2>
      <button onClick={openModal}>Message</button>
      {showModal && <FriendsListModal onClose={closeModal} />}
      </div>   
    </div>
  );
};

export default Home