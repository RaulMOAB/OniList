import React from "react";
import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import {redirect} from 'next/navigation'

export const AuthContext = createContext({});

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState({});
  const [token, setToken] = useState(null);
  const [validToken, isValidToken] = useState(false);
  const [hasChanged, setHasChanged] = useState(false);
  const router = useRouter();

  const login = (userData, userToken) => {
    localStorage.setItem("token", userToken);
    isValidToken(true);
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
    setToken(userToken);
    router.push("/home/" + userData.username + "/");
  };

  const getToken = () => {
    return token;
  };
  
  
  const logout = () => {
    // Eliminar el token y la información del usuario del localStorage
    if (validToken) {
      fetchData(process.env.NEXT_PUBLIC_API_ENDPOINT + "logout", "POST");
    }
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    // Actualizar el estado del usuario y el token en el contexto
    setUser({});
    setToken(null);
    setHasChanged(!hasChanged)
    if(isValidToken){
      router.push("/", undefined, { shallow: true });
    }else{
      router.push("/login", undefined, { shallow: true });
    }
  };

  const fetchData = async (endpoint, method = "GET", body = null, type="normal") => {
    let headers = {};
    if(type !== "image"){
      headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
      };
    }
    const api_endpoint = process.env.NEXT_PUBLIC_API_ENDPOINT + endpoint;
    // Añadimos el token a los headers si existe
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    try{
      const response = body
      ? await fetch(api_endpoint, { method, headers, body })
      : await fetch(api_endpoint, { method, headers });
      const data = await response.json();
      if (!(data.message === "Unauthenticated.")) {
        return data;
      }
      if(type !== "auth-required"){
        isValidToken(false);
        logout();
      }
      return { error: "Unauthenticated." };
    }catch(error){
      if(type === "image"){
        return { error: "This is not an image please select an image." };
      }else{
        return {"error": "An error ocurred when fetching"}
      }
    }
  };

  // const verifyToken = ()=>{
  //   fetchData("verify-token", "GET", null, "auth-required").then((response) => {
	// 		if (response.error) {
	// 			console.log(response.error);
	// 			return false;
	// 		} else {
	// 			console.log(response);
	// 			return true;
	// 		}
	// 	});
  // }

  const updateUser = ()=>{
    let endpoint = "user/"+user.id;
    fetchData(endpoint).then((res)=>{
      setUser(res);
      setHasChanged(!hasChanged);
      localStorage.setItem("user", JSON.stringify(res))
    })
  }

    const getUser = () => {
			let endpoint = "user/" + user.id;
			fetchData(endpoint).then((user) => {
				return user
			});
		};

  const isUserAuthenticated = () => {
    let isAuth = token ? true : false;
    return isAuth;
  };

  useEffect(() => {
    const aux_token = localStorage.getItem("token");
    const aux_user = localStorage.getItem("user");

    if (aux_token && aux_user) {
      setUser(JSON.parse(aux_user));
      setToken(aux_token);
    }
  }, []);

  const getUserID = () => {
    if (user) {
      return user.id;
    }
  };

  return (
		<AuthContext.Provider
			value={{
				user,
				login,
				logout,
				getToken,
				getUserID,
				isUserAuthenticated,
				fetchData,
				updateUser,
        hasChanged,
        getUser
			}}>
			{children}
		</AuthContext.Provider>
	);
}
