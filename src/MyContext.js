import React, { useState } from "react";

const MyContext = React.createContext();
const AuthContext = React.createContext();

export const MyProvider = ({ children }) => {
  const [currentPage, setCurrentPage] = React.useState("main");

  return (
    <MyContext.Provider value={{ currentPage, setCurrentPage }}>
      {children}
    </MyContext.Provider>
  );
};

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
  
    const login = () => {
      setIsLoggedIn(true);
    };
  
    const logout = () => {
      setIsLoggedIn(false);
    };
  
    return (
      <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
        {children}
      </AuthContext.Provider>
    );
  };

export default MyContext;