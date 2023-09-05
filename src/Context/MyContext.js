import React from "react";

const MyContext = React.createContext();


export const MyProvider = ({ children }) => {
  const [currentPage, setCurrentPage] = React.useState("main");

  return (
    <MyContext.Provider value={{ currentPage, setCurrentPage }}>
      {children}
    </MyContext.Provider>
  );
};



export default MyContext;