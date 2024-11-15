import React from 'react';
import './Header.css';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import Font Awesome CSS

const Header = () => {
  return (
    <header className="header">
      <div className="header__logo">
        <img src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" alt="Netflix Logo" />
      </div>
      <nav className="header__nav">
        <ul className="header__nav-list">
          <li className="header__nav-item"><a href="#">Home</a></li>
          <li className="header__nav-item"><a href="#">TV Shows</a></li>
          <li className="header__nav-item"><a href="#">Movies</a></li>
          <li className="header__nav-item"><a href="#">Latest</a></li>
          <li className="header__nav-item"><a href="#">My List</a></li>
          <li className="header__nav-item"><a href="#">Browse by Languages</a></li>
        </ul>
      </nav>
      <div className="header__icons">
        <i className="fas fa-search header__icon"></i>
        <i className="fas fa-bell header__icon"></i>
        <div className="header__user-icon">
          <img src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png" alt="User Icon" />
        </div>
      </div>
    </header>
  );
};

export default Header;
