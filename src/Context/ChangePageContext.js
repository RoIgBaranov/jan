import React from "react";

const ChangePageContext = React.createContext();


export const ChangePageProvider = ({ children }) => {
  const [currentPage, setCurrentPage] = React.useState("main");

  return (
    <ChangePageContext.Provider value={{ currentPage, setCurrentPage }}>
      {children}
    </ChangePageContext.Provider>
  );
};



export default ChangePageContext;