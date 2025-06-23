import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteLastDreamImage } from '../../redux/slices/posts';
import { fetchDreamImages, uploadDreamImages, fetchDreamById, updateDream } from '../../redux/slices/posts';
import cross from '../../assets/icons/cross(white).svg';
import save from '../../assets/icons/save.svg';
import UnOnline from '../../assets/icons/UnOnline.svg';
import Online from '../../assets/icons/Online.svg';
import image from '../../assets/icons/image.svg';
import trash from '../../assets/icons/trash.svg';
import './FullDream.css';
import axios from '../../utils/axios';

const FullDream = () => {
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const dream = useSelector(state => state.posts.currentDream);
  const images = useSelector(state => state.posts.currentDreamImages);
  const [music, setMusic] = useState([]);
  const [audioUrl, setAudioUrl] = useState('');
  const audioRef = useRef(null);

  const [editText, setEditText] = useState('');
  const [editTitle, setEditTitle] = useState('');
  const [showImages, setShowImages] = useState(false);
  const [mood, setMood] = useState('Neutral');
  const moods = ['Neutral', 'Positive', 'Bad'];
  const moodColors = {
    Positive: '#229799',
    Neutral: '#D8D7D7',
    Bad: '#9747FF'
  };
  const uploadInputRef = useRef(null);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [undoStack, setUndoStack] = useState([]);
  const [redoStack, setRedoStack] = useState([]);
  const [tags, setTags] = useState(['', '', '', '']);
  const [isPublic, setIsPublic] = useState(false);
  const titleInputRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    dispatch(fetchDreamById(id));
  }, [dispatch, id]);

  // Прогресс и длительность аудио
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const updateProgress = () => setProgress(audio.currentTime);
    const setAudioDuration = () => setDuration(audio.duration || 0);
    const resetProgress = () => setProgress(0);

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('loadedmetadata', setAudioDuration);
    audio.addEventListener('ended', resetProgress);

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('loadedmetadata', setAudioDuration);
      audio.removeEventListener('ended', resetProgress);
    };
  }, [audioUrl]);

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

  const handleUploadMusic = () => {
    if (uploadInputRef.current) {
      uploadInputRef.current.value = '';
      uploadInputRef.current.click();
    }
  };

  const handleMusicFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('music', file);
    formData.append('dreamId', id);
    try {
      await axios.post('/upload-music', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      window.location.reload();
    } catch (err) {
      alert('Ошибка при загрузке музыки');
    }
  };

  const handleDeleteMusic = async () => {
    try {
      await axios.delete(`/music/${id}`);
      setAudioUrl('');
      setMusic([]);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    } catch (e) {
      alert('Ошибка при удалении музыки');
    }
  };

  useEffect(() => {
    if (dream) {
      setEditText(dream.content || '');
      setEditTitle(dream.title || '');
      setMood(dream.mood || 'Neutral');
      setIsPublic(!!dream.isPublic);
      setTags(
        Array.isArray(dream.tags)
          ? [...dream.tags, '', '', '', ''].slice(0, 4)
          : ['', '', '', '']
      );
      setUndoStack([]);
      setRedoStack([]);
    }
  }, [dream]);

  useEffect(() => {
    if (isEditingTitle && titleInputRef.current) {
      titleInputRef.current.focus();
    }
  }, [isEditingTitle]);

  useEffect(() => {
    if (!dream || dream.id !== Number(id)) {
      dispatch(fetchDreamById(id));
    }
  }, [dispatch, id, dream]);

  const handleTextChange = (e) => {
    setUndoStack(prev => [...prev, editText]);
    setEditText(e.target.value);
    setRedoStack([]);
  };

  const handleDeleteLastImage = () => {
    dispatch(deleteLastDreamImage(id));
  };

  const handleUndo = () => {
    setUndoStack(prev => {
      if (prev.length === 0) return prev;
      setRedoStack(r => [editText, ...r]);
      setEditText(prev[prev.length - 1]);
      return prev.slice(0, -1);
    });
  };

  const handlePublicClick = () => {
    setIsPublic(prev => !prev);
  };

  const handleTagChange = (idx, value) => {
    setTags(prev => {
      const updated = [...prev];
      updated[idx] = value;
      return updated;
    });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    dispatch(uploadDreamImages({ files, dreamId: id }));
  };

  const handleRedo = () => {
    setRedoStack(prev => {
      if (prev.length === 0) return prev;
      setUndoStack(u => [...u, editText]);
      setEditText(prev[0]);
      return prev.slice(1);
    });
  };

  const fetchImages = () => {
    dispatch(fetchDreamImages(id));
    setShowImages(true);
  };

  const handleTitleChange = (e) => {
    setEditTitle(e.target.value);
  };

  const handleMoodClick = () => {
    setMood(prev => {
      const idx = moods.indexOf(prev);
      return moods[(idx + 1) % moods.length];
    });
  };

  const handleSave = () => {
    dispatch(updateDream({
      id,
      title: editTitle,
      content: editText,
      mood,
      isPublic,
      tags: tags.filter(tag => tag.trim() !== '')
    }));
    setIsEditingTitle(false);
  };

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

  if (!dream) return <div className="full-dream-loading">Loading...</div>;

  return (
    <div className="full-dream-root">
      <div className="full-dream-toolbar-grid">
        <div className="toolbar-cell toolbar-topleft">
          <button className="toolbar-btn cross-btn" onClick={() => navigate('/dreams')}>
            <img src={cross} alt="Close" className="toolbar-icon" />
            <div className="toolbar-divider-vertical" />
          </button>
          <div className="toolbar-title">
            <button className="toolbar-btn" onClick={fetchImages}>
              <img className="image-icon" src={image} alt='icon' />
            </button>
            <button
              className="toolbar-btn"
              onClick={() => fileInputRef.current.click()}
              type="button"
              style={{ marginTop: 12 }}
            >
              <div className='plus'>+</div>
            </button>
            <input
              type="file"
              accept="image/*"
              multiple
              style={{ display: 'none' }}
              ref={fileInputRef}
              onChange={handleImageUpload}
            />
            <button className="delete-btn" onClick={handleDeleteLastImage}><img src={trash} alt="trash button"></img></button>
          </div>
        </div>
        <div className="toolbar-cell toolbar-topright">
          <div className="toolbar-tags">
            {tags.map((tag, idx) => (
              <input
                key={idx}
                className="toolbar-tag"
                type="text"
                maxLength={20}
                value={tag}
                onChange={e => handleTagChange(idx, e.target.value)}
                placeholder={`Tag ${idx + 1}`}
                style={{ width: 129 }}
              />
            ))}
          </div>
        </div>
        <div className="toolbar-cell toolbar-bottomleft">
          <div className="toolbar-actions-group">
            <button className="toolbar-btn toolbar-dark" onClick={handleSave}>
              <img src={save} alt="Save" className="toolbar-icon" />
            </button>
            <button className="toolbar-btn toolbar-dark" onClick={handleUndo} title="Undo" disabled={undoStack.length === 0}>
              <span className="toolbar-arrow">&#8592;</span>
            </button>
            <button className="toolbar-btn toolbar-dark" onClick={handleRedo} title="Redo" disabled={redoStack.length === 0}>
              <span className="toolbar-arrow">&#8594;</span>
            </button>
          </div>
          <span className="toolbar-mood" onClick={handleMoodClick} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}>
            <span
              className="mood-dot"
              style={{
                display: 'inline-block',
                width: 16,
                height: 16,
                borderRadius: '50%',
                background: moodColors[mood] || '#D8D7D7',
                marginRight: 8,
              }}
            />
            {mood}
          </span>
          <span className="toolbar-ban" onClick={handlePublicClick} style={{ cursor: 'pointer' }}>
            <img src={isPublic ? Online : UnOnline} alt="icon" />
          </span>
        </div>
        <div className="toolbar-cell toolbar-bottomright">
          <div className="toolbar-player">
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
            <button
              className="toolbar-player-btn"
              onClick={handleForward}
            >
              +
            </button>
            <button className="toolbar-player-btn toolbar-trash-btn" onClick={handleDeleteMusic}>
              <img src={trash} alt='trash_btn' />
            </button>
            <button
              className="toolbar-player-btn"
              onClick={handleUploadMusic}
            >
              <span style={{ fontWeight: 'bold' }}>⭳</span>
            </button>
            <input
              type="file"
              accept="audio/*"
              style={{ display: 'none' }}
              ref={uploadInputRef}
              onChange={handleMusicFileChange}
            />
          </div>
          {audioUrl && (
            <audio ref={audioRef} src={audioUrl} preload="auto" />
          )}
        </div>
      </div>
      <div
        className={`full-dream-title${isEditingTitle ? ' editing' : ''}`}
        onClick={() => setIsEditingTitle(true)}
      >
        {isEditingTitle ? (
          <input
            ref={titleInputRef}
            className="full-dream-title-input"
            value={editTitle}
            onChange={handleTitleChange}
            onBlur={handleSave}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                handleSave();
              }
            }}
            maxLength={100}
          />
        ) : (
          <span>{editTitle || 'Unknown'}</span>
        )}
      </div>
      <div className="full-dream-content-wrapper">
        <textarea
          className="full-dream-textarea"
          value={editText}
          onChange={handleTextChange}
          rows={10}
          placeholder="Text here"
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
          </div>
          <button className="images-close-btn" onClick={() => setShowImages(false)}>
            &gt;
          </button>
        </div>
      )}
    </div>
  );
};

export default FullDream;