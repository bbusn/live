import { createContext, useContext, useState, useEffect } from "react";

import User from '../objects/User';
import { AUTH_STATUS, AuthStatusType, AuthTokenName } from "../constants/auth";
import Loading from "../components/Loading";


const AuthContext = createContext({
  status: AUTH_STATUS.LOADING as AuthStatusType,
  setStatus: (_: AuthStatusType) => { },
  connect: async () => { },
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: any) => {
  const [status, setStatus] = useState<AuthStatusType>(AUTH_STATUS.LOADING);

  const [loading, setLoading] = useState(true);

  const connect = async () => {
    const user = localStorage.getItem(AuthTokenName) || sessionStorage.getItem(AuthTokenName) || null;

    if (user) {
      User._instance = JSON.parse(user);
      setStatus(AUTH_STATUS.AUTH);
    } else {
      console.warn("No user found in localStorage or sessionStorage");
      setStatus(AUTH_STATUS.UNAUTH);
      // navigate
    }

    // setLoading(false);
  }

  useEffect(() => {
    connect();
  }, []);

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 1));
    }, 100);

    return () => clearInterval(timer);
  }, []);

  return (
    <AuthContext.Provider value={{ status, setStatus, connect }}>
      {loading ? (
        <Loading progress={progress} />
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};
