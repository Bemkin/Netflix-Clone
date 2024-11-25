import React from 'react';
import Banner from '../../Components/Banner/Banner';
import MovieList from '../../Components/MovieList/MovieList';
import './TvShows.css';

const TvShows = () => {
  return (
    <div>
      
      <Banner contentType="tv" /> 
      <MovieList title="Trending TV Shows" fetchUrl="/trending/tv/week" />
      <MovieList title="Top Rated TV Shows" fetchUrl="/tv/top_rated" />
      <MovieList title="Action & Adventure" fetchUrl="/discover/tv?with_genres=10759" />
      <MovieList title="Comedy TV Shows" fetchUrl="/discover/tv?with_genres=35" />
      <MovieList title="Drama TV Shows" fetchUrl="/discover/tv?with_genres=18" />
      <MovieList title="Sci-Fi & Fantasy" fetchUrl="/discover/tv?with_genres=10765" />
    </div>
  );
};

export default TvShows;
