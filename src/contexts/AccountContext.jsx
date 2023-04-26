import React from "react";
import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";

export const AccountContext = createContext({});

export function AccountContextProvider({ children }) {
	const [user, setUser] = useState({});

	return (
		<AccountContext.Provider value={{ user }}>
			{children}
		</AccountContext.Provider>
	);
}
