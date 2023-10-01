import React, { useState } from "react";

const AuthContext = React.createContext();


export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState({
      nickname: '',
      email: '',
      educationLevel: '',
      communities: '',
      location: '',
      password: ''
    });
  
    const login = () => {
      setIsLoggedIn(true);
    };
  
    const logout = () => {
      setUser({});
      setIsLoggedIn(false);
    };
  
    return (
      <AuthContext.Provider value={{ isLoggedIn, user, setUser, login, logout }}>
        {children}
      </AuthContext.Provider>
    );
  };

  export default AuthContext;