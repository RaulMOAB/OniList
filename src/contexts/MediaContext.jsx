import React from "react";
import { createContext, useState } from "react";

export const MediaContext = createContext();

const media = 'HOLA'

export function ContextProvider({ children }) {

	return (
		<MediaContext.Provider value={ media}>
			{children}
		</MediaContext.Provider>
	);
}
