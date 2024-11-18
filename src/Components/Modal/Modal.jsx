import React from 'react';
import './Modal.css';

const Modal = ({ item, onClose }) => {
  if (!item) return null;

  return (
    <div className="modal">
      <div className="modal__content">
        <span className="modal__close" onClick={onClose}>&times;</span>
        <h2>{item.title || item.name || item.original_name}</h2>
        <p><strong>Release Date:</strong> {item.release_date || item.first_air_date}</p>
        <p><strong>Rating:</strong> {item.vote_average}</p>
        <p><strong>Overview:</strong> {item.overview}</p>
        {item.genres && (
          <p><strong>Genres:</strong> {item.genres.map((genre) => genre.name).join(', ')}</p>
        )}
        {item.production_companies && (
          <p><strong>Production Companies:</strong> {item.production_companies.map((company) => company.name).join(', ')}</p>
        )}
      </div>
    </div>
  );
};

export default Modal;
