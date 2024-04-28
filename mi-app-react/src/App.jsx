import React, { useState, Suspense, lazy } from 'react';

const Login = lazy(() => import('./Login'));
const Menu = lazy(() => import('./Menu'));
const AdminDashboard = lazy(() => import('./components/AdminDashboard')); 

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [userRole, setUserRole] = useState(''); 

  const handleLoginSuccess = (email, role) => {
    setIsAuthenticated(true);
    setUserEmail(email);
    setUserRole(role); 
  };

  return (
    <div className="App">
      <Suspense fallback={<div>Cargando...</div>}>
        {!isAuthenticated ? (
          <Login onLoginSuccess={handleLoginSuccess} />
        ) : userRole === 'admin' ? (
          <AdminDashboard userEmail={userEmail} />
        ) : (
          <Menu userEmail={userEmail} /> 
        )}
      </Suspense>
    </div>
  );
}

export default App;
