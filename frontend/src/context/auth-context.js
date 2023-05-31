import React, { useEffect, useState } from "react";

const AuthContext = React.createContext({
  token: null,
  userId: null,
  login: (token, userId, tokenExpiration) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUserId = localStorage.getItem("userId");

    if (storedToken && storedUserId) {
      setToken(storedToken);
      setUserId(storedUserId);
    }
  }, []);

  const login = (token, userId, tokenExpiration) => {
    localStorage.setItem("token", token);
    localStorage.setItem("userId", userId);
    setToken(token);
    setUserId(userId);
  };

  const logout = () => {
    setToken(null);
    setUserId(null);
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
  };

  return (
    <AuthContext.Provider
      value={{ token: token, userId: userId, login: login, logout: logout }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
