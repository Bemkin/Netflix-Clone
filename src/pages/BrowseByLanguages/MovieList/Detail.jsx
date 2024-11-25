import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';

import axios from 'axios';
import './Detail.css';

const API_KEY = '97c9fbc7ec9c3095368e45cd6f9af8db';
const BASE_URL = 'https://api.themoviedb.org/3';

const Detail = () => {
  const { id } = useParams();
  const { pathname } = useLocation();
  const [details, setDetails] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const type = pathname.includes('movie') ? 'movie' : 'tv';
        const response = await axios.get(`${BASE_URL}/${type}/${id}`, {
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
  }, [id, pathname]);

  if (!details) {
    return <div className='loading'>Loading...</div>;
  }

  return (
    <div>
      
      <div className="detail">
        <h1 className="detail__title">{details.title || details.name}</h1>
        <img src={`https://image.tmdb.org/t/p/original${details.backdrop_path}`} alt={details.title || details.name} className="detail__image" />
        <p className="detail__description">{details.overview}</p>
        <p className="detail__info"><strong>Release Date:</strong> {details.release_date || details.first_air_date}</p>
        <p className="detail__info"><strong>Rating:</strong> {details.vote_average}</p>
      </div>
    
    </div>
  );
};

export default Detail;
