import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Search from '../Search/Search';
import Notifications from '../Notification/Notifications';

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    'New movie release: Avengers!',
    'Your subscription is due for renewal.',
    '50% off on selected movies!',
  ]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const openSearch = () => {
    setIsSearchOpen(true);
  };

  const closeSearch = () => {
    setIsSearchOpen(false);
  };

  const openNotifications = () => {
    setIsNotificationsOpen(true);
  };

  const closeNotifications = () => {
    setIsNotificationsOpen(false);
  };

  return (
    <>
      <header className={`header ${isScrolled ? 'header--scrolled' : ''}`}>
        <div className="header__left">
          <div className="header__logo">
            <Link to="/">
              <img src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" alt="Netflix Logo" />
            </Link>
          </div>
          <div className="header__dropdown">
            <button className="header__dropdown-button" onClick={toggleDropdown}>
              Browse <i className="fas fa-chevron-down"></i>
            </button>
            {isDropdownOpen && (
              <ul className="header__dropdown-menu">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/tv-shows">TV Shows</Link></li>
                <li><Link to="/movies">Movies</Link></li>
                <li><Link to="/latest">Latest</Link></li>
                <li><Link to="/my-list">My List</Link></li>
                <li><Link to="/browse-by-languages">Browse by Languages</Link></li> 
              </ul>
            )}
          </div>
        </div>
        <nav className="header__nav">
          <ul className="header__nav-list">
            <li className="header__nav-item"><Link to="/">Home</Link></li>
            <li className="header__nav-item"><Link to="/tv-shows">TV Shows</Link></li>
            <li className="header__nav-item"><Link to="/movies">Movies</Link></li>
            <li className="header__nav-item"><Link to="/latest">Latest</Link></li>
            <li className="header__nav-item"><Link to="/my-list">My List</Link></li>
            <li className="header__nav-item"><Link to="/browse-by-languages">Browse by Languages</Link></li> 
          </ul>
        </nav>
        <div className="header__icons">
          <i className="fas fa-search header__icon" onClick={openSearch}></i>
          <i className="fa-regular fa-bell header__icon" onClick={openNotifications}></i>
          <div className="header__user-icon">
            <img src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png" alt="User Icon" />
          </div>
        </div>
      </header>
      {isSearchOpen && <Search onClose={closeSearch} />}
      {isNotificationsOpen && <Notifications notifications={notifications} onClose={closeNotifications} />}
    </>
  );
};

export default Header;
