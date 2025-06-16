import React, { useState, useEffect } from 'react';
import './UserHeader.css';
import opener from '../../../assets/icons/opener.svg';
import PlusIcon from  '../../../assets/icons/PlusIcon.svg';
import SearchIcon from  '../../../assets/icons/SearchIcon.svg';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAuthMe } from '../../../redux/slices/auth';
import { Link } from 'react-router-dom';

const UserHeader = ({ searchValue, setSearchValue }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.data);

  useEffect(() => {
    dispatch(fetchAuthMe());
    // eslint-disable-next-line
  }, []);

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
          <form
            className={`header-search-form${showSearch ? ' open' : ''}`}
            onSubmit={handleSearch}
            style={{ marginLeft: 12 }}
          >
            <input
              className="header-search-input"
              type="text"
              placeholder="Search by title"
              value={searchValue}
              onChange={e => setSearchValue(e.target.value)}
              autoFocus={showSearch}
              tabIndex={showSearch ? 0 : -1}
              style={{ visibility: showSearch ? 'visible' : 'hidden' }}
            />
          </form>
        </div>
        <span className="user-header-title">DreamDiary</span>
        <div className="header-right">
          <span className="username">{user ? (user.username) : 'Guest'}</span>
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
              <Link to="/dreams" className="sidebar-link">Online</Link>
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
    </>
  );
};

export default UserHeader;