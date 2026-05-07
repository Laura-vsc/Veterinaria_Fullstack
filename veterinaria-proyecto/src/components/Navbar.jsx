import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md p-4 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-blue-600">🐾 Huellitas Tech</Link>
        <div className="space-x-4">
          <Link to="/usuarios" className="text-gray-700 hover:text-blue-500 transition">Ver Usuarios</Link>
          <Link to="/crear" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">Crear Usuario</Link>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;