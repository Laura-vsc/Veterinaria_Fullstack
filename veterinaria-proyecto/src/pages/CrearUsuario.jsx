import { useState } from 'react';
import axios from 'axios';
import { Dog } from 'lucide-react';

import imgPitbull from '../assets/pitbull.jpg'; 
import imgPastorAleman from '../assets/pastor_aleman.jpg';
import imgBeagle from '../assets/beagle.jpg';   
import imgSiames from '../assets/siames.jpg';
import imgPersa from '../assets/persa.jpg';
import imgGatoComun from '../assets/gato_comun.jpg';


const imagenesRazas = {
  "pitbull": imgPitbull,
  "pastor aleman": imgPastorAleman,
  "beagle": imgBeagle,    
  "siames": imgSiames,
  "persa": imgPersa,
  "gatoComun": imgGatoComun
};

const CrearUsuario = () => {
  // Estado inicial para poder reutilizarlo al limpiar
  const estadoInicial = {
    nombreMascota: '',
    edad: '',
    raza: '',
    nombreDueno: '',
    telefonoDueno: '',
    correoDueno: ''
  };

  const [mascota, setMascota] = useState(estadoInicial);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "telefonoDueno") {
      // Validación: Solo números y máximo 10 dígitos
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
      await axios.post("http://localhost:8081/mascotas", mascota);
      alert("¡Mascota registrada con éxito!");
      
      // AQUÍ LIMPIAMOS EL FORMULARIO
      setMascota(estadoInicial); 
      
      // Opcional: resetear los campos del HTML manualmente si no usas value={mascota.campo}
      e.target.reset(); 
    } catch (err) {
      console.error(err);
      alert("Error al guardar.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-lg mt-10">
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Contenedor de Imagen */}
        <div className="flex flex-col items-center">
          <div className="w-48 h-48 bg-gray-100 rounded-full overflow-hidden border-4 border-blue-100 flex items-center justify-center">
            {mascota.raza && imagenesRazas[mascota.raza] ? (
              <img src={imagenesRazas[mascota.raza]} alt="Raza" className="w-full h-full object-cover" />
            ) : (
              <Dog size={80} className="text-gray-300" />
            )}
          </div>
          <select 
            name="raza" 
            value={mascota.raza} 
            onChange={handleChange} 
            className="mt-4 w-full p-2 border rounded"
          >
            <option value="">Seleccione Raza</option>
            <option value="pitbull">Pitbull</option>
            <option value="pastor aleman">Pastor Alemán</option>
            <option value="beagle">Beagle</option>
            <option value="siames">Siamés</option>
            <option value="persa">Persa</option>
            <option value="gatoComun">Gato Común</option>
          </select>
        </div>

        {/* Inputs del Formulario */}
        <div className="space-y-4">
          <input 
            type="text" name="nombreMascota" placeholder="Nombre de la Mascota"
            value={mascota.nombreMascota} onChange={handleChange} required
            className="w-full p-2 border-b-2"
          />
          <input 
            type="text" name="edad" placeholder="Edad"
            value={mascota.edad} onChange={handleChange} required
            className="w-full p-2 border-b-2"
          />
          <input 
            type="text" name="nombreDueno" placeholder="Nombre del Dueño"
            value={mascota.nombreDueno} onChange={handleChange} required
            className="w-full p-2 border-b-2"
          />
          <input 
            type="text" name="telefonoDueno" placeholder="Teléfono (10 dígitos)"
            value={mascota.telefonoDueno} onChange={handleChange} required
            className="w-full p-2 border-b-2"
          />
          <input 
            type="email" name="correoDueno" placeholder="Correo"
            value={mascota.correoDueno} onChange={handleChange} required
            className="w-full p-2 border-b-2"
          />
          <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-xl font-bold">
            Registrar
          </button>
        </div>
      </form>
    </div>
  );
};

export default CrearUsuario;