import React, { useState } from "react";

const AuthContext = React.createContext();


export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [authHeader, setAuthHeader ] = useState('')
    const [user, setUser] = useState({
      userId: '',
      email: '',
      nickname: '',
      registrationDate: '',
      roles: [],
      educationLevel: '',
      communities: [],
      location: {},
      avatar: '',
      stats: {},
      activities: {},
      wallet: 0
    });
  
    const login = () => {
      setIsLoggedIn(true);
    };
  
    const logout = () => {
      setUser({});
      setAuthHeader('');
      setIsLoggedIn(false);
    };
  
    return (
      <AuthContext.Provider value={{ isLoggedIn, user, authHeader, setUser, login, logout, setAuthHeader }}>
        {children}
      </AuthContext.Provider>
    );
  };

  export default AuthContext;