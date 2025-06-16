
import React from 'react';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import axios from '../../utils/axios';
const mockDreams = [
  { id: 1, title: 'Title of a dream number one', text: 'Dream text 1...' },
  { id: 2, title: 'Title of a dream number two', text: 'Dream text 2...' },
  { id: 3, title: 'Title of a dream number three', text: 'Dream text 3...' },
];

const DreamPage = () => {
  const { id } = useParams();
  const dream = mockDreams.find(d => d.id === Number(id));
  const [text, setText] = useState(dream ? dream.text : '');
  const [saved, setSaved] = useState(false);

  if (!dream) return <div>Дрим не найден</div>;

  const handleSave = () => {
    // Здесь можно добавить логику сохранения (API, localStorage и т.д.)
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  };

  return (
    <div style={{ padding: 32 }}>
      <h2>{dream.title}</h2>
      <textarea
        value={text}
        onChange={e => setText(e.target.value)}
        rows={12}
        style={{ width: '100%', fontSize: 18, padding: 12, borderRadius: 8 }}
      />
      <button
        onClick={handleSave}
        style={{
          marginTop: 16,
          padding: '10px 32px',
          fontSize: 18,
          borderRadius: 8,
          background: '#229799',
          color: '#fff',
          border: 'none',
          cursor: 'pointer'
        }}
      >
        Сохранить
      </button>
      {saved && <div style={{ color: '#229799', marginTop: 12 }}>Сохранено!</div>}
    </div>
  );
};

export default DreamPage;