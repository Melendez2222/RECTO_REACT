import React, { createContext, useState, useEffect } from 'react'

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Estado para almacenar la sesión del usuario
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const savedUser = sessionStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);
  const login = async (username, password) => {
    // Simula la autenticación; reemplázalo con tu lógica de autenticación
    try {
      const response = await fetch(`https://localhost:7270/PRODUCT/login?usuario=${username}&password=${password}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response) {
        const data = await response.json();
        const tokenrecib = data.token;
        setUser(tokenrecib);
        sessionStorage.setItem('user', JSON.stringify(tokenrecib));
        return { completo: true, token: tokenrecib };
      } else {
        console.error('Error en la solicitud if:', response.statusText);
        return false;
      }
    } catch (error) {
      console.error('Error en la solicitud try:', error);
      return false;
    }
  };

  // Función de logout
  const logout = () => {
    setUser(null);
    sessionStorage.removeItem('user'); // Eliminar la sesión
  };

  // Restaurar la sesión al cargar la aplicación
  React.useEffect(() => {
    const savedUser = sessionStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider 