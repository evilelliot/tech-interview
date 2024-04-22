import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CreadorPage = () => {
  const [tematicas, setTematicas] = useState([]);
  const [title, setTitle] = useState('');
  const [tipoContent, setTipoContent] = useState('');
  const [content, setContent] = useState('');
  const [tematicaSeleccionada, setTematicaSeleccionada] = useState('');
  const [contents, setContents] = useState([]);

  useEffect(() => {
    obtenerTematicas();
  }, []);

  useEffect(() => {
    if (tematicaSeleccionada) {
      obtenerContents();
    }
  }, [tematicaSeleccionada]);

  const obtenerTematicas = async () => {
    try {
      const response = await axios.get('http://localhost:5050/topic');
      setTematicas(response.data);
    } catch (error) {
      console.error('Error al obtener temáticas:', error);
    }
  };

  const obtenerContents = async () => {
    try {
      const response = await axios.get(`http://localhost:5050/content/tematica/${tematicaSeleccionada}`);
      setContents(response.data);
    } catch (error) {
      console.error('Error al obtener contents:', error);
    }
  };
  
  const handleAgregarContent = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5050/content', {
        title,
        type: tipoContent,
        content
      });
      obtenerContents();
      setTitle('');
      setTipoContent('');
      setContent('');
      setTematicaSeleccionada('');
    } catch (error) {
      console.error('Error al agregar content:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Panel del Creador</h2>
      <h3>Agregar content</h3>
      <form onSubmit={handleAgregarContent}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Título:</label>
          <input type="text" className="form-control" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label htmlFor="tipoContent" className="form-label">Tipo de content:</label>
          <select className="form-select" id="tipoContent" value={tipoContent} onChange={(e) => setTipoContent(e.target.value)} required>
            <option value="">Seleccionar Tipo</option>
            <option value="imagen">Imagen</option>
            <option value="video">Video</option>
            <option value="texto">Texto</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="content" className="form-label">content:</label>
          <textarea className="form-control" id="content" value={content} onChange={(e) => setContent(e.target.value)} required />
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
        <button type="submit" className="btn btn-primary">Agregar content</button>
      </form>
      <hr />
      <h3>Contenidos Disponibles</h3>
      <ul className="list-group">
        {contents.map((content) => (
          <li key={content._id} className="list-group-item">
            <h4>{content.title}</h4>
            <p>Tipo: {content.type}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CreadorPage;
