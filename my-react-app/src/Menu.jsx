import React, { useState, useRef, useEffect, lazy, Suspense } from 'react';

const Picker = lazy(() => import('emoji-picker-react'));

function Menu({ onLogout, userEmail }) {
  const [entries, setEntries] = useState(() => {
    const savedEntries = localStorage.getItem('entries');
    return savedEntries ? JSON.parse(savedEntries) : [];
  });

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editingIndex, setEditingIndex] = useState(-1);
  const [showPicker, setShowPicker] = useState(false);
  const textAreaRef = useRef(null);

  
  const emojis = ["😀", "😂", "👍", "😍", "😒", "😭", "🎉", "🔥", "🤔", "🥰", "😇", "😜", "🧐", "🤩 ", "🥳 ", "😡", "🤯 "];

  useEffect(() => {
    localStorage.setItem('entries', JSON.stringify(entries));
  }, [entries]);

  const handleCreateOrUpdate = () => {
    if (editingIndex >= 0) {
      const updatedEntries = entries.map((entry, index) =>
        index === editingIndex ? { ...entry, title, content } : entry
      );
      setEntries(updatedEntries);
    } else {
      setEntries([...entries, { title, content, userEmail }]);
    }
    setTitle('');
    setContent('');
    setEditingIndex(-1);
  };

  const handleVisualize = (entry) => {
    alert(`Título: ${entry.title}\n\nContenido: ${entry.content}`);
  };

  const handleEdit = (index) => {
    const entry = entries[index];
    setEditingIndex(index);
    setTitle(entry.title);
    setContent(entry.content);
  };

  const handleDelete = (indexToDelete) => {
    const filteredEntries = entries.filter((_, index) => index !== indexToDelete);
    setEntries(filteredEntries);
    if (editingIndex === indexToDelete) {
      setTitle('');
      setContent('');
      setEditingIndex(-1);
    }
  };

  const handleLogout = () => {
    onLogout();
  };

  const handleEmojiClick = emoji => {
    const ref = textAreaRef.current;
    const start = content.substring(0, ref.selectionStart);
    const end = content.substring(ref.selectionEnd);
    const newText = `${start}${emoji}${end}`;
    setContent(newText);
    ref.focus();
    ref.setSelectionRange(start.length + emoji.length, start.length + emoji.length);
  };

  const sessionTime = 30 * 60 * 1000;

  useEffect(() => {
    const timer = setTimeout(() => {
      handleLogout();
    }, sessionTime);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <div style={{ position: 'relative' }}>
        <h1>Bienvenido al Menú</h1>
        <p>Usuario: {userEmail}</p>
        <button onClick={handleLogout} style={{ position: 'absolute', top: '-50px', right: '10px' }}>
          Salir
        </button>
      </div>
      <div>
        <label htmlFor="title">Título:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Escribe el título aquí"
        />
      </div>
      <div>
        <label htmlFor="content">Contenido:</label>
        <textarea
          ref={textAreaRef}
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Escribe el contenido aquí"
        />
        {emojis.map(emoji => (
          <button key={emoji} onClick={() => handleEmojiClick(emoji)} style={{ fontSize: '24px' }}>
            {emoji}
          </button>
        ))}
      
        {showPicker && (
          <Suspense fallback={<div>Cargando emojis...</div>}>
            <Picker onEmojiClick={onEmojiClick} />
          </Suspense>
        )}
      </div>
      <button onClick={handleCreateOrUpdate}>
        {editingIndex >= 0 ? 'Actualizar' : 'Crear'}
      </button>
      {entries.map((entry, index) => (
        <div key={index}>
          <h2>{entry.title}</h2>
          <p>{entry.content}</p>
          <button onClick={() => handleEdit(index)}>Editar</button>
          <button onClick={() => handleVisualize(entry)}>Visualizar</button>
          <button onClick={() => handleDelete(index)}>Eliminar</button>
        </div>
      ))}
    </div>
  );
}

export default Menu;
