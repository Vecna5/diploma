import React from 'react';
import './AnotherSection.css';
import { useSelector } from 'react-redux';
import { useTheme } from '../../../contexts/ThemeContext';
import humanIcon from '../../../assets/icons/Human(black).svg';
import randomIcon from '../../../assets/icons/Random(black).svg';
import humanWhiteIcon from '../../../assets/icons/Human(white).svg';
import randomWhiteIcon from '../../../assets/icons/Random(white).svg';
import axios from '../../../utils/axios';

const AnotherSection = () => {
  const { isDark } = useTheme();
  const dreams = useSelector(state => state.posts.items);

  const [randomDream, setRandomDream] = React.useState(null);
   const [online, setOnline] = React.useState(null);

  React.useEffect(() => {
    axios.get('/random')
      .then(res => setRandomDream(res.data))
      .catch(() => setRandomDream(null));
      axios.get('/online')
      .then(res => setOnline(res.data))
      .catch(() => setOnline(null));
  }, []);

  return (
    <section className="another-section">
      <div className="another-title">Another</div>
      <div className="another-cards">
        <div className="another-card">
          <div className="another-card-header">
            <span>Now online</span>
            <img
              src={isDark ? humanWhiteIcon : humanIcon}
              alt="User icon"
              className="another-icon"
            />
          </div>
          <div className="another-card-value">
            { online ? online.count || 'Empty' : 'Null'}
          </div>
        </div>
        <div className="another-card">
          <div className="another-card-header">
            <span>Random dream</span>
            <img
              src={isDark ? randomWhiteIcon : randomIcon}
              alt="Refresh icon"
              className="another-icon"
            />
          </div>
          <div className="another-card-value another-card-value--wide">
              {randomDream ? randomDream.title || 'Empty' : 'Null'}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AnotherSection;