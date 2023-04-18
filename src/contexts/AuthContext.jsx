import React from 'react'
import { createContext, useState} from "react";

export const AuthContext = createContext();

export function AuthContextProvider({children}) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState('');//TODO

	const login = (userData) => {
    //TODO
		setUser(userData);
	};

	const logout = () => {
	  // TODO
	};
  return (
		<AuthContext.Provider value={{user, login, logout}}>
			{children}
		</AuthContext.Provider>
	);
}
