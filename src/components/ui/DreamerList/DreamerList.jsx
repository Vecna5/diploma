import React from 'react';
import './DreamerList.css';

const romanize = (num) => {
  const romans = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];
  return romans[num - 1] || num;
};

const DreamerList = ({ title, items }) => {
  return (
    <div className="dreamer-list-wrapper">
      <h2 className="dreamer-list-title">{title}</h2>
      <section className="dreamer-stats">
        <div className="dreamer-list">
          {items.map((item, index) => (
            <div className="dreamer-item" key={index}>
              <div className="dreamer-rank">{romanize(index + 1)}</div>
              <div className="dreamer-name">{item.name}</div>
              <div className="dreamer-score">{item.count}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default DreamerList;