import React from 'react';
import './DreamerList.css';

const DreamerList = ({ title, items }) => {
  return (
    <section className="dreamer-list">
      <h3>{title}</h3>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            <input type="checkbox" id={`item-${index}`} />
            <label htmlFor={`item-${index}`}>{item}</label>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default DreamerList;