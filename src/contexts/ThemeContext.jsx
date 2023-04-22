import React from 'react'
import { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

export function ThemeContextProvider({ children }) {
	const [theme, setTheme] = useState("oni-ligth");

	const changeTheme = (selectedTheme) => {
		localStorage.setItem("theme", selectedTheme);
		setTheme(String(selectedTheme));
	};

	// Check if the theme exist in localStorage
	useEffect(() => {
		const themeFromLocalStorge = localStorage.getItem("theme");

		if (themeFromLocalStorge) {
			setTheme(String(themeFromLocalStorge));
		}else{
      localStorage.setItem("theme", theme);
    }
	}, [theme]);

	return (
		<ThemeContext.Provider value={{ theme, changeTheme }}>
			{children}
		</ThemeContext.Provider>
	);
}