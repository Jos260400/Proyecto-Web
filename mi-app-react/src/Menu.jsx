import React, { useState } from 'react';

const Menu = () => {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);

  const emojis = ['😀', '😂', '😍', '🤔', '😭', '🤣', '😎', '😂', '🤐', '🥳', '😑', '🤑', '😴', '🤭', '🤭', '🤢', '🤯', '🥵', '🥶', '🤪', '😱', '🥺', '🤓', '😵', '😩', '🥴']; 

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const addEmoji = (emoji) => {
    setContent(content + emoji);
  };

  const handleAddPost = async (e) => {
    e.preventDefault();

    const newPost = {
      id: Date.now(),
      title,
      content,
      image: image ? URL.createObjectURL(image) : null,
      createdAt: new Date().toLocaleString(),
    };

    if (editingId) {
      setPosts(
        posts.map((post) =>
          post.id === editingId ? { ...newPost, createdAt: post.createdAt } : post
        )
      );
      setEditingId(null);
    } else {
      setPosts([...posts, newPost]);
    }

    setTitle('');
    setContent('');
    setImage(null);
  };

  const handleViewPost = (postId) => {
    const post = posts.find((post) => post.id === postId);
    setSelectedPost(post);
  };

  const handleEditPost = (postId) => {
    const post = posts.find((post) => post.id === postId);
    setTitle(post.title);
    setContent(post.content);
    setImage(null);
    setEditingId(post.id);
  };

  const handleDeletePost = (postId) => {
    setPosts(posts.filter((post) => post.id !== postId));
  };

  return (
    <div className="admin-container">
      <div className="admin-content">
        <h1>Administración de Blogs</h1>
        <form onSubmit={handleAddPost}>
          <label htmlFor="title">Título:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <br /><br />
          <label htmlFor="content">Contenido:</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
          <div>{emojis.map(emoji => (
              <button
                key={emoji}
                type="button"
                onClick={() => addEmoji(emoji)}
                style={{ fontSize: '1.5rem', cursor: 'pointer', border: 'none', background: 'none' }}>
                {emoji}
              </button>
            ))}
          </div>
          <br /><br />
          <label htmlFor="image">Imagen:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
          {image && (
            <img
              src={URL.createObjectURL(image)}
              alt="Preview"
              style={{ width: '100px', height: 'auto' }}
            />
          )}
          <br /><br />
          <button type="submit">{editingId ? 'Actualizar' : 'Crear'}</button>
        </form>
        <h2>Publicaciones Existentes</h2>
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <h3>{post.title}</h3>
              <p>{post.content}</p>
              {post.image && (
                <img
                  src={post.image}
                  alt="Post"
                  style={{ width: '100px', height: 'auto' }}
                />
              )}
              <p>Fecha de publicación: {post.createdAt}</p>
              <button onClick={() => handleViewPost(post.id)}>Visualizar</button>
              <button onClick={() => handleEditPost(post.id)}>Editar</button>
              <button onClick={() => handleDeletePost(post.id)}>Eliminar</button>
            </li>
          ))}
        </ul>
        {selectedPost && (
          <div className="admin-preview">
            <h2>{selectedPost.title}</h2>
            <p>{selectedPost.content}</p>
            {selectedPost.image && (
              <img
                src={selectedPost.image}
                alt="Selected Post"
                style={{ width: '100px', height: 'auto' }}
              />
            )}
            <p>Fecha de publicación: {selectedPost.createdAt}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;
