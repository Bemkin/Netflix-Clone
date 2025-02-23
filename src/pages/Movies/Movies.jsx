import React from 'react';
import Banner from '../../Components/Banner/Banner';
import MovieList from '../../Components/MovieList/MovieList';
import './Movies.css';

const Movies = () => {
  return (
    <div>
     
      <Banner contentType="movie" /> 
      <MovieList title="Trending Movies" fetchUrl="/trending/movie/week" />
      <MovieList title="Top Rated Movies" fetchUrl="/movie/top_rated" />
      <MovieList title="Action Movies" fetchUrl="/discover/movie?with_genres=28" />
      <MovieList title="Comedy Movies" fetchUrl="/discover/movie?with_genres=35" />
      <MovieList title="Horror Movies" fetchUrl="/discover/movie?with_genres=27" />
      <MovieList title="Romance Movies" fetchUrl="/discover/movie?with_genres=10749" />
      
    </div>
  );
};

export default Movies;
