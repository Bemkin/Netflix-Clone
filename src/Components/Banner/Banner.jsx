import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import YouTube from 'react-youtube';
import Modal from '../Modal/Modal'; 
import './Banner.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { VideoContext } from '../MovieList/VideoContext'; // Import the context

const API_KEY = '97c9fbc7ec9c3095368e45cd6f9af8db'; 
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
  const [showModal, setShowModal] = useState(false);
  const { playingVideo, setPlayingVideo, pausePlayingVideo, setPausePlayingVideo } = useContext(VideoContext); // Use the context

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
    if (playingVideo && playingVideo !== 'banner' && pausePlayingVideo) {
      pausePlayingVideo();
    }
    setPlayingVideo('banner');
    setPausePlayingVideo(() => () => {
      setTrailerUrl('');
    });
    if (item && item.videos && item.videos.results) {
      const trailer = item.videos.results.find((video) => video.type === "Trailer");
      setTrailerUrl(trailer ? `https://www.youtube.com/watch?v=${trailer.key}` : '');
    }
  };

  const handleCloseVideo = () => {
    setTrailerUrl('');
  };

  const handleMoreInfo = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const opts = {
    height: '100%',
    width: '100%', 
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
                &times; 
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
      {showModal && <Modal item={item} onClose={handleCloseModal} />}
    </>
  );
};

export default Banner;
