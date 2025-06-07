import React from 'react';
import './DreamCard.css';

import OnlineIcon from '../../../assets/icons/Online.svg';
import UnOnlineIcon from '../../../assets/icons/UnOnline.svg';
import likeIcon from '../../../assets/icons/like.svg';
import dislikeIcon from '../../../assets/icons/dislike.svg';
import { useNavigate } from 'react-router-dom'; // добавлено

const moodColors = {
  Positive: '#229799',
  Neutral: '#D8D7D7',
  Negative: '#9747FF'
};

const dreams = [
  { 
    id: 1, 
    title: 'Title of a dream number one',
    date: '28.04.2007',
    mood: 'Positive',
    tags: ['tag1', 'tag1' , 'tag4'],
    timeAgo: '3 days ago',
    likes: 2,
    dislikes: 0,
    isActive: true
  },
  { 
    id: 2, 
    title: 'Title of a dream number two',
    date: '15.05.2005',
    mood: 'Neutral',
    tags: ['tag2', 'tag2'],
    timeAgo: '1 week ago',
    likes: 1,
    dislikes: 1,
    isActive: false
  },
  { 
    id: 3, 
    title: 'Title of a dream number three',
    date: '20.05.2005',
    mood: 'Negative',
    tags: ['tag4', 'tag9'],
    timeAgo: '2 days ago',
    likes: 0,
    dislikes: 3,
    isActive: true
  },
   { 
    id: 4, 
    title: 'Title of a dream number three',
    date: '20.05.2005',
    mood: 'Negative',
    tags: ['tag4', 'tag9'],
    timeAgo: '2 days ago',
    likes: 0,
    dislikes: 3,
    isActive: true
  },
   { 
    id: 6, 
    title: 'Title of a dream number three',
    date: '20.05.2005',
    mood: 'Negative',
    tags: ['tag4', 'tag9'],
    timeAgo: '2 days ago',
    likes: 0,
    dislikes: 3,
    isActive: true
  },
];

const DreamCard = () => {
  const navigate = useNavigate();

  return (
    <div className="dream-cards-outer">
      <div className="dream-cards-row">
        {dreams.map(dream => (
          <div
            className="dream-card"
            key={dream.id}
            onClick={() => navigate(`/dreams/${dream.id}`)}
            style={{ cursor: 'pointer' }}
          >
            <div className="dream-content">
              <h3 className="dream-title">{dream.title}</h3>
              <hr className="dream-divider" />
              <div className="dream-mood-date">
                <span
                  className="dream-mood-dot"
                  style={{ backgroundColor: moodColors[dream.mood] }}
                  title={dream.mood}
                />
                <span className="dream-mood">{dream.mood}</span>
                <span className="dream-date">{dream.date}</span>
              </div>
              <div className="dream-tags">
                {dream.tags.map((tag, index) => (
                  <span key={index} className="dream-tag">#{tag}</span>
                ))}
              </div>
              <div className="dream-footer">
                <span className="dream-active-icon" title={dream.isActive ? "Active" : "Inactive"}>
                  <img
                    src={dream.isActive ? OnlineIcon : UnOnlineIcon}
                    alt={dream.isActive ? "Active" : "Inactive"}
                    className="dream-footer-img"
                  />
                </span>
                <span className="dream-like">
                  <img src={likeIcon} alt="like" className="dream-footer-img" />
                  {dream.likes}
                </span>
                <span className="dream-dislike">
                  <img src={dislikeIcon} alt="dislike" className="dream-footer-img" />
                  {dream.dislikes}
                </span>
                <span className="dream-time-ago">{dream.timeAgo}</span>
              </div>
            </div>
          </div>
        ))}
        <div className="dream-card add-card">
          <span className="plus">+</span>
        </div>
      </div>
    </div>
  );
};

export default DreamCard;