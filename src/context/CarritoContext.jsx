import React, { createContext, useContext, useState, useEffect } from 'react';

const CarritoContext = createContext();
export const useCarrito = () => useContext(CarritoContext);

export const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState(() => {
    const dataGuardada = localStorage.getItem('carrito');
    return dataGuardada ? JSON.parse(dataGuardada) : [];
  });

  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }, [carrito]);

  const agregarAlCarrito = (item) => {
    setCarrito((prev) => {
      const existente = prev.find(p => p.idMeal === item.idMeal);
      if (existente) {
        return prev.map(p =>
          p.idMeal === item.idMeal ? { ...p, cantidad: p.cantidad + 1 } : p
        );
      }
      return [...prev, { ...item, cantidad: 1 }];
    });
  };

  const eliminarDelCarrito = (idMeal) => {
    setCarrito((prev) => prev.filter(item => item.idMeal !== idMeal));
  };

  const vaciarCarrito = () => setCarrito([]);

  const incrementarCantidad = (idMeal) => {
    setCarrito((prev) =>
      prev.map(item =>
        item.idMeal === idMeal ? { ...item, cantidad: item.cantidad + 1 } : item
      )
    );
  };

  const disminuirCantidad = (idMeal) => {
    setCarrito((prev) =>
      prev.map(item =>
        item.idMeal === idMeal
          ? { ...item, cantidad: Math.max(1, item.cantidad - 1) }
          : item
      )
    );
  };

  // ✅ NUEVO: función genérica para actualizar cantidad exacta
  const actualizarCantidad = (idMeal, nuevaCantidad) => {
    setCarrito((prev) =>
      prev.map(item =>
        item.idMeal === idMeal
          ? { ...item, cantidad: Math.max(1, nuevaCantidad) }
          : item
      )
    );
  };

  return (
    <CarritoContext.Provider
      value={{
        carrito,
        agregarAlCarrito,
        eliminarDelCarrito,
        vaciarCarrito,
        incrementarCantidad,
        disminuirCantidad,
        actualizarCantidad // ✅ Exportamos también esta
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
};
