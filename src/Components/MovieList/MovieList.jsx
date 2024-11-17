import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import './MovieList.css';

const API_KEY = '97c9fbc7ec9c3095368e45cd6f9af8db';
const BASE_URL = 'https://api.themoviedb.org/3';

const MovieList = ({ title, fetchUrl }) => {
  const [movies, setMovies] = useState([]);
  const listRef = useRef(null);

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

  const handleScroll = (direction) => {
    if (listRef.current) {
      const { scrollLeft, clientWidth } = listRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      listRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <div className="movieList">
      <h2>{title}</h2>
      <div className="movieList__container">
        <button className="movieList__arrow left" onClick={() => handleScroll('left')}>{'<'}</button>
        <div className="movieList__posters" ref={listRef}>
          {movies.map(movie => (
            <img
              key={movie.id}
              className="movieList__poster"
              src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
              alt={movie.title}
            />
          ))}
        </div>
        <button className="movieList__arrow right" onClick={() => handleScroll('right')}>{'>'}</button>
      </div>
    </div>
  );
};

export default MovieList;
