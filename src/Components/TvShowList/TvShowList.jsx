import React from 'react';
import './TvShowList.css';

const TvShowList = ({ tvShows }) => {
  return (
    <div className="tvShowList">
      {tvShows.map(tvShow => (
        <div key={tvShow.id} className="tvShowList__item">
          <img
            src={`https://image.tmdb.org/t/p/w200${tvShow.poster_path}`}
            alt={tvShow.name}
          />
          <h3>{tvShow.name}</h3>
        </div>
      ))}
    </div>
  );
};

export default TvShowList;
