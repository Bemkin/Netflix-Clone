import React from 'react';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import Banner from '../../Components/Banner/Banner';
import MovieList from '../../Components/MovieList/MovieList';
import './Home.css';

const Home = () => {
  return (
    <div>
      <Header/>
      <Banner/>
      <MovieList title="Trending Now" fetchUrl="/trending/all/week" />
      <MovieList title="Top Rated" fetchUrl="/movie/top_rated" />
      <MovieList title="Action Movies" fetchUrl="/discover/movie?with_genres=28" />
      <MovieList title="Comedy Movies" fetchUrl="/discover/movie?with_genres=35" />
      <MovieList title="Horror Movies" fetchUrl="/discover/movie?with_genres=27" />
      <MovieList title="Romance Movies" fetchUrl="/discover/movie?with_genres=10749" />
      <Footer/>
    </div>
  );
};

export default Home;
