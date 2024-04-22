import React, { useState } from 'react';
import axios from 'axios';

const LoginPage = () => {
  const [alias, setAlias] = useState('');
  const [correo, setCorreo] = useState('');
  const [correoError, setCorreoError] = useState('');

  const handleAliasChange = (e) => {
    setAlias(e.target.value);
  };

  const handleCorreoChange = (e) => {
    const correoValue = e.target.value;
    setCorreo(correoValue);

    if (!validateCorreo(correoValue)) {
      setCorreoError('Correo electrónico inválido');
    } else {
      setCorreoError('');
    }
  };

  const validateCorreo = (correo) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(correo);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateCorreo(correo)) {
      setCorreoError('Correo electrónico inválido');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5050/user/login', {
        alias,
        correo,
      });

      const { tipo } = response.data;

      // Redirigir a la página correspondiente después del inicio de sesión exitoso
      console.log(tipo);
      switch (tipo) {
        case 'admin':
          window.location.href = '/admin';
          break;
        case 'creador':
          window.location.href = '/creator';
          break;
        case 'lector':
          window.location.href = '/lector';
          break;
        default:
          window.location.href = '/';
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      alert('Error al iniciar sesión. Por favor, inténtalo de nuevo.');
    }
  };

  return (
    <div className="container">
      <h2>Iniciar sesión</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="alias" className="form-label">Alias:</label>
          <input type="text" className="form-control" id="alias" value={alias} onChange={handleAliasChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="correo" className="form-label">Correo electrónico:</label>
          <input type="email" className="form-control" id="correo" value={correo} onChange={handleCorreoChange} required />
          {correoError && <p style={{ color: 'red' }}>{correoError}</p>}
        </div>
        <button type="submit" className="btn btn-primary">Iniciar sesión</button>
      </form>
    </div>
  );
};

export default LoginPage;
