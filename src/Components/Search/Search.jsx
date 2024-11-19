import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Search.css';

const API_KEY = '97c9fbc7ec9c3095368e45cd6f9af8db'; // Replace with your actual TMDB API key
const BASE_URL = 'https://api.themoviedb.org/3';

const SearchBar = ({ onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async (event) => {
    event.preventDefault();
    if (query) {
      try {
        const response = await axios.get(`${BASE_URL}/search/multi`, {
          params: { api_key: API_KEY, query }
        });
        setResults(response.data.results);
      } catch (error) {
        console.error("Error searching:", error);
      }
    }
  };

  return (
    <div className="search">
      <div className="search__overlay" onClick={onClose}></div>
      <div className="search__content">
        <form className="search__form" onSubmit={handleSearch}>
          <input
            type="text"
            className="search__input"
            placeholder="Titles, people, genres"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit" className="search__button">Search</button>
          <button type="button" className="search__close" onClick={onClose}>&times;</button>
        </form>
        <div className="search__results">
          {results.map((result) => (
            <Link
              key={result.id}
              to={`/${result.media_type === 'movie' ? 'movie' : 'tv'}/${result.id}`}
              className="search__result"
              onClick={onClose}
            >
              <img
                src={`https://image.tmdb.org/t/p/w200${result.poster_path || result.profile_path}`}
                alt={result.title || result.name}
              />
              <p>{result.title || result.name}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
