import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ReaderPage = () => {
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState('');
  const [contents, setContents] = useState([]);

  useEffect(() => {
    // Cargar temáticas disponibles
    obtenerTemas();
  }, []);

  const obtenerTemas = async () => {
    try {
      const response = await axios.get('http://localhost:5050/topic');
      setTopics(response.data);
    } catch (error) {
      console.error('Error al obtener temáticas:', error);
    }
  };

  const obtenerContenidosPorTema = async (temaId) => {
    try {
      const response = await axios.get(`http://localhost:5050/content/tematica/${temaId}`);
      setContents(response.data);
    } catch (error) {
      console.error('Error al obtener contenidos por tema:', error);
    }
  };

  const handleSelectTopic = (event) => {
    const selected = event.target.value;
    setSelectedTopic(selected);
    obtenerContenidosPorTema(selected);
  };

  return (
    <div className="container">
      <h1 className="mt-5 mb-4">Lector de Contenidos</h1>

      <div className="mb-4">
        <h3>Selecciona una Temática</h3>
        <select className="form-select" value={selectedTopic} onChange={handleSelectTopic}>
          <option value="">Selecciona una Temática</option>
          {topics.map(topic => (
            <option key={topic._id} value={topic._id}>{topic.name}</option>
          ))}
        </select>
      </div>

      <div>
        <h3>Contenidos Disponibles</h3>
        <ul className="list-group">
          {contents.map(content => (
            <li key={content._id} className="list-group-item">
              <h4>{content.title}</h4>
              <p>Tipo: {content.type}</p>
              {/* Aquí puedes mostrar más detalles del contenido si es necesario */}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ReaderPage;
