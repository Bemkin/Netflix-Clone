import React, { useState, useEffect } from 'react';
import axios from 'axios';
import YouTube from 'react-youtube';
import Modal from '../Modal/Modal'; // Import the Modal component
import './Banner.css';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import Font Awesome CSS

const API_KEY = '97c9fbc7ec9c3095368e45cd6f9af8db'; // Replace with your actual TMDB API key
const BASE_URL = 'https://api.themoviedb.org/3';

const fetchDetails = async (id, type) => {
  try {
    const response = await axios.get(`${BASE_URL}/${type}/${id}?api_key=${API_KEY}&append_to_response=videos`);
    return response.data;
  } catch (error) {
    console.error("Error fetching details:", error);
    return null;
  }
};

const Banner = ({ contentType }) => {
  const [item, setItem] = useState(null);
  const [trailerUrl, setTrailerUrl] = useState('');
  const [showModal, setShowModal] = useState(false); // State for modal visibility

  useEffect(() => {
    const loadItem = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/${contentType}/popular?api_key=${API_KEY}`);
        const items = response.data.results;
        const selectedItem = items[Math.floor(Math.random() * items.length)];
        const itemDetails = await fetchDetails(selectedItem.id, contentType);
        setItem(itemDetails);
      } catch (error) {
        console.error("Error loading item:", error);
      }
    };
    loadItem();
  }, [contentType]);

  const handlePlay = () => {
    if (item && item.videos && item.videos.results) {
      const trailer = item.videos.results.find((video) => video.type === "Trailer");
      setTrailerUrl(trailer ? `https://www.youtube.com/watch?v=${trailer.key}` : '');
    }
  };

  const handleCloseVideo = () => {
    setTrailerUrl(''); // Clear the trailer URL to stop the video and return to the banner content
  };

  const handleMoreInfo = () => {
    setShowModal(true); // Show the modal when "More Info" is clicked
  };

  const handleCloseModal = () => {
    setShowModal(false); // Close the modal
  };

  const opts = {
    height: '100%', // Full height
    width: '100%', // Full width
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <>
      <header className="banner" style={{ 
        backgroundSize: "cover", 
        backgroundImage: !trailerUrl && item ? `url("https://image.tmdb.org/t/p/original${item.backdrop_path}")` : '',
        backgroundPosition: "center center"
      }}>
        <div className="banner__contents">
          {trailerUrl ? (
            <div className="banner__video-container">
              <YouTube videoId={trailerUrl.split('v=')[1]} opts={opts} className="banner__video" />
              <button className="banner__close-video" onClick={handleCloseVideo}>
                &times; {/* Close button */}
              </button>
            </div>
          ) : (
            <>
              <h1 className="banner__title">{item?.title || item?.name || item?.original_name}</h1>
              <div className="banner__buttons">
                <button className="banner__button banner__button--play" onClick={handlePlay}>
                  <i className="fas fa-play"></i> Play
                </button>
                <button className="banner__button banner__button--info" onClick={handleMoreInfo}>
                  <i className="fas fa-info-circle"></i> More Info
                </button>
              </div>
              <h1 className="banner__description">{item?.overview}</h1>
            </>
          )}
        </div>
        <div className={`banner--fadeBottom ${trailerUrl ? 'banner--hidden' : ''}`}></div>
      </header>
      {showModal && <Modal item={item} onClose={handleCloseModal} />} {/* Display the modal when showModal is true */}
    </>
  );
};

export default Banner;
