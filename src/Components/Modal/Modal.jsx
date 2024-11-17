import React from 'react';
import './Modal.css';

const Modal = ({ movie, onClose }) => {
  if (!movie) return null;

  return (
    <div className="modal">
      <div className="modal__content">
        <span className="modal__close" onClick={onClose}>&times;</span>
        <h2>{movie.title || movie.name || movie.original_name}</h2>
        <p><strong>Release Date:</strong> {movie.release_date}</p>
        <p><strong>Rating:</strong> {movie.vote_average}</p>
        <p><strong>Overview:</strong> {movie.overview}</p>
        {movie.genres && (
          <p><strong>Genres:</strong> {movie.genres.map((genre) => genre.name).join(', ')}</p>
        )}
        {movie.production_companies && (
          <p><strong>Production Companies:</strong> {movie.production_companies.map((company) => company.name).join(', ')}</p>
        )}
        {/* Add more detailed information as needed */}
      </div>
    </div>
  );
};

export default Modal;
