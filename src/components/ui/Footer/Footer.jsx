import React from 'react';
import './Footer.css';
import youtubeIcon from '../../../assets/icons/youtube-icon-white.svg';
import youtubeIconHover from '../../../assets/icons/youtube-icon-black.svg';
import githubIcon from '../../../assets/icons/github-icon-white.svg';
import githubIconHover from '../../../assets/icons/github-icon-black.svg';
import IconHover from '../../../utils/IconHover.jsx';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-left">
        <a href="https://youtu.be/RvVdFXOFcjw" target="_blank" rel="noopener noreferrer">
          <IconHover
            src={youtubeIcon}
            hoverSrc={youtubeIconHover}
            alt="YouTube"
            className="Youtube-icon"
          />
        </a>
        <a href="https://github.com/Vecna5" target="_blank" rel="noopener noreferrer">
          <IconHover
            src={githubIcon}
            hoverSrc={githubIconHover}
            alt="GitHub"
            className="Github-icon"
          />
        </a>
      </div>
      <div className="footer-center">
        DreamDiary
      </div>
      <div className="footer-right">
        © 2025 Better Stack, Inc.
      </div>
    </footer>
  );
};

export default Footer;