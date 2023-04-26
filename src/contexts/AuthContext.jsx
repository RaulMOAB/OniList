import React from "react";
import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";

export const AuthContext = createContext({});

export function AuthContextProvider({ children }) {
	const [user, setUser] = useState({});
	const [token, setToken] = useState(null);
	const router = useRouter();

	const login = (userData, userToken) => {
		localStorage.setItem("token", userToken);
		localStorage.setItem("user", JSON.stringify(userData));
		setUser(userData);
		setToken(userToken);
		router.push("/home/"+userData.username);
	};

	const getToken = () => {
		return token;
	};

	const logout = () => {
		// Eliminar el token y la información del usuario de localStorage
		localStorage.removeItem("token");
		localStorage.removeItem("user");
		// Actualizar el estado del usuario y el token en el contexto
		setUser({});
		setToken(null);
		router.push("/");
	};

	const isUserAuthenticated = () =>{
		let isAuth = token ? true : false; 
		return isAuth;
	}

	// Chequear si existe un token en localStorage al cargar la página
	useEffect(() => {
		const aux_token = localStorage.getItem("token");
		const aux_user = localStorage.getItem("user");

		if (aux_token && aux_user) {
			setUser(JSON.parse(aux_user));
			setToken(aux_token);
		}
	}, []);

	const getUserID = () => {
		if(user){
			return user.id
		}
	};

	return (
		<AuthContext.Provider
			value={{ user, login, logout, getToken, getUserID, isUserAuthenticated }}>
			{children}
		</AuthContext.Provider>
	);
}
