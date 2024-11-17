import React, { useState, useEffect } from 'react';
import axios from 'axios';
import YouTube from 'react-youtube';
import Modal from '../Modal/Modal'; // Import the Modal component
import './Banner.css';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import Font Awesome CSS

const API_KEY = '97c9fbc7ec9c3095368e45cd6f9af8db'; // Replace with your actual TMDB API key

const fetchMovieDetails = async (movieId) => {
  try {
    const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&append_to_response=videos`);
    return response.data;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    return null;
  }
};

const Banner = () => {
  const [movie, setMovie] = useState(null);
  const [trailerUrl, setTrailerUrl] = useState('');
  const [showModal, setShowModal] = useState(false); // State for modal visibility

  useEffect(() => {
    const loadMovie = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`);
        const movies = response.data.results;
        const selectedMovie = movies[Math.floor(Math.random() * movies.length)];
        const movieDetails = await fetchMovieDetails(selectedMovie.id);
        setMovie(movieDetails);
      } catch (error) {
        console.error("Error loading movie:", error);
      }
    };
    loadMovie();
  }, []);

  const handlePlay = () => {
    if (movie && movie.videos && movie.videos.results) {
      const trailer = movie.videos.results.find((video) => video.type === "Trailer");
      setTrailerUrl(trailer ? `https://www.youtube.com/watch?v=${trailer.key}` : '');
    }
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
        backgroundImage: !trailerUrl && movie ? `url("https://image.tmdb.org/t/p/original${movie.backdrop_path}")` : '',
        backgroundPosition: "center center"
      }}>
        <div className="banner__contents">
          {trailerUrl ? (
            <YouTube videoId={trailerUrl.split('v=')[1]} opts={opts} className="banner__video" />
          ) : (
            <>
              <h1 className="banner__title">{movie?.title || movie?.name || movie?.original_name}</h1>
              <div className="banner__buttons">
                <button className="banner__button banner__button--play" onClick={handlePlay}>
                  <i className="fas fa-play"></i> Play
                </button>
                <button className="banner__button banner__button--info" onClick={handleMoreInfo}>
                  <i className="fas fa-info-circle"></i> More Info
                </button>
              </div>
              <h1 className="banner__description">{movie?.overview}</h1>
            </>
          )}
        </div>
        <div className={`banner--fadeBottom ${trailerUrl ? 'banner--hidden' : ''}`}></div>
      </header>
      {showModal && <Modal movie={movie} onClose={handleCloseModal} />}
    </>
  );
};

export default Banner;
