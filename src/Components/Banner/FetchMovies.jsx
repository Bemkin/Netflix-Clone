import axios from 'axios';

const API_KEY = '97c9fbc7ec9c3095368e45cd6f9af8db'; 

const fetchMovies = async () => {
  try {
    const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`);
    return response.data.results;
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
};

export default fetchMovies;
