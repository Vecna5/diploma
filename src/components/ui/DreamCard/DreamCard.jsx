import React, { useEffect } from 'react';
import './DreamCard.css';

import OnlineIcon from '../../../assets/icons/Online.svg';
import UnOnlineIcon from '../../../assets/icons/UnOnline.svg';
import likeIcon from '../../../assets/icons/like.svg';
import dislikeIcon from '../../../assets/icons/dislike.svg';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPostsByUser } from '../../../redux/slices/posts';
import { Link } from 'react-router-dom';
import trash from '../../../assets/icons/trash.svg';
import axios from '../../../utils/axios';

const moodColors = {
  Positive: '#229799',
  Neutral: '#D8D7D7',
  Bad: '#9747FF'
};

function formatDate(dateStr) {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return date.toLocaleDateString();
}

const DreamCard = ({ searchValue = '' }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.data);
  const { items: dreams, status } = useSelector(state => state.posts);

 const handleDeleteDream = async (dreamId, e) => {
    e.stopPropagation(); 
    try {
      await axios.delete(`/dreams/${dreamId}`);
      dispatch(fetchPostsByUser(user.id)); 
    } catch (err) {
      alert('Ошибка при удалении сна');
    }
  };

  useEffect(() => {
    if (user && user.id) {
      dispatch(fetchPostsByUser(user.id));
    }
  }, [dispatch, user?.id]);

  const filteredDreams = dreams.filter(
  dream =>
    typeof dream.title === 'string' &&
    dream.title.toLowerCase().includes(searchValue.toLowerCase())
);

  if (!user || !user.id) return <div>Loading profile...</div>;
  if (status === 'loading') return <div>Dreams downloading...</div>;
  if (status === 'error') return <div>Download error</div>;
  if (!filteredDreams || filteredDreams.length === 0) return <div className="prikol"><img src="https://i.imgflip.com/3f40bc.jpg?a485928"  alt="No dreams)"></img></div>;

  return (
    <div className="dream-cards-outer">
      <div className="dream-cards-row">
        {filteredDreams.map(dream => (
          <div
            className="dream-card"
            key={dream.id}
            onClick={() => navigate(`/dreams/${dream.id}`)}
            style={{ cursor: 'pointer' }}
          >
            <div className="dream-card-top-panel">
              <button
                className="delete-button"
                onClick={e => handleDeleteDream(dream.id, e)}
              >
                <img src={trash} alt='trash-icon' />
              </button>
            </div>
            <div className="dream-content">
              <h3 className="dream-title">{dream.title}</h3>
              <hr className="dream-divider" />
              <div className="dream-mood-date">
                <span
                  className="dream-mood-dot"
                  style={{ backgroundColor: moodColors[dream.mood] || '#D8D7D7' }}
                  title={dream.mood}
                />
                <span className="dream-mood">{dream.mood}</span>
                <span className="dream-date">{formatDate(dream.created_at)}</span>
              </div>
              <p className="tags">Tags:</p>
              <div className="dream-tags">
                {dream.tags && dream.tags.map((tag, index) => (
                  <span key={index} className="dream-tag">#{tag}</span>
                ))}
              </div>
              <div className="dream-footer">
                <span className="dream-active-icon" title={dream.is_public ? "Active" : "Inactive"}>
                  <img
                    src={dream.is_public ? OnlineIcon : UnOnlineIcon}
                    alt={dream.is_public ? "Active" : "Inactive"}
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
              </div>
            </div>
          </div>
        ))}
        <div className="dream-card add-card" >
        <Link to="/create" className="plus">+</Link>
        </div>
      </div>
    </div>
  );
};

export default DreamCard;