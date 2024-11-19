import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Components/Header/Header';
import Home from './pages/Home/Home';
import TvShows from './pages/TvShows/TvShows';
import Movies from './pages/Movies/Movies';
import Latest from './pages/Latest/Latest'; // Import the Latest component
import Footer from './Components/Footer/Footer';
import MyList from './pages/MyList/MyList';
import BrowseByLanguages from './pages/BrowseByLanguages/BrowseByLanguages';
import Detail from './pages/BrowseByLanguages/MovieList/Detail';

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tv-shows" element={<TvShows />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/latest" element={<Latest />} /> 
        <Route path="/my-list" element={<MyList />} />
        <Route path="/browse-by-languages" element={<BrowseByLanguages />} />
        <Route path="/movie/:id" element={<Detail />} />
      </Routes>
      <Footer/>
    </>
  );
};

export default App;
