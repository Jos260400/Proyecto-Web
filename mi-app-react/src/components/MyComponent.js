import React, { useState } from 'react';
import useApi from '../hooks/useApi';  s

function MyComponent() {
  const { data, error, loading, request } = useApi('https://proyecto-web-eq5k.vercel.app/');
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await request('post', { data: inputValue });
    console.log(result);  
  };

  return (
    <form onSubmit={handleSubmit}>
      {loading && <p>Cargando...</p>}
      {error && <p>Error: {error.message}</p>}
      <input 
        type="text" 
        value={inputValue} 
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button type="submit">Enviar</button>
    </form>
  );
}

export default MyComponent;
