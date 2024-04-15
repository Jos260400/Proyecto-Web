import React, { useState } from 'react';

const Menu = () => {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editingId, setEditingId] = useState(null);

  const handleAddPost = (e) => {
    e.preventDefault();
    if(editingId) {
      const updatedPosts = posts.map((post) =>
        post.id === editingId ? { ...post, title, content } : post
      );
      setPosts(updatedPosts);
      setEditingId(null);
    } else {
      const newPost = {
        id: Date.now(),
        title,
        content,
      };
      setPosts([...posts, newPost]);
    }
    setTitle('');
    setContent('');
  };

  const handleEditPost = (postId) => {
    const post = posts.find((post) => post.id === postId);
    if(post) {
      setTitle(post.title);
      setContent(post.content);
      setEditingId(post.id);
    }
  };

  const handleDeletePost = (postId) => {
    const updatedPosts = posts.filter((post) => post.id !== postId);
    setPosts(updatedPosts);
  };

  const handleViewPost = (postId) => {

    const post = posts.find((post) => post.id === postId);
    if (post) {

      alert("Título: " + post.title + "\nContenido: " + post.content);

    }
  };
  

  return (
    <div>
      <h1>Administración de Publicaciones</h1>
      <form onSubmit={handleAddPost}>
        <label htmlFor="title">Título:</label>
        <input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

<div className="form-group">
  <label htmlFor="content">Contenido:</label>
  <textarea
    id="content"
    placeholder="Escribe tu contenido aquí..."
    rows="4" // Este atributo define cuántas líneas de texto se mostrarán por defecto.
    cols="50" // Este define el ancho del textarea en términos de caracteres de ancho.
    className="content-textarea"
  ></textarea>
</div>


        <button type="submit">{editingId ? 'Actualizar' : 'Crear'}</button>
      </form>

      <h2>Publicaciones Existentes</h2>
      <ul>
  {posts.map((post) => (
    <li key={post.id}>
      <h3>{post.title}</h3>
      <p>{post.content}</p>
      <button onClick={() => handleEditPost(post.id)}>Editar</button>
      <button onClick={() => handleDeletePost(post.id)}>Eliminar</button>
      <button onClick={() => handleViewPost(post.id)}>Visualizar</button>
    </li>
  ))}
</ul>

    </div>
  );
};

export default Menu;
