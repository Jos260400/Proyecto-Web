import React, { useState } from 'react';

const Menu = () => {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editingId, setEditingId] = useState(null); 
  const [selectedPost, setSelectedPost] = useState(null);

  const handleAddPost = (e) => {
    e.preventDefault();
    if (editingId) {

      setPosts(
        posts.map((post) => 
          post.id === editingId ? { ...post, title, content } : post
        )
      );
      setEditingId(null);
    } else {

      const newPost = { id: Date.now(), title, content };
      setPosts([...posts, newPost]);
    }
    setTitle('');
    setContent('');
  };

  const handleViewPost = (postId) => {
    const post = posts.find((post) => post.id === postId);
    setSelectedPost(post);
  };

  const handleEditPost = (postId) => {
    const post = posts.find((post) => post.id === postId);
    if (post) {
      setTitle(post.title);
      setContent(post.content);
      setEditingId(post.id); 
    }
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
          <br></br>
          <br></br>
          <br></br>
          <label htmlFor="content">Contenido:</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
          <button type="submit">{editingId ? 'Actualizar' : 'Crear'}</button>
        </form>

        <h2>Publicaciones Existentes</h2>
        <ul>
  {posts.map((post) => (
    <li key={post.id}>
      <h3>{post.title}</h3>
      <button onClick={() => handleViewPost(post.id)}>Visualizar</button>
      <button onClick={() => handleEditPost(post.id)}>Editar</button>
      <button onClick={() => handleDeletePost(post.id)}>Eliminar</button>
    </li>
  ))}
</ul>
<button onClick={() => window.location.reload()}>Refrescar</button>

      </div>

      <div className="admin-preview">
        {selectedPost ? (
          <>
            <h2>{selectedPost.title}</h2>
            <p>{selectedPost.content}</p>
          </>
        ) : (
          <div className="empty">Selecciona una publicación para ver más detalles</div>
        )}
      </div>
    </div>
  );
};

export default Menu;
