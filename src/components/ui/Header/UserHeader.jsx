import React, { useState } from 'react';
import './UserHeader.css';
import opener from '../../../assets/icons/opener.svg';
import PlusIcon from  '../../../assets/icons/PlusIcon.svg';
import SearchIcon from  '../../../assets/icons/SearchIcon.svg';

// Если используешь react-router-dom:
import { Link } from 'react-router-dom';

const UserHeader = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    alert(`Ищем: ${searchValue}`);
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
          <button className="icon-btn">
            <img src={PlusIcon} className="icon-add" alt="Plus Icon" />
          </button>
          <button
            className="icon-btn"
            onClick={() => setShowSearch(s => !s)}
            style={{ marginLeft: 8 }}
          >
            <img src={SearchIcon} className="icon-search" alt="Search Icon" />
          </button>
          {showSearch && (
            <form className="header-search-form" onSubmit={handleSearch}>
              <input
                className="header-search-input"
                type="text"
                placeholder="Search by title"
                value={searchValue}
                onChange={e => setSearchValue(e.target.value)}
                autoFocus
              />
            </form>
          )}
        </div>
        <span className="user-header-title">DreamDiary</span>
        <div className="header-right">
          <span className="username">username</span>
        </div>
      </div>
      <div
        className={`sidebar-overlay${sidebarOpen ? ' open' : ''}`}
        onClick={() => setSidebarOpen(false)}
        style={{ pointerEvents: sidebarOpen ? 'auto' : 'none', opacity: sidebarOpen ? 1 : 0, transition: 'opacity 0.3s' }}
      >
        <nav
          className={`sidebar${sidebarOpen ? ' open' : ''}`}
          onClick={e => e.stopPropagation()}
        >
          <div className="sidebar-title">Menu</div>
          <ul>
            <li>
              <Link to="/" className="sidebar-link">Main Page</Link>
            </li>
            <li>
              <Link to="/dreams" className="sidebar-link">Мои сны</Link>
            </li>
            <li>
              <Link to="/profile" className="sidebar-link">Профиль</Link>
            </li>
            <li>
              <Link to="/settings" className="sidebar-link">Настройки</Link>
            </li>
            <li>
              <Link to="/logout" className="sidebar-link">Выход</Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default UserHeader;