import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MascotaProvider } from './context/MascotaContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import CrearUsuario from './pages/CrearUsuario';
import VerUsuarios from './pages/VerUsuarios';
import EditarUsuario from './pages/EditarUsuario';

function App() {
  return (
    <MascotaProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <main className="container mx-auto p-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/crear" element={<CrearUsuario />} />
              <Route path="/usuarios" element={<VerUsuarios />} />
              <Route path="/editar/:id" element={<EditarUsuario />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </MascotaProvider>
  );
}

export default App;