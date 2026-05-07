import { createContext, useState, useContext } from 'react';

const MascotaContext = createContext();

export const MascotaProvider = ({ children }) => {
  const [mascotas, setMascotas] = useState([]);

  const agregarMascota = (nuevaMascota) => {
    setMascotas([...mascotas, { ...nuevaMascota, id: Date.now() }]);
  };

  const eliminarMascota = (id) => {
    setMascotas(mascotas.filter(m => m.id !== id));
  };

  const actualizarMascota = (id, mascotaActualizada) => {
    setMascotas(mascotas.map(m => m.id === id ? mascotaActualizada : m));
  };

  return (
    <MascotaContext.Provider value={{ mascotas, agregarMascota, eliminarMascota, actualizarMascota }}>
      {children}
    </MascotaContext.Provider>
  );
};

export const useMascotas = () => useContext(MascotaContext);