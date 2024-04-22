import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterPage from './components/RegisterPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginPage from './components/LoginPage';
import CreadorPage from './components/CreadorPage';
import AdminPage from './components/AdminPage';
import LectorPage from './components/LectorPage';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/registro" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/creator" element={<CreadorPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/lector" element={<LectorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
