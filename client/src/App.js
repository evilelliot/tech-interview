import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterPage from './components/RegisterPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginPage from './components/LoginPage';
import CreadorPage from './components/CreadorPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/registro" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/creator" element={<CreadorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
