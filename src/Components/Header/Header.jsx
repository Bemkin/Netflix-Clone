import React, { useState } from 'react';
import './Header.css';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import Font Awesome CSS

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header className="header">
      <div className="header__left">
        <div className="header__logo">
          <img src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" alt="Netflix Logo" />
        </div>
        <div className="header__dropdown">
          <button className="header__dropdown-button" onClick={toggleDropdown}>
            Browse <i className="fas fa-chevron-down"></i>
          </button>
          {isDropdownOpen && (
            <ul className="header__dropdown-menu">
              <li><a href="#">Home</a></li>
              <li><a href="#">TV Shows</a></li>
              <li><a href="#">Movies</a></li>
              <li><a href="#">Latest</a></li>
              <li><a href="#">My List</a></li>
              <li><a href="#">Browse by Languages</a></li>
            </ul>
          )}
        </div>
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
