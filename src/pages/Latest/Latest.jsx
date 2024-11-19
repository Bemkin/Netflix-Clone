import React from 'react';
import Banner from '../../Components/Banner/Banner';
import MovieList from '../../Components/MovieList/MovieList';
import './Latest.css';

const Latest = () => {
  return (
    <div>
      
      <Banner contentType="movie" /> {/* Specify content type as 'movie' for a generic latest banner */}
      <h1 className="latest__title">Latest Movies & TV Shows</h1>
      <MovieList title="Latest Movies" fetchUrl="/movie/now_playing" />
      <MovieList title="Upcoming Movies" fetchUrl="/movie/upcoming" />
      <MovieList title="Latest TV Shows" fetchUrl="/tv/airing_today" />
      <MovieList title="Popular TV Shows" fetchUrl="/tv/popular" />
      
    </div>
  );
};

export default Latest;
