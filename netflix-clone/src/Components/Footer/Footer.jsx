import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__social-media">
        <i className="fab fa-facebook-f"></i>
        <i className="fab fa-instagram"></i>
        <i className="fab fa-youtube"></i>
      </div>
      <div className="footer__links">
        <ul className="footer__link-list">
          <li className="footer__link-item"><a href="#">Audio Description</a></li>
          <li className="footer__link-item"><a href="#">Investor Relations</a></li>
          <li className="footer__link-item"><a href="#">Legal Notices</a></li>
        </ul>
        <ul className="footer__link-list">
          <li className="footer__link-item"><a href="#">Help Center</a></li>
          <li className="footer__link-item"><a href="#">Jobs</a></li>
          <li className="footer__link-item"><a href="#">Cookie Preferences</a></li>
        </ul>
        <ul className="footer__link-list">
          <li className="footer__link-item"><a href="#">Gift Cards</a></li>
          <li className="footer__link-item"><a href="#">Terms of Use</a></li>
          <li className="footer__link-item"><a href="#">Corporate Information</a></li>
        </ul>
        <ul className="footer__link-list">
          <li className="footer__link-item"><a href="#">Media Center</a></li>
          <li className="footer__link-item"><a href="#">Privacy</a></li>
          <li className="footer__link-item"><a href="#">Contact Us</a></li>
        </ul>
      </div>
      <button className="footer__service-code">Service Code</button>
      <div className="footer__copyright">
        &copy; 1997-2024 Netflix, Inc.
      </div>
    </footer>
  );
};

export default Footer;
