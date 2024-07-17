import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { axiosReq, axiosRes } from "../api/axiosDefaults";
import { useHistory } from "react-router";

export const CurrentUserContext = createContext();
export const SetCurrentUserContext = createContext();

export const useCurrentUser = () => useContext(CurrentUserContext);
export const useSetCurrentUser = () => useContext(SetCurrentUserContext);

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const history = useHistory();

  const handleMount = async () => {
    try {
      const { data } = await axiosRes.get("dj-rest-auth/user/");
      setCurrentUser(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      handleMount();
    }
  }, []);

  useEffect(() => {
    const requestInterceptor = axiosReq.interceptors.request.use(
      async (config) => {
        const token = localStorage.getItem("authToken");
        if (token) {
          config.headers["Authorization"] = `Token ${token}`;
        }
        return config;
      },
      (err) => Promise.reject(err)
    );

    const responseInterceptor = axiosRes.interceptors.response.use(
      (response) => response,
      async (err) => {
        if (err.response?.status === 401 && currentUser) {
          // Nur für authentifizierte Routen
          setCurrentUser(null);
          localStorage.removeItem("authToken");
          history.push("/signin");
        }
        return Promise.reject(err);
      }
    );

    return () => {
      axiosReq.interceptors.request.eject(requestInterceptor);
      axiosRes.interceptors.response.eject(responseInterceptor);
    };
  }, [history, currentUser]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <SetCurrentUserContext.Provider value={setCurrentUser}>
        {children}
      </SetCurrentUserContext.Provider>
    </CurrentUserContext.Provider>
  );
};