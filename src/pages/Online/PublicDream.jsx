import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Online from '../../assets/icons/Online.svg';
import UnOnline from '../../assets/icons/UnOnline.svg';
import image from '../../assets/icons/image.svg';
import '../DreamPage/FullDream.css';
import axios from '../../utils/axios';

const moodColors = {
  Positive: '#229799',
  Neutral: '#D8D7D7',
  Bad: '#9747FF'
};

const PublicDream = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [dream, setDream] = useState(null);
  const [images, setImages] = useState([]);
  const [showImages, setShowImages] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`/public-dream/${id}`)
      .then(({ data }) => {
        setDream(data.dream);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        setDream(null);
      });
    axios.get(`/images/${id}`)
      .then(({ data }) => setImages(Array.isArray(data.images) ? data.images : []))
      .catch(() => setImages([]));
  }, [id]);

  if (loading) return <div className="full-dream-loading">Loading</div>;
  if (!dream) return <div className="full-dream-loading">Dream don't found</div>;

  return (
    <div className="full-dream-root">
      <button className="toolbar-btn" style={{ margin: 12 }} onClick={() => navigate(-1)}>
        Close
      </button>
      <div className="full-dream-title" style={{ cursor: 'default' }}>
        <span>{dream.title || 'Без названия'}</span>
      </div>
      <div className="full-dream-content-wrapper">
        <textarea
          className="full-dream-textarea"
          value={dream.content}
          readOnly
          rows={10}
          style={{ background: '#f7f7f7', color: '#222' }}
        />
      </div>
      <div className="public-dream-info" style={{ margin: '24px 0 0 0', display: 'flex', gap: 24, alignItems: 'center' }}>
        <div className="toolbar-mood" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span
            className="mood-dot"
            style={{
              display: 'inline-block',
              width: 16,
              height: 16,
              borderRadius: '50%',
              background: moodColors[dream.mood] || '#D8D7D7',
              marginRight: 8,
            }}
          />
          {dream.mood}
        </div>
        <div className="toolbar-ban" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <img src={dream.isPublic ? Online : UnOnline} alt="icon" />
          {dream.isPublic ? 'Public' : 'Private'}
        </div>
        <div className="toolbar-tags" style={{ display: 'flex', gap: 8 }}>
          {dream.tags && dream.tags.map((tag, idx) => (
            <span key={idx} className="toolbar-tag" style={{ background: '#eee', borderRadius: 4, padding: '2px 8px' }}>
              #{tag}
            </span>
          ))}
        </div>
        <button className="toolbar-btn" onClick={() => setShowImages(true)} style={{ marginLeft: 12 }}>
          <img className="image-icon" src={image} alt="images" />
          {images.length > 0 && <span style={{ marginLeft: 4 }}>{images.length}</span>}
        </button>
      </div>
      {showImages && (
        <div
          className="dream-images-modal"
          onClick={() => setShowImages(false)}
        >
          <div
            className="images-container"
            onClick={e => e.stopPropagation()}
          >
            <div className="images-list">
              {images.length === 0 && <div>You don't have images</div>}
              {images.map((img, idx) => (
                <img
                  key={idx}
                  src={`http://localhost:5000${img.url}`}
                  alt={`dream-img-${idx}`}
                  style={{ width: 300, height: 300, objectFit: 'cover', borderRadius: 8 }}
                />
              ))}
            </div>
            <button className="images-close-btn" onClick={() => setShowImages(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PublicDream;