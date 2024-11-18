import React from 'react';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import Banner from '../../Components/Banner/Banner';
import MovieList from '../../Components/MovieList/MovieList'; // We'll reuse MovieList and rename it to TvShowList later
import './TvShows.css';

const TvShows = () => {
  return (
    <div>
      <Header />
      <Banner contentType="tv" /> {/* Specify content type as 'tv' */}
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
