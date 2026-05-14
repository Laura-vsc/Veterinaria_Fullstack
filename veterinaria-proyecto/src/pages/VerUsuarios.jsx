import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


import imgPitbull from '../assets/pitbull.jpg'; 
import imgPastorAleman from '../assets/pastor_aleman.jpg';
import imgBeagle from '../assets/beagle.jpg';   
import imgSiames from '../assets/siames.jpg';
import imgPersa from '../assets/persa.jpg';
import imgBritishShorthair from '../assets/british_shorthair.jpg';

const imagenesRazas = {
  "pitbull": imgPitbull,
  "pastor aleman": imgPastorAleman,
  "beagle": imgBeagle,    
  "siames": imgSiames,
  "persa": imgPersa,
  "british shorthair": imgBritishShorthair,
};

const VerUsuarios = () => {
  const [mascotas, setMascotas] = useState([]);

  // Cargar datos desde el backend
  useEffect(() => {
    const cargarMascotas = async () => {
      try {
        const res = await axios.get("[http://3.21.127.175:8081/mascotas](http://3.21.127.175:8081/mascotas)");
        setMascotas(res.data);
      } catch (err) {
        console.error("Error al cargar datos:", err);import imgBeagle from '../assets/beagle.jpg';
import imgBritishShorthair from '../assets/british_shorthair.jpg';
import imgPastorAleman from '../assets/pastor_aleman.jpg';
import imgPersa from '../assets/persa.jpg';
import imgPitbull from '../assets/pitbull.jpg';
import imgSiames from '../assets/siames.jpg';

      }
    };
    cargarMascotas();
  }, []);

  // Función para eliminar
  const eliminarMascota = async (id, nombre) => {
    if (window.confirm(`¿Estás seguro de eliminar a ${nombre}?`)) {
      try {
        await axios.delete(`http://3.21.127.175:8081/mascotas/${id}`);
        setMascotas(mascotas.filter(m => m.id !== id));
      } catch (err) {
        console.error("Error al eliminar:", err);
      }
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold text-blue-600 mb-8 text-center uppercase tracking-wider">
        Listado de Pacientes 🐾
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mascotas.length === 0 ? (
          <p className="text-gray-500 italic text-center col-span-full">
            No hay mascotas registradas todavía en la base de datos.
          </p>
        ) : (
          mascotas.map((m) => (
            <div key={m.id} className="bg-white p-6 rounded-2xl shadow-lg border-l-8 border-blue-500 hover:shadow-2xl transition-all duration-300">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-4">
                  {/* IMAGEN DE LA RAZA EN LA CARD */}
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-blue-100 bg-gray-50 flex-shrink-0">
                    {imagenesRazas[m.raza] ? (
                      <img 
                        src={imagenesRazas[m.raza]} 
                        alt={m.raza} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-2xl">🐾</div>
                    )}
                  </div>

                  <div>
                    <h3 className="text-xl font-black text-gray-800 leading-tight">{m.nombreMascota}</h3>
                    <p className="text-blue-500 font-semibold text-sm">{m.raza}</p>
                  </div>
                </div>

                <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs font-bold">
                  {m.edad} años
                </span>
              </div>
              
              <hr className="my-4 border-gray-100"/>
              
              <div className="space-y-1 mb-4">
                <p className="text-sm text-gray-600"><b>Dueño:</b> {m.nombreDueno}</p>
                <p className="text-sm text-gray-600"><b>Contacto:</b> {m.telefonoDueno}</p>
                <p className="text-sm text-gray-400 truncate"><b>Email:</b> {m.correoDueno}</p>
              </div>

              {/* BOTONES DE ACCIÓN */}
              <div className="flex gap-2">
                <Link 
                  to={`/editar/${m.id}`} 
                  className="flex-1 bg-yellow-50 text-yellow-600 py-2 rounded-lg hover:bg-yellow-500 hover:text-white transition-colors font-bold text-center text-sm border border-yellow-200"
                >
                  Modificar
                </Link>
                
                <button 
                  onClick={() => eliminarMascota(m.id, m.nombreMascota)}
                  className="flex-1 bg-red-50 text-red-600 py-2 rounded-lg hover:bg-red-600 hover:text-white transition-colors font-bold text-sm border border-red-200"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default VerUsuarios;