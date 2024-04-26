import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';


function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

        if (email.endsWith('@uvg.edu.gt')) {
            navigate('/menu', { state: { email } });
        } else {
            alert('Por favor, utiliza un correo con la extensión @uvg.edu.gt');

            setEmail('');
        }
    };



    return (
        
        

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
    );
}

export default Login;
