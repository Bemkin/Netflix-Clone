import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../../Components/Header/Header';
import Footer from '../../../Components/Footer/Footer';
import axios from 'axios';
import './Detail.css';

const API_KEY = '97c9fbc7ec9c3095368e45cd6f9af8db'; // Replace with your actual TMDB API key
const BASE_URL = 'https://api.themoviedb.org/3';

const Detail = () => {
  const { id } = useParams();
  const [details, setDetails] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/movie/${id}`, {
          params: {
            api_key: API_KEY
          }
        });
        setDetails(response.data);
      } catch (error) {
        console.error("Error fetching details:", error);
      }
    };

    fetchDetails();
  }, [id]);

  if (!details) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Header />
      <div className="detail">
        <h1 className="detail__title">{details.title}</h1>
        <img src={`https://image.tmdb.org/t/p/original${details.backdrop_path}`} alt={details.title} className="detail__image" />
        <p className="detail__description">{details.overview}</p>
        <p className="detail__info"><strong>Release Date:</strong> {details.release_date}</p>
        <p className="detail__info"><strong>Rating:</strong> {details.vote_average}</p>
        {/* Add more details as needed */}
      </div>
      <Footer />
    </div>
  );
};

export default Detail;
