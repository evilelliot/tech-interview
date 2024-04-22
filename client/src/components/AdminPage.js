import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminPanel = () => {
  const [categories, setCategories] = useState([]);
  const [topics, setTopics] = useState([]);
  const [users, setUsers] = useState([]);
  const [contents, setContents] = useState([]);

  useEffect(() => {
    // Cargar categorías
    axios.get('/api/categories')
      .then(response => setCategories(response.data))
      .catch(error => console.error('Error al cargar categorías:', error));

    // Cargar temáticas
    axios.get('/api/topics')
      .then(response => setTopics(response.data))
      .catch(error => console.error('Error al cargar temáticas:', error));

    // Cargar usuarios
    axios.get('/api/users')
      .then(response => setUsers(response.data))
      .catch(error => console.error('Error al cargar usuarios:', error));

    // Cargar contenido multimedia
    axios.get('/api/content')
      .then(response => setContents(response.data))
      .catch(error => console.error('Error al cargar contenido multimedia:', error));
  }, []);

  return (
    <div>
      <h1>Panel de Administrador</h1>

      <div>
        <h2>Categorías de Contenido</h2>
        <ul>
          {categories.map(category => (
            <li key={category._id}>{category.name}</li>
          ))}
        </ul>
      </div>

      <div>
        <h2>Temáticas</h2>
        <ul>
          {topics.map(topic => (
            <li key={topic._id}>{topic.name}</li>
          ))}
        </ul>
      </div>

      <div>
        <h2>Usuarios</h2>
        <ul>
          {users.map(user => (
            <li key={user._id}>{user.alias} - {user.correo} - {user.tipo}</li>
          ))}
        </ul>
      </div>

      <div>
        <h2>Contenido Multimedia</h2>
        <ul>
          {contents.map(content => (
            <li key={content._id}>{content.title} - {content.type}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminPanel;
