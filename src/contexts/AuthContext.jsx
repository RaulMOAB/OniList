import React from "react";
import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";

export const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const router = useRouter();

  const login = (userData, userToken) => {
    // datos que vienen del form de login(datos buenos)
    localStorage.setItem("token", userToken);
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
    setToken(userToken);
  };

  const logout = () => {
    // Eliminar el token y la información del usuario de localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    // Actualizar el estado del usuario y el token en el contexto
    setUser(null);
    setToken(null);
    router.push("/");
  };

  // Chequear si existe un token en localStorage al cargar la página
  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (token && user) {
      setUser(JSON.parse(user));
      setToken(token);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
