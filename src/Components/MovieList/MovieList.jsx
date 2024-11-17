import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import './MovieList.css';
import YouTube from 'react-youtube';

const API_KEY = '97c9fbc7ec9c3095368e45cd6f9af8db';
const BASE_URL = 'https://api.themoviedb.org/3';

const MovieList = ({ title, fetchUrl }) => {
  const [movies, setMovies] = useState([]);
  const [clickedMovie, setClickedMovie] = useState(null);
  const [trailerUrl, setTrailerUrl] = useState('');
  const listRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(`${BASE_URL}${fetchUrl}`, {
          params: { api_key: API_KEY }
        });
        setMovies(response.data.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, [fetchUrl]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target) &&
        clickedMovie
      ) {
        setClickedMovie(null);
        setTrailerUrl('');
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [clickedMovie]);

  const handleScroll = (direction) => {
    if (listRef.current) {
      const { scrollLeft, clientWidth } = listRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      listRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  const fetchTrailer = async (movieId) => {
    try {
      const response = await axios.get(`${BASE_URL}/movie/${movieId}/videos`, {
        params: { api_key: API_KEY }
      });
      const trailers = response.data.results;
      if (trailers.length > 0) {
        const trailer = trailers.find((trailer) => trailer.type === 'Trailer');
        setTrailerUrl(trailer ? `https://www.youtube.com/watch?v=${trailer.key}` : '');
      }
    } catch (error) {
      console.error("Error fetching trailer:", error);
    }
  };

  const handleClick = async (movie) => {
    if (clickedMovie && clickedMovie.id === movie.id) {
      setClickedMovie(null);
      setTrailerUrl('');
    } else {
      setClickedMovie(movie);
      await fetchTrailer(movie.id);
    }
  };

  const handleClose = () => {
    setClickedMovie(null);
    setTrailerUrl('');
  };

  const opts = {
    height: '269',
    width: '400',
    playerVars: {
      autoplay: 1, // Automatically play the video
    },
  };

  return (
    <div className="movieList" ref={containerRef}>
      <h2>{title}</h2>
      <div className="movieList__container">
        <button className="movieList__arrow left" onClick={() => handleScroll('left')}>{'<'}</button>
        <div className="movieList__posters" ref={listRef}>
          {movies.map(movie => (
            <div 
              key={movie.id}
              className="movieList__poster-container"
              onClick={() => handleClick(movie)}
            >
              <img
                className="movieList__poster"
                src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                alt={movie.title}
              />
              {clickedMovie && clickedMovie.id === movie.id && trailerUrl && (
                <div className={`movieList__trailer movieList__trailer--visible`}>
                  <button className="movieList__close-button" onClick={handleClose}>X</button>
                  <YouTube videoId={trailerUrl.split('v=')[1]} opts={opts} />
                </div>
              )}
            </div>
          ))}
        </div>
        <button className="movieList__arrow right" onClick={() => handleScroll('right')}>{'>'}</button>
      </div>
    </div>
  );
};

export default MovieList;
