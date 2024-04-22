import React, { useState } from 'react';
import axios from 'axios';

const RegisterPage = () => {
  const [alias, setAlias] = useState('');
  const [correo, setcorreo] = useState('');
  const [correoError, setcorreoError] = useState('');
  const [tipoUsuario, setTipoUsuario] = useState('lector');

  const handleAliasChange = (e) => {
    setAlias(e.target.value);
  };

  const handlecorreoChange = (e) => {
    const correoValue = e.target.value;
    setcorreo(correoValue);

    if (!validatecorreo(correoValue)) {
      setcorreoError('Correo electrónico inválido');
    } else {
      setcorreoError('');
    }
  };

  const handleTipoUsuarioChange = (e) => {
    setTipoUsuario(e.target.value);
  };

  const validatecorreo = (correo) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(correo);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validatecorreo(correo)) {
      setcorreoError('Correo electrónico inválido');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5050/user', {
        alias,
        correo,
        tipo: tipoUsuario // Agrega el tipo de usuario al enviar el formulario
      });

      console.log('Response:', response.data);

      setAlias('');
      setcorreo('');
      setcorreoError('');
      setTipoUsuario('lector'); // Restablece el tipo de usuario después de enviar el formulario

      alert('¡Registro exitoso!');
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      alert('Error al registrar usuario. Por favor, inténtalo de nuevo.');
    }
  };

  return (
    <div className="container">
      <h2>Registro</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="alias" className="form-label">Alias:</label>
          <input type="text" className="form-control" id="alias" value={alias} onChange={handleAliasChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="correo" className="form-label">Correo electrónico:</label>
          <input type="email" className="form-control" id="correo" value={correo} onChange={handlecorreoChange} required />
          {correoError && <p style={{ color: 'red' }}>{correoError}</p>}
        </div>
        <div className="mb-3">
          <label htmlFor="tipoUsuario" className="form-label">Tipo de usuario:</label>
          <select className="form-select" id="tipoUsuario" value={tipoUsuario} onChange={handleTipoUsuarioChange}>
            <option value="lector">Lector</option>
            <option value="creador">Creador</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Registrarse</button>
      </form>
    </div>
  );
};

export default RegisterPage;
