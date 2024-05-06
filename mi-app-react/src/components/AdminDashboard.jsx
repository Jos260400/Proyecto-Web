import React from 'react';

function AdminDashboard({ onLogout }) {
  return (
    <div>
      <h1>Panel de Administración</h1>
      <p>Bienvenido al panel de administración.</p>
      <button onClick={onLogout}>Cerrar Sesión</button>
    </div>
  );
}

export default AdminDashboard;
