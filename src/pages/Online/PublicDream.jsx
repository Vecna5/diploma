import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Online from '../../assets/icons/Online.svg';
import UnOnline from '../../assets/icons/UnOnline.svg';
import image from '../../assets/icons/image.svg';
import cross from '../../assets/icons/cross(white).svg';
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

  // Музыка
  const [audioUrl, setAudioUrl] = useState('');
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

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

  // Музыка
  useEffect(() => {
    const fetchMusic = async () => {
      try {
        const { data } = await axios.get(`/music/${id}`);
        if (data.music && data.music.length > 0) {
          setAudioUrl(
            'http://localhost:5000' +
            data.music[0].url.replace('/music_uploads/', '/music-uploads/')
          );
        } else {
          setAudioUrl('');
        }
      } catch (e) {
        setAudioUrl('');
      }
    };
    fetchMusic();
  }, [id]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const updateProgress = () => setProgress(audio.currentTime);
    const setAudioDuration = () => setDuration(audio.duration || 0);
    const resetProgress = () => setProgress(0);

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('loadedmetadata', setAudioDuration);
    audio.addEventListener('ended', resetProgress);

    if (audio.readyState > 0) setAudioDuration();

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('loadedmetadata', setAudioDuration);
      audio.removeEventListener('ended', resetProgress);
    };
  }, [audioUrl]);

  // Перемотка назад на 5 секунд
  const handleRewind = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.max(0, audioRef.current.currentTime - 5);
    }
  };

  // Перемотка вперёд на 5 секунд
  const handleForward = () => {
    if (audioRef.current && audioRef.current.duration) {
      audioRef.current.currentTime = Math.min(audioRef.current.duration, audioRef.current.currentTime + 5);
    }
  };

  if (loading) return <div className="full-dream-loading">Loading...</div>;
  if (!dream) return <div className="full-dream-loading">Dream not found</div>;

  return (
    <div className="full-dream-root">
      {/* Новый компактный хедер */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 24,
        padding: '16px 0 24px 0',
        borderBottom: '1px solid #eee',
        marginBottom: 24
      }}>
        <button className="toolbar-btn cross-btn" onClick={() => navigate(-1)}>
          <img src={cross} alt="Close" className="toolbar-icon" />
        </button>
        {/* Фотографии превью */}
        <div style={{ display: 'flex', gap: 8 }}>
          {images.slice(0, 3).map((img, idx) => (
            <img
              key={idx}
              src={`http://localhost:5000${img.url}`}
              alt={`dream-img-${idx}`}
              style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 8, cursor: 'pointer', border: '1px solid #eee' }}
              onClick={() => setShowImages(true)}
            />
          ))}
          {images.length > 3 && (
            <button
              className="toolbar-btn"
              style={{ fontSize: 18, padding: '0 8px', background: '#f5f5f5', borderRadius: 8, border: 'none', cursor: 'pointer' }}
              onClick={() => setShowImages(true)}
            >
              +{images.length - 3}
            </button>
          )}
        </div>
        {/* Плеер */}
        <div className="toolbar-player" style={{ flex: 1, minWidth: 200 }}>
          <button className="toolbar-player-btn" onClick={handleRewind}>&#9198;</button>
          <button className="toolbar-player-btn" onClick={() => audioRef.current && audioRef.current.play()}>&#9654;</button>
          <button className="toolbar-player-btn" onClick={() => audioRef.current && audioRef.current.pause()}>&#9208;</button>
          <input
            type="range"
            className="toolbar-player-range"
            min={0}
            max={duration}
            value={progress}
            readOnly
          />
          <button className="toolbar-player-btn" onClick={handleForward}>+</button>
          <audio ref={audioRef} src={audioUrl || ''} preload="auto" />
        </div>
      </div>

      {/* Информация о сне */}
     

      <div className="full-dream-title" style={{ cursor: 'default' }}>
        <span>{dream.title || 'Без названия'}</span>
      </div>
      <div className="full-dream-content-wrapper">
        <textarea
          className="full-dream-textarea"
          value={dream.content}
          readOnly
          rows={10}
        />
      </div>
      {/* Модальное окно для изображений */}
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
                <a
                  key={idx}
                  href={`http://localhost:5000${img.url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: 'inline-block' }}
                >
                  <img
                    src={`http://localhost:5000${img.url}`}
                    alt={`dream-img-${idx}`}
                    style={{ width: 300, height: 300, objectFit: 'cover', borderRadius: 8, cursor: 'pointer' }}
                  />
                </a>
              ))}
            </div>
            <button className="images-close-btn" onClick={() => setShowImages(false)}>
              &gt;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default PublicDream;