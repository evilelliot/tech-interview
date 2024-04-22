import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CreadorPage = () => {
  const [tematicas, setTematicas] = useState([]);
  const [titulo, setTitulo] = useState('');
  const [tipoContenido, setTipoContenido] = useState('');
  const [contenido, setContenido] = useState('');
  const [tematicaSeleccionada, setTematicaSeleccionada] = useState('');
  const [contenidos, setContenidos] = useState([]);

  useEffect(() => {
    // Lógica para obtener las temáticas disponibles
    obtenerTematicas();
    // Lógica para obtener los contenidos disponibles
    obtenerContenidos();
  }, []);

  const obtenerTematicas = async () => {
    try {
      const response = await axios.get('http://localhost:5050/topic');
      setTematicas(response.data);
    } catch (error) {
      console.error('Error al obtener temáticas:', error);
      // Manejo del error
    }
  };

  const obtenerContenidos = async () => {
    try {
      const response = await axios.get(`http://localhost:5050/content/tematica/${tematicaSeleccionada}`);
      setContenidos(response.data);
    } catch (error) {
      console.error('Error al obtener contenidos:', error);
      // Manejo del error
    }
  };
  
  const handleAgregarContenido = async (e) => {
    e.preventDefault();
    try {
      // Lógica para enviar el contenido creado al backend
      const response = await axios.post('http://localhost:5050/content', {
        titulo,
        tipo: tipoContenido,
        contenido,
        tematica: tematicaSeleccionada,
      });
      // Actualizar la lista de contenidos después de agregar uno nuevo
      obtenerContenidos();
      // Limpiar el formulario
      setTitulo('');
      setTipoContenido('');
      setContenido('');
      setTematicaSeleccionada('');
    } catch (error) {
      console.error('Error al agregar contenido:', error);
      // Manejo del error
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Panel del Creador</h2>
      <h3>Agregar Contenido</h3>
      <form onSubmit={handleAgregarContenido}>
        <div className="mb-3">
          <label htmlFor="titulo" className="form-label">Título:</label>
          <input type="text" className="form-control" id="titulo" value={titulo} onChange={(e) => setTitulo(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label htmlFor="tipoContenido" className="form-label">Tipo de Contenido:</label>
          <select className="form-select" id="tipoContenido" value={tipoContenido} onChange={(e) => setTipoContenido(e.target.value)} required>
            <option value="">Seleccionar Tipo</option>
            <option value="imagen">Imagen</option>
            <option value="video">Video</option>
            <option value="texto">Texto</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="contenido" className="form-label">Contenido:</label>
          <textarea className="form-control" id="contenido" value={contenido} onChange={(e) => setContenido(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label htmlFor="tematica" className="form-label">Temática:</label>
          <select className="form-select" id="tematica" value={tematicaSeleccionada} onChange={(e) => setTematicaSeleccionada(e.target.value)} required>
            <option value="">Seleccionar Temática</option>
            {tematicas.map((tematica) => (
              <option key={tematica._id} value={tematica._id}>{tematica.name}</option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Agregar Contenido</button>
      </form>
      <hr />
      <h3>Contenidos Disponibles</h3>
      <ul className="list-group">
        {/* Lógica para mostrar los contenidos disponibles */}
        {contenidos.map((contenido) => (
          <li key={contenido._id} className="list-group-item">
            <h4>{contenido.titulo}</h4>
            <p>Tipo: {contenido.tipo}</p>
            {/* Aquí puedes mostrar más detalles del contenido si es necesario */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CreadorPage;
