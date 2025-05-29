import React from 'react';
import './Content.css';
import Book from '../../../assets/icons/Diary.svg';

const Content = () => (
  <>
    <div className="header-wrapper">
      <div className="header-content">
        <p>Don't let your dreams fade away</p>
      </div>
      <img
        src={Book}
        alt="Book"
        className="book-icon"
      />
    </div>

    <div className="header-line"></div>
  </>
);

export default Content;
