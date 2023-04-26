import React from "react";
import { createContext, useState, useEffect } from "react";

export const MediaContext = createContext(); // se importa dodne se vaya a usar

export function MediaContextProvider({ children }) {
  const [data, setData] = useState([]);
  
  const getMedia = async () => {
    const response = await fetch("https://onilist.club/api/");
    return response.json();
  };

  useEffect(() => {
    getMedia()
      .then((res) => {
        setData(res);
      })
      .catch((e) => {
        console.log(e.message);
      });
  }, []);

  return <MediaContext.Provider value={data}>{children}</MediaContext.Provider>;
}
