import React, { useState, useEffect } from 'react';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import MovieList from '../../Components/MovieList/MovieList'; // Reusing the MovieList component
import './BrowseByLanguages.css';
import axios from 'axios';

const API_KEY = '97c9fbc7ec9c3095368e45cd6f9af8db'; // Replace with your actual TMDB API key
const BASE_URL = 'https://api.themoviedb.org/3';

const BrowseByLanguages = () => {
  const [language, setLanguage] = useState('en');
  const [sortOption, setSortOption] = useState('popularity.desc');
  const [movies, setMovies] = useState([]);
  const [tvShows, setTvShows] = useState([]);

  useEffect(() => {
    const fetchMoviesAndTvShows = async () => {
      try {
        const responseMovies = await axios.get(`${BASE_URL}/discover/movie`, {
          params: {
            api_key: API_KEY,
            language: language,
            sort_by: sortOption
          }
        });

        const responseTvShows = await axios.get(`${BASE_URL}/discover/tv`, {
          params: {
            api_key: API_KEY,
            language: language,
            sort_by: sortOption
          }
        });

        setMovies(responseMovies.data.results);
        setTvShows(responseTvShows.data.results);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchMoviesAndTvShows();
  }, [language, sortOption]);

  return (
    <div>
      <Header />
      <div className="browseByLanguages">
        <h1 className="browseByLanguages__title">Browse by Languages</h1>
        <div className="browseByLanguages__filters">
          <div className="browseByLanguages__filter">
            <label htmlFor="language">Language</label>
            <select id="language" value={language} onChange={(e) => setLanguage(e.target.value)}>
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
              {/* Add more languages as needed */}
            </select>
          </div>
          <div className="browseByLanguages__filter">
            <label htmlFor="sort">Sort by</label>
            <select id="sort" value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
              <option value="popularity.desc">Suggestions For You</option>
              <option value="release_date.desc">Release Date</option>
              <option value="vote_average.desc">Highest Rated</option>
              {/* Add more sorting options as needed */}
            </select>
          </div>
        </div>
        <div className="browseByLanguages__content">
          <h2>Movies</h2>
          <div className="browseByLanguages__list">
            {movies.map((movie) => (
              <div key={movie.id} className="browseByLanguages__item">
                <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
                <p>{movie.title}</p>
              </div>
            ))}
          </div>
          <h2>TV Shows</h2>
          <div className="browseByLanguages__list">
            {tvShows.map((tvShow) => (
              <div key={tvShow.id} className="browseByLanguages__item">
                <img src={`https://image.tmdb.org/t/p/w200${tvShow.poster_path}`} alt={tvShow.name} />
                <p>{tvShow.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BrowseByLanguages;
