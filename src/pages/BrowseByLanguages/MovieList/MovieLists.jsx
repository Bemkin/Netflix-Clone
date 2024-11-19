import React from 'react';
import { Link } from 'react-router-dom';
import './MovieLists.css';

const MovieList = ({ title, fetchUrl, movies }) => {
  return (
    <div className="movieLists">
      <h2>{title}</h2>
      <div className="movieLists__posters">
        {movies.map((movie) => (
          <Link key={movie.id} to={`/movie/${movie.id}`} className="movieLists__item">
            <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title || movie.name} />
            <p>{movie.title || movie.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MovieList;
