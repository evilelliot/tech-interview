import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminPanel = () => {
  const [category, setcategory] = useState([]);
  const [topic, settopic] = useState([]);
  const [user, setuser] = useState([]);
  const [contents, setContents] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [newTopic, setNewTopic] = useState('');
  const [newUser, setNewUser] = useState({ alias: '', correo: '', tipo: '' });
  const [newContent, setNewContent] = useState({ title: '', type: '' });

  useEffect(() => {
    // Cargar categorías
    axios.get('http://localhost:5050/category')
      .then(response => setcategory(response.data))
      .catch(error => console.error('Error al cargar categorías:', error));

    // Cargar temáticas
    axios.get('http://localhost:5050/topic')
      .then(response => settopic(response.data))
      .catch(error => console.error('Error al cargar temáticas:', error));

    // Cargar usuarios
    axios.get('http://localhost:5050/user')
      .then(response => setuser(response.data))
      .catch(error => console.error('Error al cargar usuarios:', error));

    // Cargar contenido multimedia
    axios.get('http://localhost:5050/content')
      .then(response => setContents(response.data))
      .catch(error => console.error('Error al cargar contenido multimedia:', error));
  }, []);

  const handleSubmitCategory = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5050/category', { name: newCategory });
      setcategory([...category, response.data]);
      setNewCategory('');
    } catch (error) {
      console.error('Error al agregar categoría:', error);
    }
  };

  const handleSubmitTopic = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5050/topic', { name: newTopic });
      settopic([...topic, response.data]);
      setNewTopic('');
    } catch (error) {
      console.error('Error al agregar temática:', error);
    }
  };

  const handleSubmitUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5050/user', newUser);
      setuser([...user, response.data]);
      setNewUser({ alias: '', correo: '', tipo: '' });
    } catch (error) {
      console.error('Error al agregar usuario:', error);
    }
  };

  const handleSubmitContent = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5050/content', newContent);
      setContents([...contents, response.data]);
      setNewContent({ title: '', type: '' });
    } catch (error) {
      console.error('Error al agregar contenido multimedia:', error);
    }
  };

  return (
    <div className="container">
      <h1 className="mt-5 mb-4">Panel de Administrador</h1>

      <div>
        <h2>Categorías de Contenido</h2>
        <ul className="list-group mb-4">
          {category.map(category => (
            <li key={category._id} className="list-group-item">{category.name}</li>
          ))}
        </ul>
        <form onSubmit={handleSubmitCategory} className="mb-4">
          <div className="input-group">
            <input type="text" value={newCategory} onChange={(e) => setNewCategory(e.target.value)} className="form-control" placeholder="Nombre de Categoría" required />
            <button type="submit" className="btn btn-primary">Agregar Categoría</button>
          </div>
        </form>
      </div>

      <div>
        <h2>Temáticas</h2>
        <ul className="list-group mb-4">
          {topic.map(topic => (
            <li key={topic._id} className="list-group-item">{topic.name}</li>
          ))}
        </ul>
        <form onSubmit={handleSubmitTopic} className="mb-4">
          <div className="input-group">
            <input type="text" value={newTopic} onChange={(e) => setNewTopic(e.target.value)} className="form-control" placeholder="Nombre de Temática" required />
            <button type="submit" className="btn btn-primary">Agregar Temática</button>
          </div>
        </form>
      </div>

      <div>
        <h2>Usuarios</h2>
        <ul className="list-group mb-4">
          {user.map(user => (
            <li key={user._id} className="list-group-item">{user.alias} - {user.correo} - {user.tipo}</li>
          ))}
        </ul>
        <form onSubmit={handleSubmitUser} className="mb-4">
          <div className="mb-3">
            <input type="text" placeholder="Alias" value={newUser.alias} onChange={(e) => setNewUser({ ...newUser, alias: e.target.value })} className="form-control" required />
          </div>
          <div className="mb-3">
            <input type="email" placeholder="Correo" value={newUser.correo} onChange={(e) => setNewUser({ ...newUser, correo: e.target.value })} className="form-control" required />
          </div>
          <div className="mb-3">
            <input type="text" placeholder="Tipo" value={newUser.tipo} onChange={(e) => setNewUser({ ...newUser, tipo: e.target.value })} className="form-control" required />
          </div>
          <button type="submit" className="btn btn-primary">Agregar Usuario</button>
        </form>
      </div>

      <div>
        <h2>Contenido Multimedia</h2>
        <ul className="list-group mb-4">
          {contents.map(content => (
            <li key={content._id} className="list-group-item">{content.title} - {content.type}</li>
          ))}
        </ul>
        <form onSubmit={handleSubmitContent} className="mb-4">
          <div className="mb-3">
            <input type="text" placeholder="Título" value={newContent.title} onChange={(e) => setNewContent({ ...newContent, title: e.target.value })} className="form-control" required />
          </div>
          <div className="mb-3">
            <input type="text" placeholder="Tipo" value={newContent.type} onChange={(e) => setNewContent({ ...newContent, type: e.target.value })} className="form-control" required />
          </div>
          <button type="submit" className="btn btn-primary">Agregar Contenido Multimedia</button>
        </form>
      </div>
    </div>
  );
};

export default AdminPanel;
