import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Banner.css';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import Font Awesome CSS

const API_KEY = '97c9fbc7ec9c3095368e45cd6f9af8db'; // Replace with your actual TMDB API key

const fetchMovies = async () => {
  try {
    const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`);
    return response.data.results;
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
};

const fetchRating = async (movieId) => {
  try {
    const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/release_dates?api_key=${API_KEY}`);
    const usRelease = response.data.results.find(result => result.iso_3166_1 === 'US');
    return usRelease?.release_dates?.find(date => date.certification)?.certification || 'NR';
  } catch (error) {
    console.error("Error fetching rating:", error);
    return 'NR'; // Not Rated
  }
};

const truncate = (str, n) => {
  return str?.length > n ? str.substr(0, n - 1) + "..." : str;
};

const Banner = () => {
  const [movie, setMovie] = useState(null);
  const [rating, setRating] = useState('NR');

  useEffect(() => {
    const loadMovie = async () => {
      const movies = await fetchMovies();
      const selectedMovie = movies[Math.floor(Math.random() * movies.length)];
      setMovie(selectedMovie); // Fetch a random movie for the banner

      if (selectedMovie) {
        const fetchedRating = await fetchRating(selectedMovie.id);
        setRating(fetchedRating);
      }
    };
    loadMovie();
  }, []);

  return (
    <header className="banner" style={{ 
      backgroundSize: "cover", 
      backgroundImage: `url("https://image.tmdb.org/t/p/original${movie?.backdrop_path}")`,
      backgroundPosition: "center center"
    }}>
      <div className="banner__contents">
        {movie ? (
          <>
            <h1 className="banner__title">{movie.title}</h1>
            <div className="banner__buttons">
              <button className="banner__button banner__button--play">
                <i className="fas fa-play"></i>
                Play
              </button>
              <button className="banner__button banner__button--info">
                <i className="fas fa-info-circle"></i>
                More Info
              </button>
            </div>
            <h1 className="banner__description">{truncate(movie.overview, 300)}</h1>
            <div className="banner__pg-rating">{rating}</div> {/* Add PG rating */}
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <div className="banner--fadeBottom"></div>
    </header>
  );
};

export default Banner;
