import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import Header from './Components/Header/Header';
import Home from './pages/Home/Home';
import TvShows from './pages/TvShows/TvShows';
import Footer from './Components/Footer/Footer';

const App = () => {
  return (
    <>
      <Header />
      <Routes> 
        <Route path="/" element={<Home />} /> 
        <Route path="/tv-shows" element={<TvShows />} />
      </Routes>
      <Footer/>
    </>
  );
};

export default App;
