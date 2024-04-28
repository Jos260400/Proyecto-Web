import React, { useState, Suspense, lazy } from 'react';
import './App.css';

const Menu = lazy(() => import('./Menu'));
const AdminDashboard = lazy(() => import('./components/AdminDashboard')); 

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userRole, setUserRole] = useState(''); 

  const handleSubmit = (event) => {
    event.preventDefault();


    if (email.endsWith('@uvg.edu.gt') && password === 'adminPassword') {
    
      setUserRole('admin');
    } else if (email.endsWith('@uvg.edu.gt')) {
    
      setUserRole('user');
    } else {
      alert('Por favor, utiliza un correo con la extensión @uvg.edu.gt');
      setEmail('');
      setPassword('');
    }
  };

  const renderContentBasedOnRole = () => {
    switch (userRole) {
      case 'admin':
        return <AdminDashboard email={email} />;
      case 'user':
        return <Menu email={email} />;
      default:
        return null; 
    }
  };

  return (
    <Suspense fallback={<div>Cargando...</div>}>
      {!userRole ? (
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
        </form>
      ) : (
        renderContentBasedOnRole()
      )}
    </Suspense>
  );
}

export default Login;
