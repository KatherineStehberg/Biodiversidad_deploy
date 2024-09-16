import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('/api/auth/register', formData);
      if (response.status === 201) {
        setMessage('¡Has sido registrado correctamente! Redirigiendo al inicio de sesión...');
        setTimeout(() => {
          navigate('/login'); // Redirects to login page after registration
        }, 3000); // Redirects after 3 seconds
      }
    } catch (error) {
      setMessage('Ocurrió un error durante el registro.');
    }
  };

  return (
    <div className="container">
      <section className="signup-form">
        <h2>Regístrate</h2>
        <p className="subtext">Empieza tu prueba gratuita de 30 días</p>

        {/* Registration Message */}
        {message && <div className="alert alert-info">{message}</div>}

        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Nombre*</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              placeholder="Ingresa tu nombre"
            />
          </div>
          <div>
            <label htmlFor="password">Contraseña*</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Crea una contraseña"
            />
          </div>
          <button type="submit" className="signup-button">
            Crear cuenta
          </button>
        </form>
      </section>
    </div>
  );
};

export default SignUp;
