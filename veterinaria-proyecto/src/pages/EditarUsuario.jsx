import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditarUsuario = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [mascota, setMascota] = useState({
    nombreMascota: '',
    edad: '',
    raza: '',
    nombreDueno: '',
    telefonoDueno: '',
    correoDueno: ''
  });

  // 1. Cargar los datos actuales de la mascota al abrir la página
  useEffect(() => {
    const obtenerMascota = async () => {
      try {
        const res = await axios.get("(http://3.21.127.175:8081/mascotas)")
        const encontrada = res.data.find(m => m.id === parseInt(id));
        if (encontrada) setMascota(encontrada);
      } catch (err) {
        console.error(err);
      }
    };
    obtenerMascota();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "telefonoDueno") {
      if (/^[0-9]*$/.test(value) && value.length <= 10) {
        setMascota({ ...mascota, [name]: value });
      }
    } else {
      setMascota({ ...mascota, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://3.21.127.175:8081/mascotas/${id}`, mascota);
      alert("¡Registro actualizado correctamente!");
      navigate('/usuarios');
    } catch (err) {
      console.error(err);
      alert("Error al actualizar");
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-xl mt-10 border-t-8 border-yellow-500">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Modificar Registro</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-bold text-gray-700">Nombre de la Mascota</label>
          <input type="text" name="nombreMascota" value={mascota.nombreMascota} onChange={handleChange} className="w-full p-2 border-b-2 outline-none focus:border-yellow-500" required />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold text-gray-700">Edad</label>
            <input type="number" name="edad" value={mascota.edad} onChange={handleChange} className="w-full p-2 border-b-2 outline-none" required />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700">Raza</label>
            <input type="text" name="raza" value={mascota.raza} onChange={handleChange} className="w-full p-2 border-b-2 outline-none" disabled />
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700">Nombre del Dueño</label>
          <input type="text" name="nombreDueno" value={mascota.nombreDueno} onChange={handleChange} className="w-full p-2 border-b-2 outline-none" required />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700">Teléfono</label>
          <input type="text" name="telefonoDueno" value={mascota.telefonoDueno} onChange={handleChange} className="w-full p-2 border-b-2 outline-none" required />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700">Correo</label>
          <input type="email" name="correoDueno" value={mascota.correoDueno} onChange={handleChange} className="w-full p-2 border-b-2 outline-none" required />
        </div>

        <div className="flex gap-4 pt-4">
          <button type="submit" className="flex-1 bg-yellow-500 text-white py-3 rounded-xl font-bold hover:bg-yellow-600 transition shadow-md">
            Guardar Cambios
          </button>
          <button type="button" onClick={() => navigate('/usuarios')} className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-xl font-bold hover:bg-gray-300 transition">
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditarUsuario;