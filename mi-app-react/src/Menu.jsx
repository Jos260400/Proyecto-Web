import React, { useState, useRef, lazy, Suspense } from 'react';

const Picker = lazy(() => import('emoji-picker-react')); 

function Menu({ onLogout }) {
  const [entries, setEntries] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editingIndex, setEditingIndex] = useState(-1);
  const [showPicker, setShowPicker] = useState(false);
  const textAreaRef = useRef(null);

  const handleCreateOrUpdate = () => {
    if (editingIndex >= 0) {
      const updatedEntries = entries.map((entry, index) =>
        index === editingIndex ? { title, content } : entry
      );
      setEntries(updatedEntries);
    } else {
      setEntries([...entries, { title, content }]);
    }
    setTitle('');
    setContent('');
    setEditingIndex(-1);
  };

  const handleVisualize = (entry) => {
    alert(`Título: ${entry.title}\n\nContenido: ${entry.content}`);
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setTitle(entries[index].title);
    setContent(entries[index].content);
  };

  const handleDelete = (indexToDelete) => {
    setEntries(entries.filter((_, index) => index !== indexToDelete));
    if (editingIndex === indexToDelete) {
      setTitle('');
      setContent('');
      setEditingIndex(-1);
    }
  };

  const handleLogout = () => {
    onLogout(); 
  };

  const onEmojiClick = (event, emojiObject) => {
    const ref = textAreaRef.current;
    const start = content.substring(0, ref.selectionStart);
    const end = content.substring(ref.selectionEnd);
    const textWithEmoji = start + emojiObject.emoji + end;
    setContent(textWithEmoji);
    const newCursorPosition = start.length + emojiObject.emoji.length;
    ref.focus();
    ref.setSelectionRange(newCursorPosition, newCursorPosition);
    setShowPicker(false);
  };

  return (
    <div>
      <div style={{ position: 'relative' }}>
        <h1>Bienvenido al Menú</h1>
        <button onClick={handleLogout} style={{ position: 'absolute', top: '-80px', right: '10px' }}>
          Salir
        </button>
      </div>
      Usuario:
      <div>
        <label htmlFor="title">Título:</label>
        <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Escribe el título aquí" />
      </div>
      <div>
        <label htmlFor="content">Contenido:</label>
        <textarea ref={textAreaRef} id="content" value={content} onChange={(e) => setContent(e.target.value)} placeholder="Escribe el contenido aquí" />
        <button onClick={() => setShowPicker(val => !val)}>😊</button>
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
