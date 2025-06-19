import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../utils/axios';
import cross from '../../assets/icons/cross(white).svg';
import save from '../../assets/icons/save.svg';
import UnOnline from '../../assets/icons/UnOnline.svg';
import Online from '../../assets/icons/Online.svg';
import '../DreamPage/FullDream.css';

const CreateDream = () => {
  const navigate = useNavigate();

  const [editText, setEditText] = useState('');
  const [editTitle, setEditTitle] = useState('');
  const [mood, setMood] = useState('Neutral');
  const moods = ['Neutral', 'Positive', 'Bad'];
  const moodColors = {
    Positive: '#229799',
    Neutral: '#D8D7D7',
    Bad: '#9747FF'
  };
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [undoStack, setUndoStack] = useState([]);
  const [redoStack, setRedoStack] = useState([]);
  const [tags, setTags] = useState(['', '', '', '']);
  const [isPublic, setIsPublic] = useState(false);
  const titleInputRef = useRef(null);

  const handleTextChange = (e) => {
    setUndoStack(prev => [...prev, editText]);
    setEditText(e.target.value);
    setRedoStack([]);
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

  const handleRedo = () => {
    setRedoStack(prev => {
      if (prev.length === 0) return prev;
      setUndoStack(u => [...u, editText]);
      setEditText(prev[0]);
      return prev.slice(1);
    });
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

  const handleSave = async () => {
    try {
      await axios.post('/dreams', {
        title: editTitle,
        content: editText,
        mood,
        isPublic,
        tags: tags.filter(tag => tag.trim() !== '')
      });
      navigate('/dreams');
    } catch (err) {
      alert('Somethin went wrong while saving the dream.');
    }
    setIsEditingTitle(false);
  };

  return (
    <div className="full-dream-root">
      <div className="full-dream-toolbar-grid">
        <div className="toolbar-cell toolbar-topleft">
          <button className="toolbar-btn" onClick={() => navigate('/dreams')}>
            <img src={cross} alt="Close" className="toolbar-icon" />
          </button>
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
            <button className="toolbar-player-btn">&#9198;</button>
            <button className="toolbar-player-btn">&#9654;</button>
            <button className="toolbar-player-btn">&#9208;</button>
            <input type="range" className="toolbar-player-range" />
            <button className="toolbar-player-btn">+</button>
            <button className="toolbar-player-btn toolbar-trash-btn">&#128465;</button>
          </div>
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
          <span>{editTitle || 'Без названия'}</span>
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
    </div>
  );
};

export default CreateDream;