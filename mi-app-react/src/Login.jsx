import React, { useState, Suspense, lazy } from 'react';
import './App.css';

const Menu = lazy(() => import('./Menu'));

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAdminLoginVisible, setIsAdminLoginVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleAdminButtonClick = () => {
    setIsAdminLoginVisible(true);  
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isAdminLoginVisible) {
     
      if (email === 'gar18071@uvg.edu.gt' && password === 'Ultra2026') {
        setIsLoggedIn(true);
      } else {
        alert('Credenciales de administrador incorrectas');
        setEmail('');
        setPassword('');
      }
    } else {
      
      if (email.endsWith('@uvg.edu.gt')) {
        setIsLoggedIn(true);
      } else {
        alert('Por favor, utiliza un correo con la extensión @uvg.edu.gt');
      }
    }
  };

  if (isLoggedIn) {
   
    return (
      <Suspense fallback={<div>Cargando...</div>}>
        <Menu userEmail={email} />
      </Suspense>
    );
  }

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Correo Electrónico:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Iniciar sesión</button>
        {!isAdminLoginVisible && (
          <button type="button" onClick={handleAdminButtonClick} className="admin-button">
            Admin
          </button>
        )}
      </form>
    </div>
  );
}

export default Login;
