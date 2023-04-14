import React from "react";
import { createContext, useState, useEffect } from "react";

export const MediaContext = createContext(); // se importa dodne se vaya a usar

// const media = getMedia();
// console.log("************************************");
// console.log(getMedia);

export function MediaContextProvider({ children }) {
  const [data, setData] = useState([]);
  const getMedia = async () => {
    const response = await fetch("http://127.0.0.1:8000/api/");
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
  //   console.log("*****************");
  //   console.log(data);

  return <MediaContext.Provider value={data}>{children}</MediaContext.Provider>;
}
