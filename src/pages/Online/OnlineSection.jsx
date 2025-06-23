import React, { useEffect, useCallback, useState } from 'react';
import '../../components/ui/DreamCard/DreamCard.css';
import OnlineIcon from '../../assets/icons/Online.svg';
import UnOnlineIcon from '../../assets/icons/UnOnline.svg';
import likeIcon from '../../assets/icons/like.svg';
import dislikeIcon from '../../assets/icons/dislike.svg';
import opener from '../../assets/icons/opener.svg';
import SearchIcon from '../../assets/icons/SearchIcon.svg';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from '../../utils/axios';

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

const OnlineSection = () => {
  const navigate = useNavigate();
  const user = useSelector(state => state.auth.data);
  const [dreams, setDreams] = useState([]);
  const [status, setStatus] = useState('loading');
  const [searchValue, setSearchValue] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    setStatus('loading');
    axios.get('/dreams')
      .then(({ data }) => {
        setDreams(data.dream || []);
        setStatus('loaded');
      })
      .catch(() => setStatus('error'));
  }, [user, navigate]);

  const handleLike = useCallback(async (dreamId) => {
    try {
      await axios.post(`/dreams/${dreamId}/like`);
      const { data } = await axios.get('/dreams');
      setDreams(data.dream || []);
    } catch (e) {
      alert('Like error');
    }
  }, []);

  const handleDislike = useCallback(async (dreamId) => {
    try {
      await axios.post(`/dreams/${dreamId}/dislike`);
      const { data } = await axios.get('/dreams');
      setDreams(data.dream || []);
    } catch (e) {
      alert('Dislike error');
    }
  }, []);

  const filteredDreams = dreams.filter(
    dream =>
      typeof dream.title === 'string' &&
      dream.title.toLowerCase().includes(searchValue.toLowerCase())
  );

  const handleSearch = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="app-header">
        <div className="header-left">
          <button
            className="icon-btn"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <img src={opener} className="icon-opener" alt="opener Icon" />
          </button>
          <form
            className="header-search-form open"
            onSubmit={handleSearch}
            style={{ marginLeft: 12 }}
          >
            <input
              className="header-search-input"
              type="text"
              placeholder="Search by title"
              value={searchValue}
              onChange={e => setSearchValue(e.target.value)}
              autoFocus
            />
          </form>
        </div>
        <span className="user-header-title">DreamDiary</span>
        <div className="header-right">
          <span className="username">{user ? user.username : ''}</span>
        </div>
      </div>
      <div
        className={`sidebar-overlay${sidebarOpen ? ' open' : ''}`}
        onClick={() => setSidebarOpen(false)}
        style={{
          pointerEvents: sidebarOpen ? 'auto' : 'none',
          opacity: sidebarOpen ? 1 : 0,
          transition: 'opacity 0.3s'
        }}
      >
        <nav
          className={`sidebar${sidebarOpen ? ' open' : ''}`}
          onClick={e => e.stopPropagation()}
        >
          <div className="sidebar-title">Menu</div>
          <div className="sidebar-text">Basic</div>
          <div className="line"></div>
          <ul>
            <li>
              <Link to="/" className="sidebar-link">Main Page</Link>
            </li>
            <li>
              <Link to="/dreams" className="sidebar-link">My dreams</Link>
            </li>
            <div className="sidebar-text">Settings</div>
            <div className="line"></div>
            <li>
              <Link to="/account" className="sidebar-link">Account</Link>
            </li>
            <li>
              <Link to="/logout" className="sidebar-link">Log out</Link>
            </li>
          </ul>
        </nav>
      </div>
      {/* --- /Header --- */}

      {status === 'loading' && <div>Dreams downloading...</div>}
      {status === 'error' && <div>Download error</div>}
      {(!filteredDreams || filteredDreams.length === 0) && status === 'loaded' && (
        <div className="prikol">
          <img src="https://i.imgflip.com/3f40bc.jpg?a485928" alt="No dreams)" />
        </div>
      )}
      {filteredDreams && filteredDreams.length > 0 && (
        <div className="dream-cards-outer">
          <div className="dream-cards-row">
            {filteredDreams.map(dream => (
              <div
                className="dream-card"
                key={dream.id}
                onClick={() => navigate(`/public-dream/${dream.id}`)}
                style={{ cursor: 'pointer' }}
              >
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
                    <span className="dream-like" onClick={e => { e.stopPropagation(); handleLike(dream.id); }}>
                      <img src={likeIcon} alt="like" className="dream-footer-img" />
                      {dream.likes}
                    </span>
                    <span className="dream-dislike" onClick={e => { e.stopPropagation(); handleDislike(dream.id); }}>
                      <img src={dislikeIcon} alt="dislike" className="dream-footer-img" />
                      {dream.dislikes}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default OnlineSection;