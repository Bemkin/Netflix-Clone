import React from 'react';
import './Notifications.css';

const Notifications = ({ notifications, onClose }) => {
  return (
    <div className="notifications">
      <div className="notifications__overlay" onClick={onClose}></div>
      <div className="notifications__content">
        <button className="notifications__close" onClick={onClose}>&times;</button>
        <h3>Notifications</h3>
        <ul className="notifications__list">
          {notifications.map((notification, index) => (
            <li key={index} className="notifications__item">
              {notification}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Notifications;
