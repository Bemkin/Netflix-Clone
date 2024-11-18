import React, { useState, useEffect } from 'react';
import './Header.css';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import Font Awesome CSS
import Search from '../Search/Search'; // Import the Search component
import Notifications from '../Notification/Notifications'; // Import the Notifications component

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false); // State for search visibility
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false); // State for notifications visibility
  const [notifications, setNotifications] = useState([
    'New movie release: Avengers!',
    'Your subscription is due for renewal.',
    '50% off on selected movies!',
  ]); // Mock notifications for now

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
            <a href="/"> 
              <img src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" alt="Netflix Logo" />
            </a>
          </div>
          <div className="header__dropdown">
            <button className="header__dropdown-button" onClick={toggleDropdown}>
              Browse <i className="fas fa-chevron-down"></i>
            </button>
            {isDropdownOpen && (
              <ul className="header__dropdown-menu">
                <li><a href="/">Home</a></li>
                <li><a href="/tv-shows">TV Shows</a></li>
                <li><a href="/movies">Movies</a></li>
                <li><a href="/latest">Latest</a></li>
                <li><a href="/my-list">My List</a></li>
                <li><a href="/browse-by-languages">Browse by Languages</a></li>
              </ul>
            )}
          </div>
        </div>
        <nav className="header__nav">
          <ul className="header__nav-list">
            <li className="header__nav-item"><a href="/">Home</a></li>
            <li className="header__nav-item"><a href="/tv-shows">TV Shows</a></li>
            <li className="header__nav-item"><a href="/movies">Movies</a></li>
            <li className="header__nav-item"><a href="/latest">Latest</a></li>
            <li className="header__nav-item"><a href="/my-list">My List</a></li>
            <li className="header__nav-item"><a href="/browse-by-languages">Browse by Languages</a></li>
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
