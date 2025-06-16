import './Account.css';
import React from 'react';
import sunIcon from '../../assets/icons/Sun(black).svg';
import moonIcon from '../../assets/icons/Moon(white).svg';
import mosaicBlack from '../../assets/icons/mosaic(black).svg';
import mosaicWhite from '../../assets/icons/mosaic(white).svg';
import { useTheme } from '../../contexts/ThemeContext';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Account = () => {
    const user = useSelector(state => state.auth.data); // Берём с слайса данные которые уже загружены
     const { isDark, toggleTheme } = useTheme();
      const navigate = useNavigate();
      
  return (
    <div className="body">
    <div className="account-root">
      <div className="account-side account-side--left">
       <img src={ isDark ? mosaicBlack : mosaicWhite } alt={isDark ? 'Dark' : 'Light'}/>
      </div>
      <div className="account-side account-side--right">
       <img src={ isDark ? mosaicBlack : mosaicWhite } alt={isDark ? 'Dark' : 'Light'}/>
      </div>
      <div className="account-content">
        <div className="account-header-row">
          <div className="account-header-line account-header-line--left" />
          <div className="account-username">{user?.username}</div>
          <div className="account-header-line account-header-line--right" />
        </div>
        <div className="account-info">
          <div className="account-info-line" />
          <div className="account-info-row">
            <span>Registration data</span>
            <span>{user?.created_at ? new Date(user.created_at).toLocaleDateString() : '—'}</span>
          </div>
          <div className="account-info-line" />
          <div className="account-info-row">
            <span>Sum of dreams</span>
            <span>{user?.dreams_count}</span>
          </div>
          <div className="account-info-line" />
          <div className="account-info-row">
            <span>last dream</span>
            <span>{user?.last_dream?.title}</span>
          </div>
          <div className="account-info-line" />
           <div className="account-info-row">
            <span>Sum of likes</span>
            <span>{user?.total_likes}</span>
          </div>
           <div className="account-info-line" />
           <div className="account-info-row">
            <span>Last activity</span>
            <span>{user?.last_activity ? new Date(user.last_activity).toLocaleDateString() : '—'}</span>
          </div>
            <div className="account-info-line" />
        </div>
        <div className="account-moon">
           <img
                    src={isDark ? moonIcon : sunIcon}
                    alt={isDark ? 'Moon' : 'Sun'}
                    onClick={toggleTheme}
                    style={{ cursor: 'pointer' }}
                    aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                  />
        </div>
        <div className="account-arrow" onClick={() => navigate('/dreams')}>&#8595;</div>
      </div>
    </div>
    </div>
  );
};

export default Account;